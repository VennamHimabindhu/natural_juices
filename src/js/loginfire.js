// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRBgVLUe5D0pIhvMqE9NhbovsVKCV9xUU",
  authDomain: "natures-sip.firebaseapp.com",
  projectId: "natures-sip",
  storageBucket: "natures-sip.appspot.com",
  messagingSenderId: "714786805513",
  appId: "1:714786805513:web:3bdbb03c883122cbf7a5d8",
  measurementId: "G-RFWCXV23X5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Toggle Login/Signup Mode
let isLogin = true;
function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("toggle-text").innerText = isLogin ? "Don't have an account?" : "Already have an account?";
  document.getElementById("toggle-button").innerText = isLogin ? "Sign Up" : "Login";
}

// Handle Authentication (Login/Signup)
function handleAuth() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  errorMessage.innerText = ""; // Clear error message

  if (isLogin) {
      // Login User
      auth.signInWithEmailAndPassword(email, password)
          .then(() => alert("Login successful!"))
          .catch(error => errorMessage.innerText = error.message);
  } else {
      // Signup User
      auth.createUserWithEmailAndPassword(email, password)
          .then(() => alert("Signup successful!"))
          .catch(error => errorMessage.innerText = error.message);
  }
}
