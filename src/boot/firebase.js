import { boot } from 'quasar/wrappers'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyDucfEwT7dD8JyTxnPr8PYV36Beu2if5xw",
  authDomain: "firechat--quasar-f237d.firebaseapp.com",
  projectId: "firechat--quasar-f237d",
  storageBucket: "firechat--quasar-f237d.appspot.com",
  messagingSenderId: "534790250586",
  appId: "1:534790250586:web:7e044d3a24fee9699ff863"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db =firebase.firestore()
const auth = firebase.auth()
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcaTiempo};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
})
