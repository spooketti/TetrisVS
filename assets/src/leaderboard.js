function showLeaderboard() {
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    fetchLeaderboard();
}

function hideLeaderboard() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

function fetchLeaderboard() {
    fetch('http://127.0.0.1:8086/getLeaderboard')
      .then(response => response.json())
      .then(data => {
        const tbody = document.getElementById('leaderboardTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        data.forEach(entry => {
          const row = tbody.insertRow();
          const cellUser = row.insertCell(0);
          const cellDate = row.insertCell(1);
          const cellScore = row.insertCell(2);
          cellUser.textContent = entry.user;
          cellDate.textContent = entry.datetime;
          cellScore.textContent = entry.highscore;
        });
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
}