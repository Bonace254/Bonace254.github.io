let btnCreate = document.getElementById('btnCreate')

btnCreate.addEventListener('click', () => {
let txtfname = document.getElementById('txtfname').value
let txtlname = document.getElementById('txtlname').value
let txtemail = document.getElementById('txtemail').value
let txtpass = document.getElementById('txtpass').value
let txtconpass = document.getElementById('txtconpass').value

if(txtfname == "" || txtemail == ""){
    alert("Name and Email must be filled")
}else{
    if(txtconpass == txtpass){
        let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
        let status = "active"
        let timenow = Date.now();
        firebase.auth().createUserWithEmailAndPassword(txtemail, txtpass)
        .then((userCredential) =>{
            firebase.databaseURL().ref('userDetails/' + emailid).set({
                FirstNmae: txtfname,
                LastName: txtlname,
                Email: txtemail,
                Status: status,
                CreatedBy: txtemail,
                CreatedOn: timenow
            })
            alert("Account Created!")
        }) 
        .catch((error) => {
            console.log(error)
            alert("Error creating account")
        })
    }else{
        alert("Password do not match")
    }
}
})
