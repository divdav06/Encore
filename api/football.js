
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, league } = req.query;

  // Configuration de l'URL selon l'onglet choisi sur Selma Sport
  let endpoint = 'fixtures?live=all';
  if (type === 'next') endpoint = 'fixtures?next=20';
  if (type === 'past') endpoint = 'fixtures?last=20';
  
  // Configuration pour le classement des championnats
  if (type === 'standings') {
    endpoint = `standings?league=${league || 39}&season=2025`;
  }

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    // Appel vers le serveur mondial d'API-Football
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, options);
    
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Renvoi des résultats à ton application
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur détaillée:", error);
    res.status(500).json({ error: "Impossible de récupérer les scores pour le moment" });
  }
}
