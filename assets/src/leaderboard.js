document.addEventListener("DOMContentLoaded", function() {
  fetch('http://127.0.0.1:8086/getLeaderboard/')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector("#leaderboard-table tbody");
          data.forEach(entry => {
              const row = document.createElement("tr");
              const userCell = document.createElement("td");
              userCell.textContent = entry.user;
              row.appendChild(userCell);

              const scoreCell = document.createElement("td");
              scoreCell.textContent = entry["high score"];
              row.appendChild(scoreCell);

              const dateCell = document.createElement("td");
              dateCell.textContent = entry.date;
              row.appendChild(dateCell);

              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching the leaderboard data:', error);
      });
});