import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMD8r1OKyxnrruWxads3Xy09lUdTn2x2k",
  authDomain: "celltowermapaus.firebaseapp.com",
  databaseURL: "https://celltowermapaus-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "celltowermapaus",
  storageBucket: "celltowermapaus.appspot.com",
  messagingSenderId: "252709704697",
  appId: "1:252709704697:web:6eb9de82bc6445d8cce328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the database to use in other files
export { database };
