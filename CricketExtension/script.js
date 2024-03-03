async function getMatchData() {
  try {
    const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=20f072ef-eba3-441b-b14f-6f49608a6b3b&offset=0");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status !== "success") return;

    const matchesList = data.data;
    if (!matchesList) return;

    //const currentDate = new Date().toISOString().split('T')[0];

    const matchListElement = document.getElementById("matches");
    matchListElement.innerHTML = ""; // Clear existing content

    const ongoingMatches = matchesList
      // .filter(match => match.series_id === "8e0d1bbb-eca0-4caf-82e1-b4ccd80d62d4")
      // .filter(match => {
      //   // Parse the date from the API response
      //   //const matchDate = match.date;
      //   return match.date >= currentDate;
      // });

    ongoingMatches.forEach((match, index) => {
      const scores = match.score;
      const teams = match.teamInfo;

      if (scores && scores.length >= 2 && teams && teams.length >= 2) {
        const team1 = scores[0];
        const team2 = scores[1];
        const team3 = teams[0];
        const team4 = teams[1];

        const matchData = document.createElement("li");
        matchData.innerHTML = `
          <p>${match.name}</p>
          <p>${match.status}</p>
          <p>${team3.shortname}: Runs - ${team1.r}, Wickets - ${team1.w}, Overs - ${team1.o}</p>
          <p>${team4.shortname}: Runs - ${team2.r}, Wickets - ${team2.w}, Overs - ${team2.o}</p>
        `;

        matchListElement.appendChild(matchData);

        // Add a horizontal line if it's not the last match
        if (index < ongoingMatches.length - 1) {
          const horizontalLine = document.createElement("hr");
          matchListElement.appendChild(horizontalLine);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

getMatchData();
