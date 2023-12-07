
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
      }
      else{
        swal("Failed", "Message not sent, Press 'OK' ", "error");
      }
    }  
    );
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
