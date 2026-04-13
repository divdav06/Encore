
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, sport } = req.query;

  const today = new Date();
  const formatData = (date) => date.toISOString().split('T')[0];

  try {
    // --- TENNIS ---
    if (sport === 'tennis') {
      const response = await fetch('https://ultimate-tennis1.p.rapidapi.com/tournaments/live', {
        headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'ultimate-tennis1.p.rapidapi.com' }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    // --- FOOTBALL ---
    let endpoint = 'fixtures?live=all'; 
    if (type === 'next') {
      const dateTo = new Date();
      dateTo.setDate(today.getDate() + 14);
      endpoint = `fixtures?from=${formatData(today)}&to=${formatData(dateTo)}`;
    } else if (type === 'past') {
      const dateFrom = new Date();
      dateFrom.setDate(today.getDate() - 7);
      endpoint = `fixtures?from=${formatData(dateFrom)}&to=${formatData(today)}`;
    }

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, {
      headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': 'api-football-v1.p.rapidapi.com' }
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}

