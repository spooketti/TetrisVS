const loginEndpoint = "http://127.0.0.1:8086/login/"
const signupEndpoint = "http://127.0.0.1:8086/signup/"
let loginSharpenElement = document.getElementById("LoginSharpen")
const sharpRadius = 150;
let loginOpen = true;
let loginField = document.getElementById("LoginForum")
let signupField = document.getElementById("SignupForum")
let pfpFile = document.getElementById("uploadPFPFile")
let pfpPreview = document.getElementById("signupPFPPreview")
let SignupSplashMessage = document.getElementById("SignupSplashMessage") 
let signupForm = document.getElementById("signupForm")
let loginForm = document.getElementById("loginForm")
let loginFail = document.getElementById("LoginFail")
let signSplash = ["Signup to Relay","Join the discussion"]
let loginSplash = ["Welcome back to Relay", "let today = new Day()","This is just a fancy way to fetch()"]

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

document.addEventListener("mousemove",function(e)
{
  loginSharpenElement.style.left = `${e.clientX-sharpRadius}px`
  loginSharpenElement.style.top = `${e.clientY-sharpRadius}px`
  loginSharpenElement.style.backgroundPositionX = `${e.clientX/10}px`
  loginSharpenElement.style.backgroundPositionY = `${e.clientY/10}px`
})

function toggleUI()
{
 loginOpen = !loginOpen
 if(loginOpen)
 {
  loginField.style.display = "flex"
  signupField.style.display = "none"
  loginField.style.animation = "fadeInUp 1s ease"
  LoginSplashMessage.innerText = loginSplash[Math.floor(Math.random() * loginSplash.length)]
  return
 }
 loginField.style.display = "none"
 signupField.style.display = "flex"
 signupField.style.animation = "fadeInUp 1s ease"
 SignupSplashMessage.innerText = signSplash[Math.floor(Math.random() * signSplash.length)]
}