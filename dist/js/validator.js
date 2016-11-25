$(function() {
// user-side validation
    $('#regForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'fa fa-check',
            invalid: 'fa fa-times',
            validating: 'fa fa-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'Пожалуйста, введите Ваше имя'
                    }
                }
            },
            secondname: {
                validators: {
                    notEmpty: {
                        message: 'Пожалуйста, введите Вашу фамилию'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Пожалуйста, введите имейл'
                    },
                    emailAddress: {
                        message: ' '
                    },
                    regexp: {
                        regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Пожалуйста, введите правильный имейл'
                    }
                }
            },
            gender: {
                validators: {
                    notEmpty: {
                        message: 'Пожалуйста, укажите ваш пол'
                    }
                }
            },
            pass: {
                validators: {
                    notEmpty: {
                        message: 'Пожалуйста, введите правильный имейл'
                    },
                    stringLength: {
                        min: 8,
                        max: 25,
                        message: 'Введите пароль длинной от 8 до 25 символов'
                    },
                    regexp: {
                        regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/,
                        message: 'Пароль должен содержать хотя бы 1 букву и 1 цифру'
                    }
                }
            },
            agree: {
                validators: {
                    notEmpty: {
                        message: 'Подтвердите, что ознакомились с условиями'
                    }
                }
            }
        }
    });


// server validation
    $("#regForm").submit(function(e) {

      e.preventDefault();

      var form = $(this),
          term = form.serialize(),
          url = "http://codeit.pro/frontTestTask/user/registration/";

      var posting = $.post(url, term);

      posting.done(function(data) {

      if (data.status == 'Error' || data.status == 'Form Error') $("#result").empty().append(data.message);

      // if (data.status == 'Form Error') $form.find("#"+data.field).parents(".form-group").append(data.message);

      if (data.status == 'OK') window.location.href ='index.html';

      });
    });

});
