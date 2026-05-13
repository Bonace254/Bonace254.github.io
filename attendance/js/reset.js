let btnreset = document.getElementById("btnreset")
btnreset.addEventListener('click', () => {
    let txtemail = document.getElementById("txtemail").value
    auth.sendPasswordResetEmail(txtemail)
    .then(() =>{
        alert("A reset link has been sent (if your email exist in our database)")
        txtemail.value =""
    })
    .catch((error) =>{
        alert(error.message)
        console.log(error)
        txtemail.value =""
    })
})