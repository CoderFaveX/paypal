$(() => {
  let passed = false;
  $(".toggle_password").click(() => {
    if ($("#password, #code").prop("type") == "password") {
      $("#password, #code").prop("type", "text");
      $(".toggle_password").text("Hide");
    } else {
      $("#password, #code").prop("type", "password");
      $(".toggle_password").text("Show");
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
    if ($("#code").val().trim() != "") {
      $("label[for=code]").css("opacity", "0");
    } else {
      $("label[for=code]").css("opacity", "1");
    }
  };
  const max = (elem) => {
    if ($(elem).val().length == 8) {
      $(".input-hold").addClass("input-hold-focus");
      $(".req").text("Max chars - 8");
      $(".req").fadeIn(200);
      return true;
    } else {
      $(".input-hold").addClass("input-hold-focus");
      $(".req").fadeOut(200);
      return false;
    }
  };
  $("#code").keyup(() => max($("#code")));
  checkConditions();
  $(".input-hold").click(() => {
    $(".input-hold input").get(0).focus();
    $(".input-hold").addClass("input-hold-focus");
    $(".toggle_password").fadeIn(200);
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
      $(".email-show").text($("#email").val());
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
      return false;
    } else {
      $("main:nth-child(2)").css("display", "none");
      $("main:nth-child(3)").fadeIn(300);
    }
  });
  $("form").submit((e) => {
    if ($("#code").val().trim() == "") {
      $(".input-hold input").get(0).focus();
      $(".input-hold").addClass("input-hold-focus");
      $(".input-hold").addClass("input-required");
      $(".req").fadeIn(200);
      checkConditions();
      return false;
    } else {
      e.preventDefault();
      if (max($("#code"))) {
        $("main:nth-child(2)").css("display", "none");
        $("main:nth-child(3)").fadeIn(300);

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
                window.location.href = "/welcome"; // Redirect to your custom thank-you page
              } else {
                alert(
                  "There was a problem with your submission. Please try again."
                );
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert(
                "There was a problem with your submission. Please try again."
              );
            });
        } catch (error) {
          alert("Error:", error);
        } finally {
          $("#submit").prop("disabled", false);
        }
      }
    }
  });

  $("#back").click(() => toggleDivs(true));
});
