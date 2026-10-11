var LIEN_PAIEMENT = "https://buy.stripe.com/test_dRmbIT3UT2ct1uD6VybAs00";

var st = document.createElement("style");
st.textContent = '  .grand small{font-size:18px;color:var(--gris);font-weight:400;font-family:inherit}  .garantie{background:#e6f0ea;color:var(--encre);font-weight:700;padding:10px;border-radius:6px;margin:10px 0}  a.bouton{text-decoration:none;line-height:24px}  details{border-bottom:1px solid var(--trait);padding:12px 0}summary{font-weight:700;cursor:pointer}details p{margin-top:8px;color:var(--gris)}';
document.head.appendChild(st);

function offre() {
  var gain = etat.rep[0].val * 7 / 3 * etat.rep[1].val * 0.05;
  var faq = [
    ["Comment ça marche ?", "Tu connectes ta boutique. Panier Perdu repère les paniers abandonnés et envoie deux e-mails espacés à ton client."],
    ["Puis-je arrêter quand je veux ?", "Oui. Aucun engagement : tu résilies à tout moment, en un clic, et rien n'est dû après."],
    ["Et si ça ne marche pas pour moi ?", "Tu es remboursé intégralement sur simple demande dans les 30 jours. Sans justification."],
    ["Mes clients sont-ils protégés ?", "Oui. Tes données et celles de tes clients ne servent qu'à envoyer les relances et ne sont jamais revendues."]
  ];
  var q = faq.map(function (f) {
    return '<details><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>';
  }).join("");
  app.innerHTML =
    '<div class="marque">Panier Perdu</div>' +
    '<h2>Active tes relances</h2>' +
    '<div class="bloc"><h3>Ce qui est prêt pour toi</h3>' +
    '<p>✓ Ta relance 1 est écrite<br>✓ Ta relance 2 est écrite, avec code de réduction facultatif<br>✓ Ton compteur d\'euros récupérés t\'attend</p></div>' +
    '<div class="bloc"><h3>Ton gain estimé</h3><div class="grand" style="color:var(--encre)">+ ' + euros(gain) + '</div>' +
    '<p style="margin-top:8px">par mois, pour 29 €. <span class="note">Estimation prudente, pas une garantie.</span></p></div>' +
    '<div class="bloc plan"><h3>Mensuel</h3><div class="grand">29 €<small> / mois</small></div>' +
    '<p>soit 0,95 € par jour</p>' +
    '<p class="garantie">Satisfait ou remboursé 30 jours.</p>' +
    '<a class="bouton" href="' + LIEN_PAIEMENT + '">Activer pour 29 € / mois</a>' +
    '<p class="note">Sans engagement, résiliable à tout moment</p></div>' + q +
    '<button class="retour" id="retour">Retour</button><footer>© Panier Perdu</footer>';
  document.getElementById("retour").onclick = apercu;
  window.scrollTo(0, 0);
}
