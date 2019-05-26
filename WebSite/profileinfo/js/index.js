var $fb = $('#fb')
var $git = $('#git')
var $link = $('#link')
var $about = $('#about')
var $address = $('#address')


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

    if (getUrlParameter('type') === "0"){
        alert('Access Denied');
        return;
    }

    jQuery.ajax({
        url: "http://127.0.0.1:3000/artists",
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        contentType: "application/json",
        data: JSON.stringify({
            "linkedin": $link.val(),
            "facebook": $fb.val(),
            "user_id": getUrlParameter('id'),
            "github": $git.val(),
            "about": $about.val(),
            "address": $address.val()
        })
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);
        alert('Successfully saved');
        
        window.location.replace("../profilebootstrap/indexx.html?id="+getUrlParameter('id') + "&type=" + getUrlParameter('type'));

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
    })
    .always(function() {
        /* ... */
    });
    

  }