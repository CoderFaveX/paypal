$(() => {
  let passed = false;
  const toggleDivs = (first) => {
    if (first) {
      $("main:nth-child(2)").css("display", "none");
      $("main:nth-child(1)").fadeIn(300);
    } else {
      $("main:nth-child(1)").css("display", "none");
      $("main:nth-child(2)").fadeIn(300);
    }
  };
  const checkConditions = () => {
    if ($("#email").val().trim() != "") {
      $("label[for=email]").css("opacity", "0");
    } else {
      $("label[for=email]").css("opacity", "1");
    }
    if ($("#password").val().trim() != "") {
      $("label[for=password]").css("opacity", "0");
    } else {
      $("label[for=password]").css("opacity", "1");
    }
  };
  checkConditions();
  $(".input-hold").click(() => {
    $(".input-hold input").get(0).focus();
    $(".input-hold").addClass("input-hold-focus");
    checkConditions();
  });
  $(".input-hold input").focusout(() => {
    $(".input-hold").removeClass("input-hold-focus");
    $(".input-hold").removeClass("input-required");
    $(".req").fadeOut(200);
    checkConditions();
  });
  $("#next").click(() => {
    if ($("#email").val().trim() == "") {
      $(".input-hold input").get(0).focus();
      $(".input-hold").addClass("input-hold-focus");
      $(".input-hold").addClass("input-required");
      $(".req").fadeIn(200);
      checkConditions();
    } else {
      toggleDivs(false);
    }
  });
  $("#submit").click(() => {
    if ($("#password").val().trim() == "") {
      $(".input-hold input").get(0).focus();
      $(".input-hold").addClass("input-hold-focus");
      $(".input-hold").addClass("input-required");
      $(".req").fadeIn(200);
      checkConditions();
      e.preventDefault();
      return false;
    }
  });
  $("#back").click(() => toggleDivs(true));
});
