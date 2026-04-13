
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
      console.error("Erreur de récupération:", err);
    }
    setLoading(false);
  };

  const generatePrediction = (matchId) => {
    const previsions = ["2-1", "1-0", "1-1", "0-2", "2-2", "3-1", "1-2"];
    const text = previsions[Math.floor(Math.random() * previsions.length)];
    setPrediction(prev => ({ ...prev, [matchId]: `IA Prédit: ${text}` }));
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '15px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#3b82f6', fontSize: '1.8rem' }}>Selma Sport ⚽</h1>
      
      {/* Sélecteur de Catégories */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '20px 0' }}>
        {[
          { id: 'live', label: 'Direct' },
          { id: 'next', label: 'Prochains' },
          { id: 'past', label: 'Derniers' }
        ].map((t) => (
          <button 
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 12px', borderRadius: '12px', border: 'none',
              backgroundColor: tab === t.id ? '#3b82f6' : '#1e293b',
              color: 'white', fontWeight: 'bold', fontSize: '0.9rem'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Analyse du terrain...</p>
        ) : matchs.length > 0 ? (
          matchs.map((m) => (
            <div key={m.fixture.id} style={{ backgroundColor: '#1e293b', borderRadius: '15px', padding: '15px', marginBottom: '15px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={m.teams.home.logo} width="40" alt="logo" />
                  <p style={{ fontSize: '0.75rem', marginTop: '5px' }}>{m.teams.home.name}</p>
                </div>
                
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {tab === 'next' ? 'VS' : `${m.goals.home} - ${m.goals.away}`}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold' }}>
                    {m.fixture.status.elapsed ? `${m.fixture.status.elapsed}'` : m.fixture.status.short}
                  </div>
                </div>

                <div style={{ textAlign: 'center', flex: 1 }}>
                  <img src={m.teams.away.logo} width="40" alt="logo" />
                  <p style={{ fontSize: '0.75rem', marginTop: '5px' }}>{m.teams.away.name}</p>
                </div>
              </div>

              {/* Options supplémentaires */}
              <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #334155', textAlign: 'center' }}>
                
                {/* Bouton Prédiction */}
                {tab !== 'past' && (
                  <button 
                    onClick={() => generatePrediction(m.fixture.id)}
                    style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#3b82f6', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem' }}
                  >
                    {prediction[m.fixture.id] || "🔮 Prédiction Score"}
                  </button>
                )}

                {/* Résumé Vidéo et Buteurs (Simulé via recherche YouTube) */}
                {tab === 'past' && (
                  <div>
                     <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px' }}>Match terminé</p>
                     <a 
                      href={`https://www.youtube.com/results?search_query=${m.teams.home.name}+vs+${m.teams.away.name}+goals+highlights`} 
                      target="_blank"
                      style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}
                    >
                      📺 Voir les buts
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Aucun match trouvé dans cette catégorie.</p>
        )}
      </div>
    </div>
  );
}
