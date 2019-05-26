

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


    $profile.attr('href', "../profilebootstrap/indexx.html?id=" + getUrlParameter('id'))
    $createjob.attr('href', "../writepost/writepost.html?id=" + getUrlParameter('id'))

    if (getUrlParameter('type') === "1") {
        $createjob.hide();
    }

    // jQuery.ajax({
    //     url: "http://127.0.0.1:3000/jobs/" + getUrlParameter('job_id'),
    //     type: "GET",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //     },
    //     dataType: "json",
    // })
    //     .done(function (data, textStatus, jqXHR) {
    //         console.log("HTTP Request Succeeded: " + jqXHR.status);
    //         console.log(data);
    //         const some = "<li class=" + "nav-item" + ">" +
    //             "<a class=" + "nav-link" + " href=" + "../applyjob/index.html?id=" + getUrlParameter('id') + "&job_id=" + element.id + ">Apply for Job </a>" +
    //             "</li>";
    //         //   if (getUrlParameter('type') === '0'){
    //         //         some = " ";
    //         //   }

            // $("body").prepend("<div class=" + "row" + ">" +
            //     "<div class=" + "col-sm-2" + "></div>" +
            //     "<div class=" + "col-sm-8" + ">" +
            //     "<h1 class=" + "mt-4" + ">" + data.title + "</h1>" +
            //     "<p>" + data.description + "</p>" +
            //     "<div class=" + "row" + ">" +
            //     "<div class=" + "col-sm-4" + "> Price - " + data.amount + "</div>" +
            //     "<div class=" + "col-sm-4" + ">Duration - " + data.duration + "</div>" +
            //     "<div class=" + "col-sm-4" + ">Skill - " + data.skill_id + "</div></div><p>" +
            //     some +
            //     "</p></div></div> ");

    //             alert("mera bhai")
    //         // "  <li><a class=" + "btn btn-primary btn-lg" + " href=" + "../applyjob/index.html?id=" + element.id + ">Apply for Job &raquo;</a></li>"
    //     })
    //     .fail(function (jqXHR, textStatus, errorThrown) {
    //         console.log("HTTP Request Failed");
    //         alert("Either email or password is incorrect " + errorThrown);
    //     })
    //     .always(function () {
    //         /* ... */
    //         alert("Either email or password is incorrect " + errorThrown);
    //     });


            //For proposals
            jQuery.ajax({
                url: "http://127.0.0.1:3000/proposals/getProposalsByJobId/" + getUrlParameter('job_id'),
                type: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                dataType: "json",
            })
            .done(function(data, textStatus, jqXHR) {
                console.log("HTTP Request Succeeded: " + jqXHR.status);
                console.log(data);
    
                data.forEach(element => {
                    $("body").prepend("<div class=" + "row" + ">" +
                "<div class=" + "col-sm-2" + "></div>" +
                "<div class=" + "col-sm-8" + ">" +
                "<h3 class=" + "mt-4" + ">" + "Comment" + "</h3>" +
                "<p>" + element.comment + "    -    Artist ID - " + element.artist_id + "</p>" + "<p>" +
                "</p></div></div> ");
                });
    
    
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log("HTTP Request Failed");
            })
            .always(function() {
                /* ... */
            });


        jQuery.ajax({
            url: "http://127.0.0.1:3000/jobs/" + getUrlParameter('job_id'),
            type: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            dataType: "json",
        })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            // alert("Bhai");
            $("body").prepend("<div class=" + "row" + ">" +
            "<div class=" + "col-sm-2" + "></div>" +
            "<div class=" + "col-sm-8" + ">" +
            "<h1 class=" + "mt-4" + ">" + data.title + "</h1>" +
            "<p>" + data.description + "</p>" +
            "<div class=" + "row" + ">" +
            "<div class=" + "col-sm-4" + "> Price - " + data.amount + "</div>" +
            "<div class=" + "col-sm-4" + ">Duration - " + data.duration + "</div>" +
            "<div class=" + "col-sm-4" + ">Skill - " + data.skill_id + "</div></div><p>" +
            "</p></div></div> ");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })
        .always(function() {
            /* ... */
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

    var myFruits = ["apple", "orange", "banana"];
    var myFlowers = ["rose", "tulip", "carnation"];

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