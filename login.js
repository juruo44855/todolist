$(document).ready(function () {
    $("#signupdisplay").click(function () {
      $("#login_box").fadeToggle("fast");
      setTimeout(() => $("#content_rbox").fadeToggle("fast"), 200)
    });

    $("#intro").click(function () {
      $("#login_box").fadeToggle("fast");
      setTimeout(() => $("#content_lbox").fadeToggle("fast"), 200)
    });

    $("#backr").click(function () {
      $("#content_rbox").fadeToggle("fast");
      setTimeout(() => $("#login_box").fadeToggle("fast"), 200)
    });
    $("#backl").click(function () {
      $("#content_lbox").fadeToggle("fast");
      setTimeout(() => $("#login_box").fadeToggle("fast"), 200)
    });
  });