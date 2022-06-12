
var x = document.getElementById("Login");
var y = document.getElementById("Register");
var z = document.getElementById("btn");
const socialIcons = document.querySelector(".social-icons");
const inputGroup = document.querySelector(".input-group");

function Register(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    
    socialIcons.style.display = "none";
}

function Login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
    socialIcons.style.display = "block";

}

/* ************************************************************* */
/*                          SCRIPT FIREBASE                      */
/* ************************************************************* */
// Your web app's Firebase configuration
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
const fs = firebase.firestore();



/* ************************************************************* */
/*                           JS FIREBASE                         */
/* ************************************************************* */

const loginCheck = (user) => {
  if (user) {
    console.log("El usuario está logueado")
    window.location.href = "../index.html";

  } else {
    console.log("El usuario no está logueado")
  }
};

// events
// list for auth state changes
/* se dispara cuando se loguea o se desloguea */
auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("signin");
      fs.collection("usuarios").doc(user.uid)
        .get()
        .then((snapshot) => {
          let userToSave = snapshot.data();
          /*console.log(user.uid)
          console.log(snapshot)
          console.log(snapshot.docs)*/
          console.log(snapshot.data())
          saveUserStorage(userToSave.username, userToSave.telefono, userToSave.email
            ,"usuario",userToSave.id)

          //setupPosts(snapshot.docs);
          loginCheck(user);
  
        });
      /*
      fs.collection("posts")
        .get()
        .then((snapshot) => {
          
          console.log(snapshot.docs.uid)
          //setupPosts(snapshot.docs);
          loginCheck(user);
  
        });*/
        // COSAS A HACER CUANDO INGRESE
        //loginCheck(user);
    } else {
      console.log("signout");
      //setupPosts([]);
      loginCheck(user);
    }
  });
/* ************************************************************* */
/*                            SIGN UP                            */
/* ************************************************************* */

const signUpForm = document.querySelector("#Register");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cargando();
  const username = signUpForm["signup-username"].value;
  const telephone = signUpForm["signup-telephone"].value;
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  // Authenticate the User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // clear the form
      //signUpForm.reset();
      // close the modal
      //$("#signupModal").modal("hide");

      console.log("Registrado Correctamente")


      //saveUserStorage(username, telephone, email,"usuario",userCredential.user.uid)

      console.log(userCredential.user.uid)
      
      fs.collection("usuarios").doc(userCredential.user.uid).set({
          username: username,
          telefono: telephone,
          email: email,
          rol: "usuario",
          id: userCredential.user.uid
      })
      .then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
      

    });
});

/* ************************************************************* */
/*                             LOGOUT                            */
/* ************************************************************* */

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
    removeUserStorage();
  });
});

/* ************************************************************* */
/*                            SIGN IN                            */
/* ************************************************************* */

const signInForm = document.querySelector("#Login");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cargando();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    console.log(userCredential)
    //console.log("Logueado Correctamente")
    //saveUserStorage(username, telephone, email,"usuario",userCredential.user.uid)

    // clear the form
    //signInForm.reset();
    // close the modal
    //$("#signinModal").modal("hide");
    
  });
});




/* ************************************************************* */
/*                       LOGIN WITH GOOGLE                       */
/* ************************************************************* */
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  //signInForm.reset();
  //$("#signinModal").modal("hide");

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    /*console.log(result.user);
    console.log(result.user.uid);
    console.log((result.user.displayName.split(" "))[0]);
    console.log(result.user.displayName);
    console.log(result.user.phoneNumber);
    console.log(result.user.email);*/
    console.log("google sign in, redirect");
    //window.location.href = "./Curso1.html";

    // saveUserStorage((result.user.displayName.split(" "))[0],
    // (result.user.phoneNumber)? result.user.phoneNumber: "",
    // result.user.email,"usuario",result.user.uid)

    
    fs.collection("usuarios").doc(result.user.uid).set({
        username: (result.user.displayName.split(" "))[0],
        telefono: (result.user.phoneNumber)? result.user.phoneNumber: "",
        email: result.user.email,
        rol: "usuario",
        id: result.user.uid
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  })
  .catch(err => {
    console.log(err);
  })
});

/* ************************************************************* */
/*                      LOGIN WITH FACEBOOK                     */
/* ************************************************************* */

const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', e => {
  e.preventDefault();
  //signInForm.reset();
  //$("#signinModal").modal("hide");

  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    /*console.log(result);
    console.log(result.user);
    console.log(result.user.uid);
    console.log((result.user.displayName.split(" "))[0]);
    console.log(result.user.displayName);
    console.log(result.user.phoneNumber);
    console.log(result.user.email);*/
    console.log("facebook sign in");


    // saveUserStorage((result.user.displayName.split(" "))[0],
    // (result.user.phoneNumber)? result.user.phoneNumber: "",
    // result.user.email,"usuario",result.user.uid)


    fs.collection("usuarios").doc(result.user.uid).set({
        username: (result.user.displayName.split(" "))[0],
        telefono: (result.user.phoneNumber)? result.user.phoneNumber: "",
        email: result.user.email,
        rol: "usuario",
        id: result.user.uid
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  })
  .catch(err => {
    console.log(err);
  })

})





function saveUserStorage(_username,_telefono,_email,_rol,_id){
    sessionStorage.setItem('userSave', 
        JSON.stringify({
            username: _username,
            telefono: _telefono,
            email: _email,
            rol: _rol,
            id: _id
        }
        )
    );
}

function getUserStorage(){
    return JSON.parse(sessionStorage.getItem('userSave'));
}
function removeUserStorage(){
    sessionStorage.removeItem('userSave');
}




function cargando() {
  return Swal.fire({
    title: "Cargando...",
    showConfirmButton: false,
    allowOutsideClick: false,
    imageUrl: "../gifs/load.gif"
  });
}