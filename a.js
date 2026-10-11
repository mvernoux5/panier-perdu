var QUESTIONS = [
  { t: "Combien de commandes ta boutique reçoit-elle par mois ?",
    o: [["Moins de 20", 15], ["20 à 50", 35], ["50 à 100", 75], ["Plus de 100", 120]] },
  { t: "Quel est ton panier moyen ?",
    o: [["Moins de 30 €", 25], ["30 à 60 €", 45], ["60 à 100 €", 80], ["Plus de 100 €", 120]] },
  { t: "Que fais-tu aujourd'hui pour les paniers abandonnés ?",
    o: [["Rien du tout", 0], ["Je relance à la main, quand j'y pense", 1], ["J'ai déjà un e-mail automatique", 2]] }
];
var etat = { q: 0, rep: [] };
var app = document.getElementById("app");

function euros(n) { return Math.round(n).toLocaleString("fr-FR") + " €"; }

function accueil() {
  app.innerHTML =
    '<div class="marque">Panier Perdu</div>' +
    '<h1>Récupère les paniers abandonnés de ta boutique, sans payer le prix des grosses solutions.</h1>' +
    '<p class="sous-titre">Pour les boutiques Shopify et WooCommerce qui font quelques dizaines de commandes par mois.</p>' +
    '<button class="bouton" id="go">Commencer, c\'est gratuit</button>' +
    '<p class="note">Aucune carte bancaire demandée pour commencer.</p>' +
    '<section class="douleur"><div class="chiffre">7 paniers sur 10</div>' +
    '<p>sont remplis puis abandonnés. Une boutique à 30 commandes par mois laisse donc partir environ 70 paniers. À 60 € le panier, cela représente 4 200 € de ventes qui s\'en vont, sans que personne ne les relance.</p>' +
    '<small>Exemple chiffré à partir de la moyenne mondiale d\'abandon de panier (environ 70 %, étude Baymard Institute). Tes chiffres réels dépendent de ta boutique.</small></section>' +
    '<h2>Ce que tu obtiens</h2><ul>' +
    '<li><strong>Deux relances écrites, espacées</strong><span>La première rappelle le panier, la seconde arrive plus tard, avec les produits oubliés.</span></li>' +
    '<li><strong>Un code de réduction, si tu le veux</strong><span>Tu choisis d\'en offrir un sur la seconde relance, ou aucun.</span></li>' +
    '<li><strong>Un compteur en euros</strong><span>Tu vois combien de chiffre d\'affaires les relances ont ramené.</span></li></ul>' +
    '<div style="margin-top:32px"><button class="bouton" id="go2">Commencer, c\'est gratuit</button>' +
    '<p class="note">Sans engagement, résiliable à tout moment.</p></div>' +
    '<footer>© Panier Perdu</footer>';
  document.getElementById("go").onclick = demarrer;
  document.getElementById("go2").onclick = demarrer;
  window.scrollTo(0, 0);
}

function demarrer() { etat = { q: 0, rep: [] }; question(); }

function question() {
  var q = QUESTIONS[etat.q];
  var pct = Math.round((etat.q / 3) * 100);
  var html =
    '<div class="marque">Panier Perdu</div>' +
    '<div class="barre"><i style="width:' + pct + '%"></i></div>' +
    '<p class="etape">Question ' + (etat.q + 1) + ' sur 3</p>' +
    '<h2>' + q.t + '</h2>';
  for (var i = 0; i < q.o.length; i++) {
    html += '<button class="reponse" data-i="' + i + '">' + q.o[i][0] + '</button>';
  }
  html += '<button class="retour" id="retour">' + (etat.q === 0 ? "Retour à l'accueil" : "Question précédente") + '</button>';
  app.innerHTML = html;
  var boutons = app.querySelectorAll(".reponse");
  for (var j = 0; j < boutons.length; j++) {
    boutons[j].onclick = function () { choisir(parseInt(this.getAttribute("data-i"), 10)); };
  }
  document.getElementById("retour").onclick = function () {
    if (etat.q === 0) { accueil(); } else { etat.q--; etat.rep.pop(); question(); }
  };
  window.scrollTo(0, 0);
}

function choisir(i) {
  var q = QUESTIONS[etat.q];
  etat.rep.push({ label: q.o[i][0], val: q.o[i][1] });
  if (etat.q < 2) { etat.q++; question(); } else { resultat(); }
}
