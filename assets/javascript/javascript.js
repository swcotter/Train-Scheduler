$(document).ready(function () {

// Your web app's Firebase configuration
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

$('#add-train').on("click", function(event) {

    event.preventDefault();
    var trainName = $("#trainName-input").val();
    console.log(trainName);
    database.ref().set({
        "trainName": trainName,
        "destination": destination,
        "firstTime": firstTime,
            "frequency": frequency,
            "tMinutesTillTrain": tMinutesTillTrain,
            "nextTrainTime": nextTrainTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        
    });

});


database.ref("/").on("value", function(snap) {
    console.log(snap.val());
});


    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTime = 0;
    var frequency = 0;
    var nextArrival = 0;
    var minutesAway = 0;
    var firstTimeConverted = 0;
    var currentTime = 0;
    var diffTime = 0;
    var tRemainder = 0;
    var tMinutesTillTrain = 0;
    var nextTrain = 0;

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        $("#validationError").empty();

        trainName = $("#trainName-input").val();
        destination = $("#destination-input").val();
        firstTime = $("#trainTime-input").val();
        frequency = $("#frequency-input").val();

        // convert time
        firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // Current Time
        currentTime = moment();
        // Difference between the times
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
        tRemainder = diffTime % frequency;
        // Minute Until Train
        tMinutesTillTrain = frequency - tRemainder;
        // Next Train
        nextTrain = moment().add(tMinutesTillTrain, "minutes");
        //next Train proper format
        nextTrainTime = moment(nextTrain).format("hh:mm");

        if (trainName == "" | destination == "" | firstTime == "" | frequency == "") {
            $("#validationError").text("Train form filled out incorrectly! Please try again.");
        } else if (isNaN(firstTime) || firstTime > 2400 ) {
            $("#validationError").text("Please use military time!");
        } else {
            sendToFirebase();
            pullFromFirebase();
        };








    });
    //SENDS FORM INFO TO DATABASE
    function sendToFirebase() {
        dataRef.ref().push({

            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain,
            nextTrainTime: nextTrainTime,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    };

    function pullFromFirebase() {

        $("tbody").empty();
        dataRef.ref().on("child_added", function (childSnapshot) {
            var tBody = $("tbody");
            var tRow = $("<tr>");
            trainName = childSnapshot.val().trainName;
            destination = childSnapshot.val().destination;
            frequency = childSnapshot.val().frequency;
            nextArrival = childSnapshot.val().nextTrainTime;
            minutesAway = childSnapshot.val().tMinutesTillTrain;
            // Append the newly created table data to the table row
            tRow.append("<td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>");
            // Append the table row to the table body
            tBody.append(tRow);

            // Handle the errors
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });


    };

    //Initial Function Call
    pullFromFirebase();

});