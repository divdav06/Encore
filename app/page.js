
import { getDashboardData } from "../lib/api-football";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main style={{ padding: 20 }}>
      <h1>Selma App ⚽</h1>

      <h2>Matchs du jour</h2>

      {data?.matches?.length > 0 ? (
        data.matches.map((match, index) => (
          <div key={index}>
            {match.teams.home.name} vs {match.teams.away.name}
          </div>
        ))
      ) : (
        <p>Aucun match trouvé</p>
      )}
    </main>
  );
}
