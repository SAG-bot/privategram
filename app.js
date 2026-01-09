// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Auth
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Storage (kept but not required yet)
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

/* =========================
   🔥 FIREBASE CONFIG
   ========================= */

const firebaseConfig = {
   apiKey: "AIzaSyD8_wAPvPzJ8r34FGrcdYae26EhmKz-mtY",
  authDomain: "privategram-706f4.firebaseapp.com",
  projectId: "privategram-706f4",
  storageBucket: "privategram-706f4.firebasestorage.app",
  messagingSenderId: "321530348112",
  appId: "1:321530348112:web:dc95df6717752ba69b0755"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* =========================
   UI ELEMENTS
   ========================= */

const authSection = document.getElementById("auth");
const mainSection = document.getElementById("main");
const logoutBtn = document.getElementById("logoutBtn");
const feed = document.getElementById("feed");

/* =========================
   AUTH FUNCTIONS
   ========================= */

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
});


/* =========================
   AUTH STATE LISTENER
   ========================= */

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    mainSection.style.display = "block";
    logoutBtn.style.display = "block";
    loadFeed();
  } else {
    authSection.style.display = "block";
    mainSection.style.display = "none";
    logoutBtn.style.display = "none";
    feed.innerHTML = "";
  }
});

/* =========================
   UPLOAD (SAFE PLACEHOLDER)
   ========================= */

window.uploadVideo = function () {
  alert("Storage is temporarily disabled. UI is ready.");
};

/* =========================
   FEED LOADING
   ========================= */

function loadFeed() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    feed.innerHTML = "";

    snapshot.forEach((doc) => {
      const post = document.createElement("div");
      post.className = "post";

      const video = document.createElement("video");
      video.src = doc.data().videoUrl;
      video.controls = true;

      post.appendChild(video);
      feed.appendChild(post);
    });
  });
}
