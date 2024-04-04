import firebase from "firebase";
import 'firebase/auth' 
import 'firebase/firebase'
import 'firebase/storage'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBV0fbs4ssxaCyodmzzquPCv_5XUXytn_Y",
    authDomain: "olxproject-3d6fa.firebaseapp.com",
    projectId: "olxproject-3d6fa",
    storageBucket: "olxproject-3d6fa.appspot.com",
    messagingSenderId: "582039890149",
    appId: "1:582039890149:web:7b185754a90e2039724c0c",
    measurementId: "G-WE177CMZG2"
  };


export default firebase.initializeApp(firebaseConfig)