var $name = $("#name");
var $fname = $("#first_name");
var $lname = $("#last_name");
var $image = $('#image')
var $about = $('#aboutUser')
var $email = $('#email')
var $fb = $('#fb')
var $git = $('#git')
var $link = $('#link')

var $home = $('#homeButton')



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



  jQuery.ajax({
    url: "http://127.0.0.1:3000/users/" + getUrlParameter('id'),
    type: "GET",
    dataType: "json",
  })
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      $name.text(data.user.first_name + "" + data.user.last_name);
      $fname.text(data.user.first_name);
      $lname.text(data.user.last_name);
      $email.text(data.user.email);
      $about.text(data.informtion.about);


      $fb.attr("href", data.informtion.facebook);
      $link.attr("href", data.informtion.github);
      $git.attr("href", data.informtion.linkedin);
      $image.attr("src", data.user.image);

      if (data.user.user_type === 0) {
        $git.hide();
        $link.hide();
        $fb.hide();
      }
      $home.attr("href", "../home/home.html?id=" + getUrlParameter('id') + "&type=" + data.user.user_type);

      if (data.user.user_type === 1) {
        getProposals();
      } else {
        getJobs();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      alert("Something went wrong" + errorThrown);
    })
    .always(function () {
      /* ... */
    });

});

function getJobs() {
  jQuery.ajax({
    url: "http://127.0.0.1:3000/jobs/getJobsById/" + getUrlParameter('id'),
    type: "GET",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
    dataType: "json",
  })
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      $("abc").prepend("<h1>Job History</h1>");
      $('abcd').append("<li class=" + "\"nav-item\"" + ">" + 
      "<a class=" + "\"nav-link js-scroll-trigger\"" + "href=" + "\"#experience\"" + ">History</a>" + "</li>")
      data.forEach(element => {

        const some = "<li class=" + "nav-item" + ">" +
          "<a class=" + "nav-link" + " href=" + "../proposals/index.html?id=" + getUrlParameter('id') + "&job_id=" + element.id + ">See Proposals </a>" +
          "</li>";

        $("abc").append("<div class=" + "row" + ">" +
          "<div class=" + "col-sm-2" + "></div>" +
          "<div class=" + "col-sm-8" + ">" +
          "<h2 class=" + "mt-4" + ">" + element.title + "</h2>" +
          "<p>" + element.description + "</p>" +
          "<div class=" + "row" + ">" +
          "<div class=" + "col-sm-4" + "> Price - " + element.amount + "</div>" +
          "<div class=" + "col-sm-4" + ">Duration - " + element.duration + "</div>" +
          "<div class=" + "col-sm-4" + ">Skill - " + element.skill_id + "</div></div><p>" + some +
          "</p></div></div> ");
      });
      // "  <li><a class=" + "btn btn-primary btn-lg" + " href=" + "../applyjob/index.html?id=" + element.id + ">Apply for Job &raquo;</a></li>"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      alert("Something went wrong" + errorThrown);
    })
    .always(function () {
      /* ... */
    });
}

function getProposals() {
  jQuery.ajax({
    url: "http://127.0.0.1:3000/proposals/getProposalsById/" + getUrlParameter('id'),
    type: "GET",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
    dataType: "json",
  })
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      $("abc").prepend("<h1>Proposal History</h1>");
      $('abcd').append("<li class=" + "\"nav-item\"" + ">" + 
      "<a class=" + "\"nav-link js-scroll-trigger\"" + "href=" + "\"#experience\"" + ">History</a>" + "</li>")
      data.forEach(element => {
        if (element.job_id !== null) {
          render(element.job_id, element.comment)
        }
      });
      // "  <li><a class=" + "btn btn-primary btn-lg" + " href=" + "../applyjob/index.html?id=" + element.id + ">Apply for Job &raquo;</a></li>"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      alert("Something went wrong" + errorThrown);
    })
    .always(function () {
      /* ... */
    });
}

function render(id, comment) {
  jQuery.ajax({
    url: "http://127.0.0.1:3000/jobs/" + id,
    type: "GET",
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
    dataType: "json",
  })
    .done(function (data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      // const some = "<li class=" + "nav-item" + ">" +
      //   "<a class=" + "nav-link" + " href=" + "../applyjob/index.html?id=" + getUrlParameter('id') + "&job_id=" + element.id + ">Apply for Job </a>" +
      //   "</li>";
      // alert(data.title);
      $("abc").append("<div class=" + "row" + ">" +
        "<div class=" + "col-sm-2" + "></div>" +
        "<div class=" + "col-sm-8" + ">" +
        "<h2 class=" + "mt-4" + ">" + data.title + "</h2>" +
        "<p>" + data.description + "</p>" +
        "<div class=" + "row" + ">" +
        "<div class=" + "col-sm-4" + "> Price - " + data.amount + "</div>" +
        "<div class=" + "col-sm-4" + ">Duration - " + data.duration + "</div>" +
        "<div class=" + "col-sm-4" + ">Skill - " + data.skill_id + "</div></div><p>" +
        "</p>" + "<h3>" + "Comment" + "</h3>" + "<p>" + comment + "</p>" + "</div></div> ");
      // "  <li><a class=" + "btn btn-primary btn-lg" + " href=" + "../applyjob/index.html?id=" + element.id + ">Apply for Job &raquo;</a></li>"
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
      // alert("Something went wrong" + errorThrown);
    })
    .always(function () {
      /* ... */
    });
}



(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict
