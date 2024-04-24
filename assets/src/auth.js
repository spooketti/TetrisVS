let authEndpoint = "http://127.0.0.1:6221/auth/"
fetch(authEndpoint,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
    }).then(response => {
      if (response.ok) {
        
        return response.json()
      }
      throw new Error("Network response failed")
    }).then(data => {
        document.getElementById("LoginAnchor").remove()
        document.getElementById("UsernameID").innerText = `Username: ${data["username"]}`
     console.log(data)
    })
    .catch(error => {
      document.getElementById("UsernameID").remove()
      console.error("There was a problem with the fetch", error);
    });