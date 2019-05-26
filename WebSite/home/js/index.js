

var $list = $("#list");
var $profile = $('#profile');
var $createjob = $('#createjob');

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
    // alert('sadjkasdgbas');
    // $list.push(<h1>Umer</h1>);


    $profile.attr('href', "../profilebootstrap/indexx.html?id=" + getUrlParameter('id') )
    $createjob.attr('href', "../writepost/writepost.html?id=" + getUrlParameter('id') + "&type=" + getUrlParameter('type'))

    if (getUrlParameter('type') === "1"){
        $createjob.hide();
    }

    jQuery.ajax({
        url: "http://127.0.0.1:3000/jobs",
        type: "GET",
        dataType: "json",
    })
    .done(function(data, textStatus, jqXHR) {
        console.log("HTTP Request Succeeded: " + jqXHR.status);
        console.log(data);

        data.forEach(element => {

            var some = "<li class="+ "nav-item" + ">" +
            "<a class=" + "nav-link" + " href=" + "../applyjob/index.html?id=" + getUrlParameter('id') + "&job_id=" + element.id + "&type=" + getUrlParameter('type') + ">Apply for Job </a>" + 
          "</li>";
          if (getUrlParameter('type') === '0'){
                some = " ";
          }

            $("body").prepend("<div class=" + "row" + ">" +
         "<div class=" + "col-sm-2" + "></div>" + 
        "<div class=" + "col-sm-8" + ">" + 
          "<h2 class=" + "mt-4" + ">" + element.title + "</h2>" +
          "<p>" + element.description + "</p>" + 
          "<div class=" + "row" + ">" + 
            "<div class=" + "col-sm-4" + "> Price - " + element.amount + "</div>" +
            "<div class=" + "col-sm-4" + ">Duration - " + element.duration + "</div>" + 
            "<div class=" + "col-sm-4" + ">Skill - " + element.skill_id + "</div></div><p>" +
            some + 
          "</p></div></div> "  );
        });
        // "  <li><a class=" + "btn btn-primary btn-lg" + " href=" + "../applyjob/index.html?id=" + element.id + ">Apply for Job &raquo;</a></li>"
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed");
        alert("Either email or password is incorrect " + errorThrown);
    })
    .always(function() {
        /* ... */
        alert("Either email or password is incorrect " + errorThrown);
    });
    
    


        // var txt1 = "<p>b.</p>";        // Create text with HTML
        // var txt2 = $("<p></p>").text("Text.");  // Create text with jQuery
        // var txt3 = document.createElement("p");
        // txt3.innerHTML = "Text.";         // Create text with DOM
        // $("div").append(txt1, txt2, txt3);   // Append new elements
        


    jQuery('<div/>', {
        id: 'some-id',
        class: 'some-class',
        title: 'now this div has a title!'
    }).appendTo('div');

    var myFruits = ["apple","orange","banana"];
    var myFlowers= ["rose","tulip","carnation"];

    $('#mySelect').bind('change', function () { 
        
        var list = false;
        if (this.value == 'fruits') {
            list = myFruits;
        } else if (this.value == 'flowers') {
            list = myFlowers;
        } else {
            $('#myResults').html('');
            return false;
        }
        if (list) {
            var html = [];
            var len = list.length;
            for (var i = 0; i < len; i++) {
                html.push('<li>' + list[i] + '</li>');   
            }
            html = '<ul>' + html.join('') + '</ul>';
            $('#myResults').html(html);
        }
    });


});