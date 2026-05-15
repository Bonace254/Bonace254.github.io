
 let totalAdmins = 0
 let totalStudents = 0
firebase.database().ref("userDetails").once("value", function(snapshot){
   
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.role == "Admin"){
            totalAdmins = totalAdmins + 1
            
        }else{
            totalStudents = totalStudents + 1
            
        }
    })
    //display total count of students and admins in the chart
     drawbargraph()
})

function drawbargraph(){
    const canvasforbargraph = document.getElementById('mybargraph')
    new Chart(canvasforbargraph, {
        type: 'bar',
        data: {
            labels: ['Admins', 'Students'],
            datasets: [{
                label: 'System Users',
                data: [totalAdmins, totalStudents],
                borderWidth: 1,
                backgroundColor: ['blue', 'green']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

//course pie
let totalActiveCourses = 0
let totalInactiveCourses = 0
firebase.database().ref("Courses").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.Status == "active"){
            totalActiveCourses = totalActiveCourses + 1
        }else{
            totalInactiveCourses = totalInactiveCourses + 1
        }
    })
  //show data in pie chart 
  coursespie()
})

function coursespie(){
    const canvasforcourses = document.getElementById('mypiecourses')
    new Chart(canvasforcourses, {
        type: 'pie',
        data: {
            labels: ['Active Courses', 'Inactive Courses'],
            datasets: [{
                label: 'Course Status',
                data: [totalActiveCourses, totalInactiveCourses],
                backgroundColor: ['green', 'red']
            }] 
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}


//lecturers histogram
let totalActiveLecturers = 0
let totalInactiveLecturers = 0
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.role == "Admin"  && data.Status == "active"){
           totalActiveLecturers = totalActiveLecturers + 1
        }else if (data.role == "Admin"  && data.Status == "inactive"){
            totalInactiveLecturers = totalInactiveLecturers + 1
        }
    })
    //shows data in histogram
    lecturerbargraph()
})
function lecturerbargraph(){
    const canvasforlecturers = document.getElementById('mydonutgraph')
    new Chart(canvasforlecturers, {
        type: 'doughnut',
        data: {
            labels: ['Active Lecturers', 'Inactive Lecturers'],
            datasets: [{
                label: 'Lecturer Status',
                data: [totalActiveLecturers, totalInactiveLecturers],
                backgroundColor: ['blue', 'red']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}


//pending approvals bar graph
let totalActiveVenus = 0
let totalPendingVenus = 0
firebase.database().ref("GpsVenus").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.Status == "active"){
            totalActiveVenus = totalActiveVenus + 1
        }else{
            totalPendingVenus = totalPendingVenus + 1
        }
    })
  //show data in pie chart 
  gpsvenue()
})

function gpsvenue(){
    const canvasforcourses = document.getElementById('mybargraphapproval')
    new Chart(canvasforcourses, {
        type: 'bar',
        data: {
            labels: ['Active Venues', 'Pending Venues'],
            datasets: [{
                label: 'Venue Status',
                data: [totalActiveVenus, totalPendingVenus],
                backgroundColor: ['green', 'red']
            }] 
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}

function printReport(){
    window.print()
}