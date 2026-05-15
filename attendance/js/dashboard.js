let lbTotalUsers = document.getElementById('lbTotalUsers')
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        total = total + 1
    })
    lbTotalUsers.innerHTML = total
})

let lbTotalCourses = document.getElementById('lbTotalCourses')
firebase.database().ref("Courses").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
        total = total + 1
    })
    lbTotalCourses.innerHTML = total
})

let lbTotalLecturers = document.getElementById('lbTotalLecturers')
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.role == "Admin"){
            total = total + 1
        }
    })
    lbTotalLecturers.innerHTML = total
})

let lbTotalApprovals = document.getElementById('lbTotalApprovals')
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.Status == "inactive"){
            total = total + 1
        }
    })
    lbTotalApprovals.innerHTML = total
})