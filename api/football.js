export default async function handler(req, res) {
  // On récupère la clé depuis les paramètres Vercel (plus sécurisé)
  const API_KEY = process.env.FOOTBALL_API_KEY; 
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  };

  try {
    // On récupère les matchs en direct (live)
    const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'appel API" });
  }
}

