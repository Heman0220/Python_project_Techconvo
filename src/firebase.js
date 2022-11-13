import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDI5yAki_KltqfKkJK831Mn7ktPoUf0Q3Y",
    authDomain: "skill-mat-att-tracker.firebaseapp.com",
    projectId: "skill-mat-att-tracker",
    storageBucket: "skill-mat-att-tracker.appspot.com",
    messagingSenderId: "9095133048",
    appId: "1:99685453549:web:e4655733cbd6b8b92146e4",
    measurementId: "G-JYLEMTRPW4"
});
// the firebaseApp which we initialized above, using that we can use it get firestore which will have all the data
// we are storing it in a variable called db and we are exporting it

const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
export {db,auth,storage};