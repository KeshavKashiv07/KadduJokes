
const sendEmail=()=>{
    let Name = document.getElementById("full_name").value
    let email = document.getElementById("email").value
    let Phone = document.getElementById("phone_number").value
    let City = document.getElementById("city").value
    let State = document.getElementById("state").value
    let Message = document.getElementById("message_query").value

    if(Name=="" || email=="" ||Phone=="" || Message==""){
      swal("All fields are mandatory", "Please fill in all the required fields.", "info");
    }
    else{
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
    });
  }
}