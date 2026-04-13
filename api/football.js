
export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const { type, sport } = req.query;

  // 1. Vérification de la clé
  if (!API_KEY) {
    return res.status(500).json({ error: "La clé API est absente des variables Vercel" });
  }

  const today = new Date();
  const formatData = (date) => date.toISOString().split('T')[0];

  try {
    // --- OPTION TENNIS ---
    if (sport === 'tennis') {
      const response = await fetch('https://ultimate-tennis1.p.rapidapi.com/tournaments/live', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'ultimate-tennis1.p.rapidapi.com'
        }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    // --- OPTION FOOTBALL (Par défaut) ---
    let endpoint = 'fixtures?live=all'; 

    if (type === 'next') {
      const dateTo = new Date();
      dateTo.setDate(today.getDate() + 14); // + 2 semaines
      endpoint = `fixtures?from=${formatData(today)}&to=${formatData(dateTo)}`;
    } 
    else if (type === 'past') {
      const dateFrom = new Date();
      dateFrom.setDate(today.getDate() - 7); // - 1 semaine
      endpoint = `fixtures?from=${formatData(dateFrom)}&to=${formatData(today)}`;
    }

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/${endpoint}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    });

    const data = await response.json();
    
    // On renvoie les données (le site s'occupe de l'affichage)
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Erreur de connexion au serveur" });
  }
}

