
const ingresar = document.querySelector(".ingresar");
const logueado = document.querySelector(".logueado");
const loggedUser = document.getElementById("logged-user1");
const modalContent = document.getElementById("modal-body");

var firebaseConfig = {
    // YOUR FIREBASE CREDENTIALS HERE 
    /*apiKey: "AIzaSyCj3KUX75wqOSNHQm-uEyQve1DNuI68a2Q",
    authDomain: "fb-auth-6c6d3.firebaseapp.com",
    projectId: "fb-auth-6c6d3",
    storageBucket: "fb-auth-6c6d3.appspot.com",
    messagingSenderId: "812629036491",
    appId: "1:812629036491:web:7c92dd5c0c8b7f5e253a4e"*/
    apiKey: "AIzaSyAW7nZr3H4vpVsV59gZGkr4fxFwDGhULFY",
    authDomain: "puppycare-9f547.firebaseapp.com",
    projectId: "puppycare-9f547",
    storageBucket: "puppycare-9f547.appspot.com",
    messagingSenderId: "700917022800",
    appId: "1:700917022800:web:ebcbc955de158dceaa9155"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");

    sessionStorage.removeItem('userSave');

    location.reload();
  });
});

window.addEventListener("load", () => {
  //console.log("Funcionó el onload");
  let saveUserStorage = JSON.parse(sessionStorage.getItem("userSave"));

  if (saveUserStorage) {
    ingresar.style.display = "none";
    logueado.style.display = "block";
    loggedUser.innerHTML = `<label class="logged-user">${saveUserStorage.username}</label>` ;
    logueado.classList.add("loggerprint");
    modalContent.innerHTML = `
            <p>${saveUserStorage.username}</p>
            <p>${saveUserStorage.email}</p>
            <p>${saveUserStorage.telefono}</p>
    `

  } else {
    ingresar.style.display = "block";
    logueado.style.display = "none";
    logueado.classList.remove("loggerprint");
  }
  //console.log(saveUserStorage);
});








const btnMenu = document.querySelector("#btnMenu");
const menu = document.querySelector("#menu");
btnMenu.addEventListener("click", function(){
    menu.classList.toggle("mostrar");
});


const nav = document.querySelector('header')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 50) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}