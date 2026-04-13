'use client';
import { useState, useEffect } from 'react';

export default function SelmaSport() {
  const [matchs, setMatchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('live'); // Onglets: live, next, past
  const [prediction, setPrediction] = useState({});

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/football?type=${type}`);
      const data = await res.json();
      setMatchs(data.response || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getPrediction = (matchId, home, away) => {
    const scores = ["2-1", "1-0", "1-1", "0-2", "2-2", "3-1"];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    setPrediction(prev => ({ ...prev, [matchId]: `IA Prédit: ${randomScore}` }));
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '15px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#3b82f6' }}>Selma Sport ⚽</h1>
      
      {/* Barre d'onglets */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {['live', 'next', 'past'].map((t) => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '10px 15px', borderRadius: '20px', border: 'none',
              backgroundColor: tab === t ? '#3b82f6' : '#1e293b',
              color: 'white', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            {t === 'live' ? 'Direct' : t === 'next' ? 'À venir' : 'Résultats'}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Chargement...</p>
        ) : matchs.length > 0 ? (
          matchs.map((m) => (
            <div key={m.fixture.id} style={{ backgroundColor: '#1e293b', borderRadius: '15px', padding: '15px', marginBottom: '15px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={m.teams.home.logo} width="40" alt="logo" />
                  <p style={{ fontSize: '0.8rem' }}>{m.teams.home.name}</p>
                </div>
                
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {tab === 'next' ? 'vs' : `${m.goals.home} - ${m.goals.away}`}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: m.fixture.status.short === 'FT' ? '#94a3b8' : '#ef4444' }}>
                    {m.fixture.status.elapsed ? `${m.fixture.status.elapsed}'` : m.fixture.status.long}
                  </div>
                </div>

                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={m.teams.away.logo} width="40" alt="logo" />
                  <p style={{ fontSize: '0.8rem' }}>{m.teams.away.name}</p>
                </div>
              </div>

              {/* Zone Prédiction et Buteurs */}
              <div style={{ marginTop: '10px', borderTop: '1px solid #334155', paddingTop: '10px', textAlign: 'center' }}>
                {tab !== 'past' && (
                  <button 
                    onClick={() => getPrediction(m.fixture.id, m.teams.home.name, m.teams.away.name)}
                    style={{ background: 'none', border: '1px dashed #3b82f6', color: '#3b82f6', padding: '5px 10px', borderRadius: '10px', fontSize: '0.8rem' }}
                  >
                    {prediction[m.fixture.id] || "🔮 Demander une prédiction"}
                  </button>
                )}
                
                {tab === 'past' && (
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    <p>Match terminé</p>
                    <a href={`https://www.youtube.com/results?search_query=${m.teams.home.name}+vs+${m.teams.away.name}+highlights`} target="_blank" style={{ color: '#ef4444', textDecoration: 'none' }}>
                      📺 Voir le résumé vidéo
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Aucune donnée disponible.</p>
        )}
      </div>
    </div>
  );
}
