var URL_DB = "https://hqtjspmykrkgnafgdeop.supabase.co";
var CLE_PUBLIQUE = "sb_publishable_mRpwSVzjejr5LsQimB-4Cw_9TmjkviI";
var db = window.supabase.createClient(URL_DB, CLE_PUBLIQUE);
var app = document.getElementById("app");

function vue(html) { app.innerHTML = '<div class="marque">Panier Perdu</div>' + html; }

function connexion(message) {
  vue('<h2>Accède à ton espace</h2>' +
    '<p>Entre l\'e-mail utilisé pour ton abonnement : on t\'envoie un lien de connexion, sans mot de passe à retenir.</p>' +
    '<form id="f"><input id="m" type="email" required autocomplete="email" placeholder="ton@email.fr">' +
    '<button type="submit">Recevoir mon lien</button></form>' +
    '<p class="n" id="msg"></p>');
  if (message) document.getElementById("msg").textContent = message;
  document.getElementById("f").onsubmit = function (e) {
    e.preventDefault();
    var mail = document.getElementById("m").value.trim();
    db.auth.signInWithOtp({ email: mail, options: { shouldCreateUser: false, emailRedirectTo: location.origin + "/compte.html" } })
      .then(function () {
        document.getElementById("msg").textContent = "Si un compte existe avec cette adresse, un lien vient d'être envoyé. Pense à vérifier tes courriers indésirables.";
      });
  };
}

function euros(c) { return (c / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " €"; }

function espace(user) {
  Promise.all([
    db.from("profiles").select("subscription_status").eq("id", user.id).maybeSingle(),
    db.from("abandoned_carts").select("recovered_cents")
  ]).then(function (r) {
    var actif = r[0].data && r[0].data.subscription_status === "active";
    var total = (r[1].data || []).reduce(function (s, x) { return s + x.recovered_cents; }, 0);
    vue('<h2>Ton espace</h2><p class="n" id="em"></p>' +
      '<div class="bloc"><h3>Chiffre d\'affaires récupéré</h3><div class="grand">' + euros(total) + '</div>' +
      '<p class="n">Il se remplit dès que ta boutique est connectée.</p></div>' +
      (actif ? '<div class="bloc"><h3>Ta boutique</h3><p>Aucune boutique connectée pour le moment.</p><p class="n">La connexion Shopify arrive très bientôt. Ton abonnement est actif.</p></div>'
             : '<div class="bloc"><h3>Abonnement</h3><p>Ton abonnement n\'est pas actif.</p></div><a class="b" href="index.html">Voir l\'offre</a>') +
      '<button class="l" id="q">Se déconnecter</button>');
    document.getElementById("em").textContent = user.email;
    document.getElementById("q").onclick = function () { db.auth.signOut().then(function () { location.href = "compte.html"; }); };
  });
}

db.auth.getSession().then(function (r) {
  if (r.data.session) { espace(r.data.session.user); } else { connexion(); }
});
