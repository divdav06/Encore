async function chargerMatchs(type) {
    const conteneur = document.getElementById('matchs-liste');
    conteneur.innerHTML = '<p>Chargement des matchs...</p>';

    try {
        // Utilisation du lien relatif : c'est la solution la plus fiable
        const response = await fetch(`/api/football?type=${type}`);
        const data = await response.json();

        // On vide le message de chargement
        conteneur.innerHTML = '';

        // DEBUG : Si l'API renvoie une erreur au lieu de matchs
        if (data.errors && Object.keys(data.errors).length > 0) {
            conteneur.innerHTML = `<p style="color: red;">Erreur API : ${JSON.stringify(data.errors)}</p>`;
            return;
        }

        // Vérification si on a des matchs dans la réponse (Format API-Football)
        const matchs = data.response || [];

        if (matchs.length === 0) {
            conteneur.innerHTML = '<p>Aucun match trouvé pour cette période.</p>';
            return;
        }

        // Affichage des matchs
        matchs.forEach(match => {
            const matchElement = document.createElement('div');
            matchElement.className = 'match-card';
            matchElement.innerHTML = `
                <div class="equipes">
                    <span>${match.teams.home.name}</span>
                    <span class="score">${match.goals.home ?? ''} - ${match.goals.away ?? ''}</span>
                    <span>${match.teams.away.name}</span>
                </div>
                <div class="info">${match.league.name} - ${new Date(match.fixture.date).toLocaleTimeString([], {hour: '2d', minute:'2d'})}</div>
            `;
            conteneur.innerHTML += matchElement.innerHTML;
        });

    } catch (error) {
        console.error("Erreur:", error);
        conteneur.innerHTML = '<p>Erreur de connexion au serveur.</p>';
    }
}


