import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB76BlZtGeDjy8ojrc6EWSswS6TqjWUNQg",
	authDomain: "lombok-bersih-2982f.firebaseapp.com",
	databaseURL: "https://lombok-bersih-2982f.firebaseio.com",
	projectId: "lombok-bersih-2982f",
	storageBucket: "lombok-bersih-2982f.appspot.com",
	messagingSenderId: "247713493276",
	appId: "1:247713493276:web:13ae805469054eae1b0ad9",
	measurementId: "G-6ZCE5V1Y4E"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
