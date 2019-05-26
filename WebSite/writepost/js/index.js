var $title = $("#title");
var $duration = $("#duration");
var $amount = $("#amount");
var $skill = $("#skill");
var $description = $("#description");

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function submitButtonAction() {

  if (getUrlParameter('type') === "1"){
    alert('Access Denied');
    return;
}
    
  
// alert('My name is Khan' + getUrlParameter('id'));

    // jQuery.ajax({
    //   url: "http://127.0.0.1:3000/jobs",
    //   type: "POST",
    //   dataType: "json",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   },
    //   contentType: "application/json",
    //   data: JSON.stringify({
    //     "title": $title.val(),
    //     "duration": $duration.val(),
    //     "amount": parseInt($amount.val()),
    //     "skill_id": 1,
    //     "description" : description.val(),
    //     "client_id" : parseInt(getUrlParameter('id')),
    //   })
    // })
    
    //   .done(function (data, textStatus, jqXHR) {
    //     console.log("HTTP Request Succeeded: " + jqXHR.status);
    //     console.log(data);
    //     alert("Job Successfully Added " + data.title);
    //     window.location.replace("../profilebootstrap/indexx.html?id=");
    //   })
    //   .fail(function (jqXHR, textStatus, errorThrown) {
    //     console.log("HTTP Request Failed");
    //     alert("" + errorThrown);
    //   })
    //   .always(function () {
    //     /* ... */
    //     alert("Either email or password is incorrect " + errorThrown);
    //   });

      jQuery.ajax({
        url: "http://127.0.0.1:3000/jobs",
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        contentType: "application/json",
        data: JSON.stringify({
            "amount": parseInt($amount.val()),
            "client_id": parseInt(getUrlParameter('id')),
            "title": $title.val(),
            "skill_id": 1,
            "description": description.val(),
            "duration": $duration.val()
        })
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);
        window.location.replace("../profilebootstrap/indexx.html?id=" + getUrlParameter('id'));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
    })
    .always(function() {
        /* ... */
    });
  }