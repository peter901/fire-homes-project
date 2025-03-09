// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBHkaglbxWYlp9du803smyIMdw8GqDAAk",
  authDomain: "fire-homes-project-eeac6.firebaseapp.com",
  projectId: "fire-homes-project-eeac6",
  storageBucket: "fire-homes-project-eeac6.firebasestorage.app",
  messagingSenderId: "434259819209",
  appId: "1:434259819209:web:e0adda089ee2834254eb18",
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };
