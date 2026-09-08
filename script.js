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

// Firebase Configuration (මෙතැනට ඔබේ Firebase Config එක Paste කරන්න)
const firebaseConfig = {
    apiKey: "AIzaSyAeav3-bNyid6x97sgT48CPI3eJTbtTW6o",
    authDomain: "alpha-edge-traders.firebaseapp.com",
    projectId: "alpha-edge-traders",
    storageBucket: "alpha-edge-traders.firebasestorage.app",
    messagingSenderId: "750669928222",
    appId: "1:750669928222:web:51e64d7b1bb22248b05b0f"
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
const submitBtn = document.getElementById('submitBtn');
const toggleAuth = document.getElementById('toggleAuth');
const authTitle = document.getElementById('authTitle');
const toggleMsg = document.getElementById('toggleMsg');
const googleBtn = document.getElementById('googleBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userEmail = document.getElementById('userEmail');

let isSignUp = false;

// Mode Toggle (Sign In <-> Sign Up)
toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    authTitle.innerHTML = isSignUp ? '<i class="fas fa-user-plus"></i> Create Account' : '<i class="fas fa-lock"></i> Account Sign In';
    submitBtn.textContent = isSignUp ? 'Sign Up' : 'Sign In';
    toggleMsg.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
    toggleAuth.textContent = isSignUp ? 'Sign In' : 'Sign Up';
});

// Email & Password Auth
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (isSignUp) {
        createUserWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message));
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .catch(error => alert(error.message));
    }
});

// Google Authentication
googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .catch(error => alert(error.message));
});

// Logout
logoutBtn.addEventListener('click', () => signOut(auth));

// Auth State Monitor (User Login වී ඇත්දැයි පරීක්ෂා කිරීම)
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