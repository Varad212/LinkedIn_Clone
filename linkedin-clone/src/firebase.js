import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {                          //Firebase config of linkedin-clone app
  apiKey: "AIzaSyCYE5dJMDsoiaRtXYQs8P3iLaQvjnU5vo8",
  authDomain: "linkedin-clone-87ba2.firebaseapp.com",
  projectId: "linkedin-clone-87ba2",
  storageBucket: "linkedin-clone-87ba2.appspot.com",
  messagingSenderId: "814595962139",
  appId: "1:814595962139:web:4f6b4bfe4b579ad4b6cfbe"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);     //all firebase required functions
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage= firebase.storage();

  export {auth,provider,storage};
  export default db;