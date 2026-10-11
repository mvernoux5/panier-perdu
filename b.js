var PHRASE_RELANCE = [
  "Aujourd'hui, personne ne relance ces paniers.",
  "Tu relances à la main, quand tu y penses : la plupart des paniers t'échappent quand même.",
  "Tu as déjà un e-mail automatique : avec deux relances espacées et le suivi en euros, tu irais plus loin."
];

function resultat() {
  var commandes = etat.rep[0].val, panier = etat.rep[1].val, mode = etat.rep[2].val;
  var abandonnes = commandes * 7 / 3;
  var perdu = abandonnes * panier;
  var gain = perdu * 0.05;
  var phraseGain;
  if (gain >= 29) {
    phraseGain = "C'est environ " + (gain / 29).toFixed(1).replace(".", ",") + " fois le prix de l'abonnement (29 € par mois).";
  } else {
    phraseGain = "Avec ces chiffres, le gain resterait proche du prix de l'abonnement (29 € par mois). Le produit est surtout utile quand les commandes augmentent.";
  }
  app.innerHTML =
    '<div class="marque">Panier Perdu</div>' +
    '<div class="barre"><i style="width:100%"></i></div>' +
    '<p class="etape">Ton résultat</p>' +
    '<h2>Voilà ce que ça te coûte aujourd\'hui</h2>' +
    '<p>Avec <strong>' + etat.rep[0].label.toLowerCase() + ' commandes par mois</strong> et un panier moyen <strong>' + etat.rep[1].label.toLowerCase() + '</strong>, environ ' + Math.round(abandonnes) + ' paniers sont abandonnés chaque mois.</p>' +
    '<div class="bloc"><h3>Ventes qui partent chaque mois</h3><div class="grand">' + euros(perdu) + '</div></div>' +
    '<p>' + PHRASE_RELANCE[mode] + '</p>' +
    '<div class="bloc"><h3>Estimation prudente avec Panier Perdu</h3><div class="grand" style="color:var(--encre)">+ ' + euros(gain) + ' par mois</div>' +
    '<p style="margin-top:8px">' + phraseGain + '</p>' +
    '<p class="note" style="text-align:left">Hypothèse : 5 % des paniers abandonnés récupérés grâce à deux relances. C\'est une estimation, pas une garantie.</p></div>' +
    '<button class="bouton" id="suite">Voir ma première relance</button>' +
    '<button class="retour" id="refaire">Refaire le calcul</button>';
  document.getElementById("suite").onclick = apercu;
  document.getElementById("refaire").onclick = demarrer;
  window.scrollTo(0, 0);
}

function apercu() {
  app.innerHTML =
    '<div class="marque">Panier Perdu</div>' +
    '<h2>Ta première relance est prête</h2>' +
    '
