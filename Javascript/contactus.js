const sendEmail=()=>{
  let Name = document.getElementById("full_name").value
  let email = document.getElementById("email").value
  let Phone = document.getElementById("phone_number").value
  let City = document.getElementById("city").value
  let State = document.getElementById("state").value
  let Message = document.getElementById("message_query").value

  console.log("function called")
  Email.send({
      Host : "smtp.elasticemail.com",
      Username : "suraj@kaddujoke.com",
      Password : "42DA8ED3D078C48B11C070AC74A80561E57A",
      To : "suraj@kaddujoke.com" ,
      From : "suraj@kaddujoke.com" ,          
      Subject : `New Query Alert || ${Name} `,
      Body : `Hi Suraj,<br>You received a Query from ${Name}. <br><br>
      <b>Name:</b> ${Name} <br>
      <b>Email:</b> ${email} <br>
     <b>Phone:</b> ${Phone} <br>
      <b>City:</b> ${City} <br>
      <b>State:</b> ${State} <br><br>
      <b>Message:</b> ${Message}
      `
      }).then(
   // message => alert(message)
   message => {
    if(message == 'OK'){
      swal("Success", "Message sent successfully, Press 'OK' ", "success");

       // Reset all input fields after successful submission
       document.getElementById('full_name').value = '';
       document.getElementById('email').value = '';
       document.getElementById('phone_number').value = '';
       document.getElementById('city').value = '';
       document.getElementById('state').value = '';
       document.getElementById('message_query').value = '';
    }
    else{
      swal("Failed", "Message not sent, Press 'OK' ", "error");
    }
  });
}

function validateForm() {
//Reset error messages
document.getElementById('error-full-name').innerHTML = '';
document.getElementById('error-email').innerHTML = '';
document.getElementById('error-phone').innerHTML = '';
document.getElementById('error-message-query').innerHTML = '';

let fullNameInput = document.getElementById('full_name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone_number');
let messageInput = document.getElementById('message_query');

if (!fullNameInput.checkValidity()) {
    document.getElementById('error-full-name').innerHTML = 'Name should contain at least Two characters.';
    return false;  
  }
if (!emailInput.checkValidity()) {
    document.getElementById('error-email').innerHTML = 'Please enter a valid email address.';
    return false;
}
if (!phoneInput.checkValidity()) {
    document.getElementById('error-phone').innerHTML = 'Please enter a valid 10-digit phone number.';
    return false;
}
if (!messageInput.checkValidity()) {
    document.getElementById('error-message-query').innerHTML = 'Message should contain at least 20 characters.';
    return false;
}
return true;
}

function submitForm() {
if (validateForm()) {
    sendEmail();
}
}
