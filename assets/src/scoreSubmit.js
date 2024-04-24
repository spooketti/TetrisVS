function submitScore()
{
    let payload = 
    {
      "score":score,
    }
    let loginEndpoint = "http://127.0.0.1:6221/leaderboard/"
    fetch(loginEndpoint,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
              },
            credentials: "include",
            body: JSON.stringify(payload)
        }).then(response =>{
            if(response.ok)
            {
                return response.json()
            }
            throw new Error("Network response failed")
        }).then(data => {
            console.log(data)
            console.log(data["message"])
            if(data["message"] == null)
            {
                return
            }
           document.getElementById("flagMessage").innerText = data["message"]
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
}
