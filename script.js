import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ඔබගේ Firebase Configuration එක
const firebaseConfig = {
    apiKey: "AIzaSyAeav3-bNyid6x97sgT48CPI3eJTbtTW6o",
    authDomain: "alpha-edge-traders.firebaseapp.com",
    projectId: "alpha-edge-traders",
    storageBucket: "alpha-edge-traders.firebasestorage.app",
    messagingSenderId: "750669928222",
    appId: "1:750669928222:web:51e64d7b1bb22248b05b0f",
    measurementId: "G-NC7E59BQ0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// UI Elements
const authContainer = document.getElementById('authContainer');
const mainWebsite = document.getElementById('mainWebsite');
const authForm = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const googleBtn = document.getElementById('googleBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');

// 1. Sign In (Form Submit එකෙන්)
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .catch(error => alert("Login Error: " + error.message));
});

// 2. Sign Up (කොළ පාට Sign Up Button එකෙන්)
signUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        alert("කරුණාකර Email එක සහ Password එක ඇතුළත් කරන්න.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert("Account එක සාර්ථකව සෑදුවා! දැන් ඔබට වීඩියෝ නැරඹිය හැක."))
        .catch(error => alert("Sign Up Error: " + error.message));
});

// 3. Google Authentication
googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .catch(error => alert("Google Sign-In Error: " + error.message));
});

// 4. Logout
logoutBtn.addEventListener('click', () => signOut(auth));

// 5. Auth State Monitor
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.classList.add('hidden');
        mainWebsite.classList.remove('hidden');
        userEmail.textContent = user.email;
    } else {
        authContainer.classList.remove('hidden');
        mainWebsite.classList.add('hidden');
    }
});

// Video Switcher Function
window.playVideo = function(videoPath, title, description, element) {
    const mainVideo = document.getElementById('mainVideo');
    const videoSource = document.getElementById('videoSource');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');

    videoSource.src = videoPath;
    mainVideo.load();
    mainVideo.play();

    videoTitle.textContent = title;
    videoDesc.textContent = description;

    document.querySelectorAll('.video-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
};
