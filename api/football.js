
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, sport } = req.query; // Le site peut maintenant préciser le sport

  // SI C'EST DU TENNIS
  if (sport === 'tennis') {
    const optionsTennis = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'ultimate-tennis1.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch('https://ultimate-tennis1.p.rapidapi.com/tournaments/live', optionsTennis);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: "Erreur Tennis" });
    }
  }

  // SINON, PAR DÉFAUT : FOOTBALL (API-SPORTS)
  let endpoint = 'fixtures?live=all'; 
  if (type === 'next') endpoint = 'fixtures?next=15';
  if (type === 'past') endpoint = 'fixtures?last=15';

  const optionsFoot = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, optionsFoot);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur Football" });
  }
}
