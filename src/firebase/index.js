import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBi2liJldDpJzfqAsv6MCj4s5OA7g_C9Wc",
    authDomain: "kbc-tut.firebaseapp.com",
    projectId: "kbc-tut",
    storageBucket: "kbc-tut.appspot.com",
    messagingSenderId: "200283391832",
    appId: "1:200283391832:web:fb1fd0effdde5307b4872d",
    measurementId: "G-YF8ERHT21S"
  };

const firebaseSApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
 const db = firebaseSApp.firestore();
 const googleProvider = new firebase.auth.GoogleAuthProvider();
 const facebookProvider = new firebase.auth.FacebookAuthProvider();
 const TwitterProvider = new firebase.auth.TwitterAuthProvider();
 const GithubProvider = new firebase.auth.GithubAuthProvider();
 const storage = firebase.storage();
export default {auth, db, storage};
export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
export  {auth};
export  {storage};