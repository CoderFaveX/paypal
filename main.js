$(() => {
  let passed = false;
  $(".password-toggle").click(() => {
    if ($("#password").prop("type") == "password") {
      $("#password").prop("type", "text");
      $(".password-toggle").text("Hide");
    } else {
      $("#password").prop("type", "password");
      $(".password-toggle").text("Show");
    }
  });
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
      $("#email-show").text($("#email").val());
      toggleDivs(false);
    }
  });
  $("#move").click(() => {
    if ($("#password").val().trim() == "") {
      $(".input-hold input").get(0).focus();
      $(".input-hold").addClass("input-hold-focus");
      $(".input-hold").addClass("input-required");
      $(".req").fadeIn(200);
      checkConditions();
      return false;
    }
    $("main:nth-child(2)").css("display", "none");
    $("main:nth-child(3)").fadeIn(300);
  });
  $("form").submit(e => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      $("#submit").prop("disabled", false);
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/welcome.html"; // Redirect to your custom thank-you page
          } else {
            alert(
              "There was a problem with your submission. Please try again."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was a problem with your submission. Please try again.");
        });
    } catch (error) {
      alert("Error:", error);
    } finally {
      $("#submit").prop("disabled", false);
    }
  });

  $("#back").click(() => toggleDivs(true));
});
