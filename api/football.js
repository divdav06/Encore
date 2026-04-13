
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type } = req.query;

  // Configuration des points d'accès pour API-Football
  let endpoint = 'fixtures?live=all'; 
  if (type === 'next') endpoint = 'fixtures?next=10';
  if (type === 'past') endpoint = 'fixtures?last=10';

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, options);
    const data = await response.json();
    
    // On envoie les données à ton application
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion à l'API" });
  }
}
