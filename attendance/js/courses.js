let lecturerSelect = document.getElementById('lecturerSelect')
firebase.database().ref("userDetails").once("value", function(snapshot) {
    lecturerSelect.innerHTML = "<option>Select Lecturer</option>"
    snapshot.forEach(function(childSnapshot) {
        let data = childSnapshot.val()
        if(data.role == "Admin" && data.Status == "active"){
            let option = document.createElement("option")
            option.value = data.Email
            option.textContent = data.FirstName 
            lecturerSelect.appendChild(option)
        }
    })
})


//venue select
let venueSelect = document.getElementById('venueSelect')
firebase.database().ref("GpsVenus").once("value", function(snapshot) {
    venueSelect.innerHTML = "<option>Select Venue</option>"
    snapshot.forEach(function(childSnapshot) {
        let data = childSnapshot.val()
        if( data.Status == "active"){
            let option = document.createElement("option")
            option.value = data.VenueCode
            option.textContent = data.VenueName 
            venueSelect.appendChild(option)
        }
    })
})

///add new course to database

let btnaddcourse = document.getElementById("btnaddcourse");

  // event
  btnaddcourse.addEventListener("click", () => {

    // inputs
    let txtcoursename = document.getElementById("txtcoursename").value.trim();
    let txtcoursecode = document.getElementById("txtcoursecode").value.trim();
    let lecturerSelect = document.getElementById("lecturerSelect").value.trim();
    let venueSelect = document.getElementById("venueSelect").value.trim();
    let statusSelect = document.getElementById("statusSelect").value.trim();

    // get create by 
      let user = firebase.auth().currentUser;
      let createdby = user.email;
      let timenow = Date.now(); 

    // validation
    if (txtcoursename == "") {
      alert("Enter course name");
      return;
    }
    // check if venue code is empty the return code stops here
    if (txtcoursecode == "") {
      alert("Enter course code");
      return;
    }
    // check if longitude is empty the return code stops here
    if (lecturerSelect == "Select Lecturer") {
      alert("Select Lecturer");
      return;
    }
    // check if latitude is empty the return code stops here
    if (venueSelect == "Select Venue") {
      alert("Select Venue");
      return;
    }

    // firebase insert
    firebase.database().ref("Courses/" + txtcoursecode).set({
      CourseName: txtcoursename,
      CourseCode: txtcoursecode,
      Lecturer: lecturerSelect,
      Venue: venueSelect,
      Status: statusSelect,
      CreatedAt: timenow,
      CreatedBy: createdby
    })

    .then(() => {
      alert("Course added successfully");

      // clear inputs
      document.getElementById("txtvenuename").value = "";
      document.getElementById("txtvenuecode").value = "";
      document.getElementById("txtlongitude").value = "";
      document.getElementById("txtlatitude").value = "";
      loaddata();
      document.getElementById("txtvenuecode").disabled = false;
      document.getElementById("btnaddcourse").innerText = "Add new GPS";
    })

    .catch((error) => {
      alert(error.message);
    });
  });