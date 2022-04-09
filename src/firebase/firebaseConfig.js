import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCzNMAS8ddzWp2sAkpTV-12XCsQq6hQRq8",
  authDomain: "fir-actions-11c16.firebaseapp.com",
  projectId: "fir-actions-11c16",
  storageBucket: "fir-actions-11c16.appspot.com",
  messagingSenderId: "774731397351",
  appId: "1:774731397351:web:80772688b9b0a714724a42"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
    auth,
    db,
    storage
}