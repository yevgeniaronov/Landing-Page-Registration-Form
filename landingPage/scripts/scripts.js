$(function () {
  $.validator.addMethod("regexpassword", function (value, element, regexpr) {
    return regexpr.test(value);
  }, "Your password must contain at least 6 characters, at least 1 letter and 1 number.");

  $.validator.addMethod("regexlastname", function (value, element, regexpr) {
    return regexpr.test(value);
  }, "Please enter a valid last name");

  $.validator.addMethod("regexfirstname", function (value, element, regexpr) {
    return regexpr.test(value);
  }, "Please enter a valid first name");

  $.validator.addMethod("phoneregex", function (value, element, regexpr) {
    return regexpr.test(value);
  }, "Please enter a valid phone number");

  $("#account_form").validate({
    rules: {
      password: {
        required: true,
        minlength: 6,
        regexpassword: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/

      },
      password_again: {
        equalTo: "#password"
      },
      firstname: {
        required: true,
        minlength: 2,
        regexfirstname: /^[a-zA-Z]+$/
      },
      lastname: {
        required: true,
        minlength: 2,
        regexlastname: /^[a-zA-Z]+$/
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneregex: /^[0-9]+$/,
        minlength: 6,
        maxlength: 12
      },
      terms: "required"

    },
    messages: {
      firstname: {
        required: "Please enter your first name",
        minlength: "Your first name must be at least 2 characters long"
      },
      lastname: {
        required: "Please provide your last name",
        minlength: "Your last name must be at least 2 characters long"
      },
      phone: {
        required: "Please enter your phone nubmer",
        minlength: "Please enter a valid phone number",
        maxlength: "Please enter a valid phone number"
      },
      password_again: {
        required: "Please re-enter your password",
        equalTo: "Please make sure the passwords match"
      },
      password: {
        required: "Please enter your password",
        minlength: "Your password must contain at least 6 characters"
      },
      terms: {
        required: "Please agree to our terms"
      },
      email: "Please enter a valid email address"
    }
  });


  $("#account_form").submit(function (event) {

    if (typeof $("input.error")[0] !== "undefined") {
      $(".somethingWentWrongMessage").css("display", "block");
    }
    else if ($("input.valid") !== null) {
      $(".somethingWentWrongMessage").css("display", "none");

      // $.get("../../API-request.php", function (data) {
      //   console.log(data);
      // });

      var userData = {
        'firstName': $('input[name=firstname]').val(),
        'lastName': $('input[name=lastname]').val(),
        'email': $('input[name=email]').val(),
        'password': $('input[name=password]').val(),
        'phoneNumber': $('input[name=phone]').val()
      };

      $.ajax({
        type: "POST",
        url: "../../API-request.php",
        data: userData,
        dataType: "JSON",
        success: function (result) {
          console.log(result);
        }

      });

      $(":submit", this).attr("disabled", "disabled");

    }

    event.preventDefault();

  });

  $(".checkboxlabel").click(function () {
    var checked = $('input[type="checkbox"]').attr('checked');
    if (typeof checked !== typeof undefined && checked !== false) {
      $('input[type="checkbox"]').removeAttr('checked');
    } else {
      $('input[type="checkbox"]').attr('checked', true);
    }
  });


});


