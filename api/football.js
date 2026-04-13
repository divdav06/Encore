export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, league } = req.query; 
  
  let endpoint = 'fixtures?live=all';
  if (type === 'next') endpoint = 'fixtures?next=20';
  if (type === 'past') endpoint = 'fixtures?last=20';
  if (type === 'standings') endpoint = `standings?league=${league || 39}&season=2025`; // Par défaut Premier League

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'v3.football.api-sports.io'
    }
  };

  try {
    const response = await fetch(`https://v3.football.api-sports.io/${endpoint}`, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur API" });
  }
}

