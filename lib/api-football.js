export async function getDashboardData() {
  return {
    matches: [
      {
        teams: {
          home: { name: "Selma FC" },
          away: { name: "Demo United" },
        },
        goals: {
          home: 1,
          away: 0,
        },
        fixture: {
          status: { long: "Demo" },
          date: new Date().toISOString(),
        },
      },
    ],
  };
}
