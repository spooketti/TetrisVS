const loginEndpoint = "http://127.0.0.1:8086/login/"
const signupEndpoint = "http://127.0.0.1:8086/signup/"

function login()
{
    let userID = document.getElementById("userIDLogin").value
    let password = document.getElementById("passwordLogin").value
    let payload = 
    {
      "userID":userID,
      "password":password
    }
    fetch(loginEndpoint,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
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
            localStorage.setItem("jwt",data["jwt"])
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
}

function signup()
{
  let payload = 
  {
    "userID":document.getElementById("userIDSignup").value,
    "username":document.getElementById("usernameSignup").value,
    "password":document.getElementById("passwordSignup").value,
    "pfp": pfpChanged ? pfpPreview.src : defaultPFP,
  }
    fetch(signupEndpoint,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
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
            //let jwt = JSON.parse(data)
            if(data["error"])
            {
              showException(data["error"])
              return
            }
            localStorage.setItem("jwt",data["jwt"])
            window.location.href = "app.html"
          })
          .catch(error => {
            console.error("There was a problem with the fetch", error);
          });
}