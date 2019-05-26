var $title = $("#title");
var $duration = $("#duration");
var $amount = $("#amount");
var $skill = $("#skill");
var $description = $("#description");
var $comment = $("#field12");



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

$(document).ready(function () {

    // Request (6) (GET http://127.0.0.1:3000/jobs/7)

jQuery.ajax({
    url: "http://127.0.0.1:3000/jobs/" + getUrlParameter('job_id'),
    type: "GET",
    dataType: "json",
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);

    $title.text(data.title);
    $duration.text("Duration - " + data.duration );
    $amount.text("Price - $" + data.amount);
    $skill.text("Skill - " + data.skill);
    $description.text(data.description);

})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
    alert("Something went wrong " + errorThrown);
})
.always(function() {
    /* ... */

});





});

function submitButtonAction() {

    if (getUrlParameter('type') === "0"){
        alert('Access Denied');
        return;
    }

    // alert($comment.val());
    var d = new Date();
    jQuery.ajax({
        url: "http://127.0.0.1:3000/proposals",
        type: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        contentType: "application/json",
        data: JSON.stringify({
            "created_date": d.getDate,
            "comment": $comment.val(),
            "artist_id": parseInt(getUrlParameter('id')),
            "job_id": parseInt(getUrlParameter('job_id')),
        })
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);
        alert('Successfully Submitted')
        window.location.replace("../profilebootstrap/indexx.html?id="+getUrlParameter('id'));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
        alert('Something went wrong' + errorThrown)
    })
    .always(function() {
        /* ... */
    });
    

}