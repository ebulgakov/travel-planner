import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDKXE2SuNfvQBcKSiwdMWoW98PnsxGGmwU',
  authDomain: 'travel-planner-49309.firebaseapp.com',
  databaseURL: 'https://travel-planner-49309.firebaseio.com',
  projectId: 'travel-planner-49309',
  storageBucket: 'travel-planner-49309.appspot.com',
  messagingSenderId: '440891735435',
  appId: '1:440891735435:web:b1c114f0104f1f3642c38e',
});

export const firebaseAuth = firebase.auth()
