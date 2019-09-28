import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBAHgxv0xTm9njn2qI4UVadNPNHaL2nyXs",
    authDomain: "lombok-bersih.firebaseapp.com",
    databaseURL: "https://lombok-bersih.firebaseio.com",
    projectId: "lombok-bersih",
    storageBucket: "lombok-bersih.appspot.com",
    messagingSenderId: "675176896011",
    appId: "1:675176896011:web:1372c15a160fc418"
  };

  firebase.initializeApp(firebaseConfig)
  export default firebase.firestore()