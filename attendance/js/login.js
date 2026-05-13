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
        })
    }
})