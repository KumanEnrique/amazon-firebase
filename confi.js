// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdgI0YRS7XeF5wlxnBC5LDubGnvqFe4G4",
    authDomain: "inventario-29f5c.firebaseapp.com",
    databaseURL: "https://inventario-29f5c.firebaseio.com",
    projectId: "inventario-29f5c",
    storageBucket: "inventario-29f5c.appspot.com",
    messagingSenderId: "261139110928",
    appId: "1:261139110928:web:0a64e6db804f3809003e95",
    measurementId: "G-7JEH6SWHMY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth()
export const db = firebase.firestore();