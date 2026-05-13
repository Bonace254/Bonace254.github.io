let btnCreate = document.getElementById('btnCreate')

btnCreate.addEventListener('click', () => {
   
let txtfname = document.getElementById('txtfname').value
let txtlname = document.getElementById('txtlname').value
let txtemail = document.getElementById('txtemail').value
let txtpass = document.getElementById('txtpass').value
let txtconpass = document.getElementById('txtconpass').value

if(txtfname == "" || txtemail == "" || txtpass == "" ){
    alert("Name, Email and Password must be filled")
}else{
    if(txtconpass == txtpass) {
        let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
        let role = "Admin"
        let status = "inactive"
        let timenow = Date.now();
        firebase.auth().createUserWithEmailAndPassword(txtemail, txtpass)
        .then((userCredential) =>{
            firebase.database().ref('userDetails/' + emailid).set({
                FirstName: txtfname,
                LastName: txtlname,
                Email: txtemail,
                Status: status,
                CreatedBy: txtemail,
                role: role,
                CreatedOn: timenow
            })
            alert("Account Created!")
        }) 
        .catch((error) => {
            console.log(error)
            alert(error.message)
        })
    }else{
        alert("Password do not match")
    }
}

})
