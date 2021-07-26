// FireBase Configiguration
var firebaseConfig = {
  apiKey: "AIzaSyB1aijLAZ3hQEgq4ms_mHopfw-Zftq02OQ",
  authDomain: "noted-app-9ad9c.firebaseapp.com",
  databaseURL: "https://noted-app-9ad9c-default-rtdb.firebaseio.com",
  projectId: "noted-app-9ad9c",
  storageBucket: "noted-app-9ad9c.appspot.com",
  messagingSenderId: "822988090244",
  appId: "1:822988090244:web:a573f0b03ed783231b8bd1",
  measurementId: "G-GZ0CNVS26W"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
