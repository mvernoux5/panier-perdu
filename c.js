function apercu() {
  app.innerHTML =
    '<div class="marque">Panier Perdu</div>' +
    '<h2>Ta première relance est prête</h2>' +
    '<p class="sous-titre">Elle est écrite et personnalisée. Les noms entre crochets sont remplacés automatiquement par ceux de ton client.</p>' +
    '<div class="bloc"><h3>Relance 1 · environ 1 heure après</h3>' +
    '<div class="mail"><strong>Objet : [Prénom], tu as oublié quelque chose</strong>\n\n' +
    'Bonjour [Prénom],\n\nTu as laissé [Produit] dans ton panier. On te le garde de côté, il t\'attend ici :\n\n[Lien vers le panier]\n\nUne question ? Réponds simplement à cet e-mail.\n\nÀ très vite,\nL\'équipe [Ta boutique]</div></div>' +
    '<div class="bloc verrou"><h3>Relance 2 · environ 24 heures après</h3>' +
    '<div class="mail flou"><strong>Objet : Dernière chance pour ton panier</strong>\n\nBonjour [Prénom],\n\nTon panier est toujours là, et nous t\'offrons [Code de réduction] pour le terminer.\n\n[Lien vers le panier]</div>' +
    '<div class="cadenas">Verrouillée · avec un code de réduction facultatif</div></div>' +
    '<div class="bloc"><h3>Chiffre d\'affaires récupéré</h3><div class="grand" style="color:var(--gris)">— €</div>' +
    '<p class="note" style="text-align:left">Il se remplit dès que ta boutique est connectée.</p></div>' +
    '<p class="note">L\'ouverture des comptes arrive très bientôt.</p>' +
    '<button class="retour" id="accueil">Retour à l\'accueil</button>' +
    '<footer>© Panier Perdu</footer>';
  document.getElementById("accueil").onclick = accueil;
  window.scrollTo(0, 0);
}

accueil();
