let btnlogin = document.getElementById("btnlogin")
btnlogin.addEventListener('click', () => {
    let txtusername = document.getElementById("txtusername").value
    let txtpass = document.getElementById("txtpass").value
    btnlogin.innerHTML = "Logging in..."
    if(txtusername == "" || txtpass == ""){
        alert("Username and Password must be filled")
    }else{
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(txtusername, txtpass)
        })
        .then((userCredential) => {
             let emailid = txtusername.replace(/\./g, "_dot_").replace(/@/g, "_at_")
             return firebase.database().ref('userDetails/' + emailid).once('value')
        })
        .then((snapshot) => {
            const userDetails = snapshot.val()
            const role = userDetails.role
            const status = userDetails.Status
            if(status == "active"){
                if(role == "Admin"){
                    //admin dashboard
                    window.location.href = "dashboard.html"
                }else if(role == "Student"){
                    //student dashboard
                    alert("Student logged in!")
                }else{
                    //active users with no roles
                    alert("No role added yet, contact admin!")
                }
            }else{
                //inactive accounts
                alert("Account not active, contact admin!")
            }
        })
        .catch((error) =>{
            alert("Wrong Credentials")
            btnlogin.innerHTML = "Log in"
        })
    }
})