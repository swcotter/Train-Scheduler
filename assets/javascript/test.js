var firebaseConfig = {
    apiKey: "AIzaSyDlcpPzziehgb5YYAfs0X_CZb1I6jDoomk",
    authDomain: "train-scheduler-8a331.firebaseapp.com",
    databaseURL: "https://train-scheduler-8a331.firebaseio.com",
    projectId: "train-scheduler-8a331",
    storageBucket: "train-scheduler-8a331.appspot.com",
    messagingSenderId: "644346857177",
    appId: "1:644346857177:web:e2d60710a666e770"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Get a reference to the database service
  var database = firebase.database();
  database.ref().set({
    "username": "Human"
    
  });

  database.ref("/").on(“value”, function(snapshot) {
    console.log(snapshot.val())
       }, function(errorObject) {
        
       });