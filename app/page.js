
'use client';
import { useState, useEffect } from 'react';

export default function SelmaApp() {
  const [matchs, setMatchs] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    fetch('/api/football')
      .then(res => res.json())
      .then(data => {
        setMatchs(data.response || []);
        setChargement(false);
      })
      .catch(() => setChargement(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#3b82f6', marginBottom: '30px' }}>Selma Sport ⚽</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {chargement ? (
          <p style={{ textAlign: 'center' }}>Recherche des scores...</p>
        ) : matchs.length > 0 ? (
          matchs.map((m) => (
            <div key={m.fixture.id} style={{ backgroundColor: '#1e293b', borderRadius: '15px', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <img src={m.teams.home.logo} width="40" alt="logo" />
                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>{m.teams.home.name}</p>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{m.goals.home} - {m.goals.away}</div>
                <div style={{ color: '#ef4444', fontSize: '0.7rem', fontWeight: 'bold' }}>{m.fixture.status.elapsed}' DIRECT</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <img src={m.teams.away.logo} width="40" alt="logo" />
                <p style={{ fontSize: '0.8rem', marginTop: '5px' }}>{m.teams.away.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>Aucun match en direct pour le moment.</p>
        )}
      </div>
    </div>
  );
}
