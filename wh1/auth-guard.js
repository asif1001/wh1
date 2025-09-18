// auth-guard.js
// Usage: import { requireAuth } from './auth-guard.js'; then call requireAuth({ adminOnly: true })
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function requireAuth({ adminOnly = false } = {}) {
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'auth-loading';
  loadingDiv.style = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#4F46E5;';
  loadingDiv.innerHTML = 'Checking authentication...';
  document.body.appendChild(loadingDiv);

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not logged in, redirect to login with redirect param
        const url = new URL(window.location.href);
        const redirect = encodeURIComponent(url.pathname + url.search);
        window.location.href = `index.html?redirect=${redirect}`;
        reject('Not logged in');
        return;
      }
      // Fetch user role from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : null;
        if (adminOnly && role !== 'admin') {
          window.location.href = 'dashboard.html?error=access-denied';
          reject('Access denied');
          return;
        }
        document.body.removeChild(loadingDiv);
        resolve({ user, role });
      } catch (err) {
        document.body.removeChild(loadingDiv);
        alert('Failed to check authentication.');
        reject(err);
      }
    });
  });
}
