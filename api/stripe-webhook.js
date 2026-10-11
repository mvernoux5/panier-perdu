const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function lireCorps(req) {
  return new Promise(function (ok, ko) {
    var morceaux = [];
    req.on("data", function (m) { morceaux.push(m); });
    req.on("end", function () { ok(Buffer.concat(morceaux)); });
    req.on("error", ko);
  });
}

async function changerStatut(client, statut) {
  await db.from("profiles")
    .update({ subscription_status: statut })
    .eq("stripe_customer_id", client);
}

module.exports = async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();
  var event;
  try {
    var corps = await lireCorps(req);
    event = stripe.webhooks.constructEvent(
      corps,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (e) {
    return res.status(400).send("Signature invalide");
  }

  try {
    var obj = event.data.object;
    if (event.type === "checkout.session.completed") {
      var email = ((obj.customer_details && obj.customer_details.email) || "").toLowerCase();
      if (email) {
        await db.auth.admin.inviteUserByEmail(email);
        await db.from("profiles")
          .update({ subscription_status: "active", stripe_customer_id: obj.customer })
          .eq("email", email);
      }
    } else if (event.type === "invoice.payment_failed") {
      await changerStatut(obj.customer, "past_due");
    } else if (event.type === "customer.subscription.deleted") {
      await changerStatut(obj.customer, "canceled");
    }
  } catch (e) {
    return res.status(500).send("Erreur serveur");
  }
  res.status(200).json({ recu: true });
};
