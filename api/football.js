
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, sport } = req.query;

  // Sécurité si la clé est manquante dans Vercel
  if (!API_KEY) {
    return res.status(500).json({ error: "La clé API est manquante dans Vercel" });
  }

  const today = new Date();
  const formatData = (date) => date.toISOString().split('T')[0];

  // --- CONFIGURATION DE L'URL ---
  let url = '';
  let host = '';

  if (sport === 'tennis') {
    url = 'https://ultimate-tennis1.p.rapidapi.com/tournaments/live';
    host = 'ultimate-tennis1.p.rapidapi.com';
  } else {
    host = 'api-football-v1.p.rapidapi.com';
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
    url = `https://api-football-v1.p.rapidapi.com/v3/${endpoint}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': host
      }
    });

    const data = await response.json();

    // DEBUG : Si l'API renvoie une erreur au lieu de matchs
    if (data.errors && Object.keys(data.errors).length > 0) {
      return res.status(200).json({ 
        debug_error: "L'API refuse la connexion", 
        details: data.errors 
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur de serveur" });
  }
}

