// Firebase SDK Imports (if used)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDopTGhuSn5UZs645m_Tno2VTY_xrQPvLI",
  authDomain: "startspark-169b2.firebaseapp.com",
  projectId: "startspark-169b2",
  storageBucket: "startspark-169b2.appspot.com",
  messagingSenderId: "487807915478",
  appId: "1:487807915478:web:7d85f33b12f5d5b6f64077",
  measurementId: "G-4R2Q31W9EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// =============================
// Authentication
// =============================
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtn2 = document.getElementById("logoutBtn2");
const userEmailDisplay = document.getElementById("userEmail");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("✅ Sign-up successful!");
        signupForm.reset();
      })
      .catch(err => alert("❌ " + err.message));
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("✅ Logged in successfully!");
        loginForm.reset();
      })
      .catch(err => alert("❌ " + err.message));
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => signOut(auth));
}
if (logoutBtn2) {
  logoutBtn2.addEventListener("click", () => signOut(auth));
}

// Auth State Change
onAuthStateChanged(auth, (user) => {
  const profileSection = document.getElementById("profile");
  if (user) {
    userEmailDisplay.innerText = user.email;
    profileSection.classList.remove("hidden");
    logoutBtn.classList.remove("hidden");
  } else {
    profileSection.classList.add("hidden");
    logoutBtn.classList.add("hidden");
  }
});

// =============================
// Idea Tool Logic (Free Plan)
// =============================
let usageCount = localStorage.getItem("idea_uses") || 0;
document.getElementById("ideaForm").addEventListener("submit", (e) => {
  e.preventDefault();

  usageCount++;
  localStorage.setItem("idea_uses", usageCount);

  if (usageCount <= 3) {
    const idea = generateIdea();
    document.getElementById("ideaResult").innerText = `✨ Here's your idea #${usageCount}: ${idea}`;
  } else {
    document.getElementById("ideaResult").innerHTML = `
      ❌ You have reached the free limit of 3 ideas (StartSpark Plan).<br>
      💳 <button class="bg-green-600 text-white px-4 py-2 mt-2 rounded" onclick="fakePayment()">Upgrade to Premium</button>
    `;
  }
});

// Simulate Payment
window.fakePayment = function () {
  alert("✅ Payment Successful! Unlimited idea generation unlocked.");
  localStorage.setItem("idea_uses", 0);
  document.getElementById("ideaResult").innerText = "";
};

// Dummy Idea Generator
function generateIdea() {
  const ideas = [
    "Start a dropshipping store",
    "Create an online course",
    "Build a fitness app",
    "Launch a niche subscription box",
    "Offer AI content writing service"
  ];
  return ideas[Math.floor(Math.random() * ideas.length)];
}
