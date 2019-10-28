//const database = require('./js/database');
// var firebaseConfig = {
//     apiKey: "AIzaSyDhjzcpdXxR8yJfcAs64yqnK_cMcnJekGw",
//     authDomain: "battery-group.firebaseapp.com",
//     databaseURL: "https://battery-group.firebaseio.com",
//     projectId: "battery-group",
//     storageBucket: "",
//     messagingSenderId: "505595897820",
//     appId: "1:505595897820:web:b4f4128965ace82c"
//   };
//   // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

var admin = require('firebase');
const con = require('electron').remote.getGlobal('console')
const batteryLevel = require('battery-level');
const isCharging = require('is-charging');
admin.initializeApp({
  serviceAccount: "<battery-group-firebase-adminsdk-zs8ds-c837396a87.json>",
  databaseURL: "https://battery-group.firebaseio.com/"
});


var db = admin.database();
var bat_ref = db.ref("/battery_data");
var battery_percent="abir1";
var battery_charge="abir2";


var gtech="GTECH";
var gt='GTECH'
var g1='battery';
var g2='battery_charge';
var g3='name';
var res1=gtech.concat(g1);
var res2=gtech.concat(g2);
var res3=gtech.concat(g3);
window.onload = function() {
//create_Db();
  // Populate the table
  populateTable();

  // Add the add button click event
  // document.getElementById('add').addEventListener('click', () => {
  //
  //   // Retrieve the input fields
  //   var firstname = document.getElementById('firstname');
  //   var lastname = document.getElementById('lastname');
  //
  //   // Save the person in the database
  //   //database.addPerson(firstname.value, lastname.value);
  //
  //   // Reset the input fields
  //   firstname.value = '';
  //   lastname.value = '';
  //
  //   // Repopulate the table
  //   populateTable();
  // });

  function doStuff() {
    // code to run
    // batteryLevel().then(level => {
    //   battery_percent=level;
    //   //=> 0.55
    //   bat_ref.update({
    //     "ABIR/battery":level*100
    //   });
    // }).catch(err => console.error(err));
    // isCharging().then(result => {
    //   battery_charge=result;
    //   bat_ref.update({
    //     "ABIR/battery_charge":result
    //   });
    //
    // }).catch(err => console.error(err));



    batteryLevel().then(level => {
      battery_percent=level;
      //=> 0.55
      bat_ref.child(gtech).update({
        "battery":level*100
      });
    }).catch(err => console.error(err));
    isCharging().then(result => {
      battery_charge=result;
      bat_ref.child(gtech).update({
        "battery_charge":result
      });
    }).catch(err => console.error(err));

    bat_ref.child(gtech).update({
      "name":gtech
    });

    // bat_ref.once("value", function(snapshot) {
    //   var data = snapshot.val();   //Data is in JSON format.
    //   //console.log(data);
    //   document.getElementById('p1').innerHTML = data.battery;
    // });
    // bat_ref.once("value")
    // .then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     // key will be "ada" the first time and "alan" the second time
    //     var key = childSnapshot.key;
    //     // childData will be the actual contents of the child
    //     var childData = childSnapshot.val();
    //     document.getElementById('p1').innerHTML =childSnapshot.child("battery").val();;
    //   });
    // });

//read_db();
  };
  function run() {
    setInterval(doStuff, 10000);
  };

  run();

  read_db();


  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('name');

    // Save the person in the database
    //database.addPerson(firstname.value, lastname.value);
    gtech=firstname.value;

    // Reset the input fields
    firstname.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

  con.log('This will be output to the main process console.')
  var battery_percent="abir1";
  var battery_charge="abir2";
  // Retrieve the persons
  //database.getPersons(function(persons) {

  // Generate the table body


  var tableBody = '';
  for (i = 0; i < 1; i++) {
    tableBody += '<tr>';
    tableBody += '  <td>' + "ABIR ONE"+ '</td>';
    batteryLevel().then(level => {
      battery_percent=level;
      tableBody += '  <td>' + level+ '</td>';
      //document.getElementById('p1').innerHTML = level*100;
    });
    isCharging().then(result => {
      battery_charge=result;
      tableBody += '  <td>' +result+ '</td>'
      //document.getElementById('p1').innerHTML = result;
    });
    tableBody += '</tr>';
  }

  // Fill the table content
  //document.getElementById('tablebody').innerHTML = tableBody;
}

// Deletes a person
// function deletePerson(id) {
//
//   // Delete the person from the database
//   database.deletePerson(id);
//
//   // Repopulate the table
//   populateTable();
// }

function create_Db(){
  bat_ref.child(gtech).set({
  battery: "June 23, 1912",
  battery_charge: "Alan Turing",
  name:"ABIR"
});
}

function read_db(){

// cell1.innerHTML = "NEW CELL1";
// cell2.innerHTML = "NEW CELL2";
// cell3.innerHTML ="ABIR 2";


// bat_ref.orderByChild("battery").once("value")
// .then(function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var table = document.getElementById("myTable");
//     var row = table.insertRow(0);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   var cell3 = row.insertCell(2);
//     // key will be "ada" the first time and "alan" the second time
//     var key = childSnapshot.key;
//     // childData will be the actual contents of the child
//     var childData = childSnapshot.val();
//     //document.getElementById('p1').innerHTML =childSnapshot.child("battery").val();;
//     cell1.innerHTML = childSnapshot.child("battery").val();;
//     cell2.innerHTML = childSnapshot.child("battery_charge").val();;
//     cell3.innerHTML =key;
//   });
// });

var table = document.getElementById("myTable");

bat_ref.orderByChild("battery").on("value",function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    //document.getElementById('p1').innerHTML =childSnapshot.child("battery").val();;
    cell1.innerHTML = childSnapshot.child("battery").val();;
    cell2.innerHTML = childSnapshot.child("battery_charge").val();;
    cell3.innerHTML =key;
  });
});

bat_ref.orderByChild("battery").on("child_changed",function(snapshot) {
  //var count = 0;
  // if (table.rows.length > 0) {
  //   document.getElementById('p1').innerHTML = table.rows.length;
  //   var c=0;
  //   for (var i = 0; i < table.rows.length; i++) {
  //     table.deleteRow(c);
  //     c++;
  //   }
  // }
  table.innerHTML = "";
  snapshot.forEach(function(childSnapshot) {
    var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
    // key will be "ada" the first time and "alan" the second time
    var key = childSnapshot.key;
    // childData will be the actual contents of the child
    var childData = childSnapshot.val();
    //document.getElementById('p1').innerHTML =childSnapshot.child("battery").val();;
    cell1.innerHTML = childSnapshot.child("battery").val();;
    cell2.innerHTML = childSnapshot.child("battery_charge").val();;
    cell3.innerHTML =key;
    //count++;

    // if (cell1.innerHTML == "100") {
    //     row.cell1.style.backgroundColor = "#c1c1c1";
    // }else {
    //   row.cell2.style.backgroundColor = "#c1c1c1";
    // }
    // if (cell1.innerHTML == "20") {
    //     rowstyle.backgroundColor = "red";
    // }
  });
});
}
