import firebase from 'firebase/app';
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyASHaLbAGRo70v3a5O96srEzuYJVgE76iU",
  authDomain: "mymoney-e17b2.firebaseapp.com",
  projectId: "mymoney-e17b2",
  storageBucket: "mymoney-e17b2.appspot.com",
  messagingSenderId: "1062114124251",
  appId: "1:1062114124251:web:f8f27b03c420be01ec87fe"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()

export {projectFirestore}