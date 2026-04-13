export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, sport } = req.query;

  const today = new Date();
  const formatData = (date) => date.toISOString().split('T')[0];

  // --- PARTIE TENNIS ---
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

  // --- PARTIE FOOTBALL ---
  let endpoint = 'fixtures?live=all'; 

  if (type === 'next') {
    const dateTo = new Date();
    dateTo.setDate(today.getDate() + 14); // + 2 semaines
    endpoint = `fixtures?from=${formatData(today)}&to=${formatData(dateTo)}`;
  } 
  else if (type === 'past') {
    const dateFrom = new Date();
    dateFrom.setDate(today.getDate() - 7); // - 1 semaine
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    endpoint = `fixtures?from=${formatData(dateFrom)}&to=${formatData(yesterday)}`;
  }

  const optionsFoot = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com' // Hôte le plus stable
    }
  };

  try {
    // Utilisation de l'URL RapidAPI (plus fiable que api-sports.io en direct)
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, optionsFoot);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur Football" });
  }
}


