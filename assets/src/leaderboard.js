let isLBOpen = false
document.addEventListener("DOMContentLoaded", function () {
    fetch('http://127.0.0.1:8080/getLeaderboard/', { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tableBody = document.querySelector("#leaderboard-table tbody");
            data.forEach(entry => {
                const row = document.createElement("tr");
                const userCell = document.createElement("td");
                userCell.textContent = entry.user;
                row.appendChild(userCell);

                const scoreCell = document.createElement("td");
                scoreCell.textContent = entry["highScore"];
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

let lbContainer = document.getElementById("leaderboard-container")

function toggleLB() {
    isLBOpen = !isLBOpen

    if (isLBOpen) {
        lbContainer.style.display = "block"
        lbContainer.style.animation = "expandLB 1s cubic-bezier(.08,1.9,1,.86) forwards"
        document.getElementById("ToggleLB").innerText = "Close Leaderboard"
        return
    }
    lbContainer.style.animation = "shrinkLB 1s cubic-bezier(.08,1.9,1,.86) forwards"
    document.getElementById("ToggleLB").innerText = "Show Leaderboard"
    window.setTimeout(function(){lbContainer.style.display = "none"},1000)
}