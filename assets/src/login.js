const loginEndpoint = "https://tetrisvs.stu.nighthawkcodingsociety.com/login/"
const signupEndpoint = "https://tetrisvs.stu.nighthawkcodingsociety.com/signup/"
let loginSharpenElement = document.getElementById("LoginSharpen")
const sharpRadius = 150;
let loginOpen = true;
let loginField = document.getElementById("LoginForum")
let signupField = document.getElementById("SignupForum")
let pfpFile = document.getElementById("uploadPFPFile")
let pfpPreview = document.getElementById("signupPFPPreview")
let LoginSplashMessage = document.getElementById("LoginSplashMessage")
let SignupSplashMessage = document.getElementById("SignupSplashMessage") 
let signupForm = document.getElementById("signupForm")
let loginForm = document.getElementById("loginForm")
let loginFail = document.getElementById("LoginFail")
let signSplash = ["Signup to Tetris","Join the T-Spinning","Finally: A Tetris website with SRS rotation","Advik's Voice Actor Debut"]
let loginSplash = ["Welcome back to Tetris", "Learn some openers", "Stickspin is kinda goated?", "Back to Back Login"]
let pfpChanged = false
let pfpDefault

let xhr = new XMLHttpRequest();       
    xhr.open("GET", "https://i.ibb.co/jWTYmQS/Default-PFP.png", true); 
    xhr.responseType = "blob";
    xhr.onload = function () {
            let reader = new FileReader();
            reader.onload = function(event) {
               let res = event.target.result;
               pfpDefault = res
            }
            let file = this.response;
            reader.readAsDataURL(file)
    };
    xhr.send()

pfpFile.addEventListener('change', function(event) {
  pfpChanged = true
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const imageUrl = event.target.result;
          const image = new Image();
          image.src = imageUrl;
          image.onload = function() {
              pfpChanged = true
              pfpPreview.src = image.src
          };
      };
      reader.readAsDataURL(file);
  }
});

signupForm.addEventListener("submit",function(e)
{
  e.preventDefault()
  signup()
})

loginForm.addEventListener("submit",function(e)
{
  e.preventDefault()
  login()
})

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
    "pfp": pfpChanged ? pfpPreview.src : pfpDefault,
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
            localStorage.setItem("jwt",data["jwt"])
            window.location.href = "index.html"
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
LoginSplashMessage.innerText = loginSplash[Math.floor(Math.random() * loginSplash.length)]