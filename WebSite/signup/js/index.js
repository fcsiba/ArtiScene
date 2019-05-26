//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $name = $("#name");
var $email = $("#Email");
var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//Hide hints
 $("form span").hide();

function isPasswordValid() {
  return $password.val().length > 4;
}

function arePasswordsMatching() {
  return $password.val() === $confirmPassword.val();
}

function isEmailValid() {
  return $email.val().length > 4;
}

function canSubmit() {
  return isPasswordValid() && arePasswordsMatching() && isEmailValid();
}

function passwordEvent() {
  //Find out if password is valid  
  if (isPasswordValid()) {
    //Hide hint if valid
    $password.next().hide();
  } else {
    //else show hint
    $password.next().show();
  }
}

function confirmPasswordEvent() {
  //Find out if password and confirmation match
  if (arePasswordsMatching()) {
    //Hide hint if match
    $confirmPassword.next().hide();
  } else {
    //else show hint 
    $confirmPassword.next().hide();
  }
}

function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}

function submitButtonAction() {

  alert('dsfasugdasjkdva');
  // $("form span").show();
  // Request (GET http://127.0.0.1:3000/signIn)

  var userType = 1;
    var selectedItem = $('#userType').find(":selected").text();
    if (selectedItem === 'Client'){
        userType = 2;
    }
alert('sadhflksa ' + userType + " " + selectedItem);

  const fname="a";
  const lname="s";
  const username="s";
  const name = $name.val().split(" ");
  if (name > 1){
    fname = $name.val().split(" ")[0];
    lname = $name.val().split(" ")[1];
    username = ($name.val().split(" ")[0]+$name.val().split(" ")[1]).toLowerCase();
  }else{
    fname = $name.val().split(" ")[0];
    lname = "";
    username = ($name.val().split(" ")[0]).toLowerCase()
  }

  jQuery.ajax({
    url: "http://127.0.0.1:3000/users/signup",
    type: "POST",
    dataType: "json",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    contentType: "application/json",
    data: JSON.stringify({
      "password": $password.val(),
      "email": $email.val(),
      "first_name": fname,
      "last_name": lname,
      "username" : username,
      "user_type" : userType
    })
  })
  
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      alert("Successfully signed up " + data.first_name + " " + data.last_name);

      if (userType === 1){
        window.location.replace("../profileinfo/index.html?id="+data.user.id + "&type=" + userType);
      }else{
        window.location.replace("../profilebootstrap/indexx.html?id="+data.user.id);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      alert("Either email or password is incorrect " + errorThrown);
    })
    .always(function () {
      /* ... */
    });
}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();