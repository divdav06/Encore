
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, league } = req.query;

  // Configuration de l'URL selon l'onglet (Direct, Prochains, Derniers)
  let endpoint = 'fixtures?live=all';
  if (type === 'next') endpoint = 'fixtures?next=20';
  if (type === 'past') endpoint = 'fixtures?last=20';
  
  // Configuration pour le classement (Standings)
  if (type === 'standings') {
    endpoint = `standings?league=${league || 39}&season=2025`;
  }

  const options = {
    method: 'GET',
    headers: {
      // On utilise l'hôte RapidAPI qui correspond à ta clé
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'free-football-api-data.p.rapidapi.com'
    }
  };

  try {
    // Appel vers le serveur RapidAPI
    const response = await fetch(`https://free-football-api-data.p.rapidapi.com/${endpoint}`, options);
    const data = await response.json();

    // On renvoie les données au site Selma Sport
    res.status(200).json(data);
  } catch (error) {
    console.error("Erreur API:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des matchs" });
  }
}
