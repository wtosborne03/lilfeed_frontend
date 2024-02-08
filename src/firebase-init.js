import * as Firebase from "firebase/app";

const firebaseConfig = {

    apiKey: "AIzaSyCUBlLtkaA6R15PDDSSx9yq6RJn1ErDffI",

    authDomain: "lil-feed.firebaseapp.com",

    projectId: "lil-feed",

    storageBucket: "lil-feed.appspot.com",

    messagingSenderId: "444562427288",

    appId: "1:444562427288:web:5b6a2afa6cb314c0fdafed",

    measurementId: "G-MT9CTSTERH"

};
Firebase.initializeApp(firebaseConfig);

export default Firebase;
