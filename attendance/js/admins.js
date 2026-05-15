let btnaddadmin = document.getElementById('btnaddadmin')

btnaddadmin.addEventListener('click', () =>{
 let txtfname = document.getElementById("txtfname").value
 let txtlname = document.getElementById("txtlname").value
 let txtemail = document.getElementById("txtemail").value


  if(txtfname == "" || txtemail == ""){
  	alert("Name and email be filled")
  }else{
  	
  		let emailid = txtemail.replace(/\./g, "_dot_").replace(/@/g, "_at_")
  		let status = document.querySelector("select").value;
  		let timenow = Date.now(); 
  		let role = "Admin"
        let autopassword = "12345678"
        let user = firebase.auth().currentUser;
        let createdby = user.email
  		firebase.auth().createUserWithEmailAndPassword(txtemail,autopassword)
  		.then((userCredential) =>{
  			firebase.database().ref('userDetails/' + emailid).set({
  				FirstName:txtfname,
  				LastName:txtlname,
  				Email: txtemail,
  				Status: status,
  				CreatedBy: createdby,
  				role: role,
  				CreatedOn: timenow
  			})
  			alert("New admin added password is 12345678 and username is email ")
  		})
  		.catch((error) => {
  			console.log(error)
  			alert(error.message)
  		})
  	
  }

}) 


function loaddata(){
    let tablebody = document.getElementById('tablebody')

    firebase.database().ref("userDetails").on("value",(snapshot) =>{
        tablebody.innerHTML = "" 

        snapshot.forEach((childSnapshot) =>{
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.Status == "active" && data.role == "Admin"){
                tablebody.innerHTML += `
                    <tr>
                     <td>${data.Email}</td>
                     <td>${data.FirstName}</td>
                     <td>${data.LastName}</td>
                     <td>
                      <button class="btn btnred" onclick="suspendadmin('${key}')" > Suspend</button>
                      </td>
                    </tr>
                `
            }
        })

    })
}

loaddata();


function suspendadmin(adminid){
    let confirmSuspend = confirm("Are you sure you want to suspend this admin ?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + adminid).update({
        Status:"inactive"
    })
    .then(() =>{
        alert("Admin suspended successfully")
    })
    .then((error) =>{
        alert("Error while suspending" + error.message)
    })

}




// activation 


function loaddatainactive(){
    let tablebody = document.getElementById('tablebodyinactive')

    firebase.database().ref("userDetails").on("value",(snapshot) =>{
        tablebody.innerHTML = "" 

        snapshot.forEach((childSnapshot) =>{
            let data = childSnapshot.val()
            let key = childSnapshot.key

            if(data.Status == "inactive" && data.role == "Admin"){
                tablebody.innerHTML += `
                    <tr>
                     <td>${data.Email}</td>
                     <td>${data.FirstName}</td>
                     <td>${data.LastName}</td>
                     <td>
                      <button class="btn btngreen" onclick="activateadmin('${key}')" > Activate</button>
                      </td>
                    </tr>
                `
            }
        })

    })
}

loaddatainactive();


function activateadmin(adminid){
    let confirmSuspend = confirm("Are you sure you want to activate this admin ?")
    if(!confirmSuspend) return;
    firebase.database().ref("userDetails/" + adminid).update({
        Status:"active"
    })
    .then(() =>{
        alert("Admin activated Successfully")
    })
    .then((error) =>{
        alert("Error while activating" + error.message)
    })

}


let lbActiveAdmins = document.getElementById('lbActiveAdmins')
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.role == "Admin" && data.Status == "active"){
            total = total + 1
        }
    })
    lbActiveAdmins.innerHTML = total
})

let lbInactiveAdmins = document.getElementById('lbInactiveAdmins')
firebase.database().ref("userDetails").once("value", function(snapshot){
    let total = 0
    snapshot.forEach(function(childSnapshot){
        let data = childSnapshot.val()
       if (data.role == "Admin" && data.Status == "inactive"){
            total = total + 1
        }
    })
    lbInactiveAdmins.innerHTML = total
})