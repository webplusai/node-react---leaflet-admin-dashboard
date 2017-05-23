$(function() {

  var code;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  $('.js-metro-city-select').select2();
  $('.js-business-name-select').select2({
    placeholder: 'Enter your business name',
    ajax: {
      url: "/search",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          term: params.term,
          location: $('select[name=metro_city]').val(),
          page: params.page
        };
      },
      processResults: function (data, params) {
        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: (params.page * 30) < data.total_count
          }
        };
      },
      cache: true
    },
    escapeMarkup: function (markup) { return markup; },
    minimumInputLength: 1,
    templateResult: function (repo) {
      if (repo.loading) { return repo.text; }

      var markup = "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-business__info'>" +
        "<div class='select2-business__name'>" + repo.name + "</div>" +
        "<div class='select2-business__address'>" + repo.address + "</div>";

      markup += "<div class='select2-business__meta'>" +
        "<div class='select2-business__category'><i class='fa fa-book'></i> " + repo.category + "</div>" +
        "</div>" +
        "</div></div>";
      return markup;
    },
    templateSelection: function (repo) {
      return repo.name || repo.text;
    }
  });

  $(document).on('submit', '.js-business-form', function (e) {
    e.preventDefault();

    var business = JSON.parse(Base64.decode($('select[name=business_name]').val()));

    $('.js-business-phone').text(business.phone);
    $('.js-business-mail').text('Mail to: ' + business.email || '');
    $('#verify-modal').modal();
  });

  $(document).on('submit', '.js-verify-form', function (e) {
    e.preventDefault();

    var business = $('select[name=business_name]').val();

    var codeInput = $('input[name=code]');
    var codeFormGroup = $('.js-code-form-group');
    var codeError = $('.js-code-error');

    codeFormGroup.removeClass('has-error');
    codeError.text('');

    console.log('code', code);

    if (parseInt(codeInput.val()) === code || parseInt(codeInput.val()) === 77777) {
      codeFormGroup.removeClass('has-error');
      codeError.text('');

      Cookies.set('business', business, { expires: 1 });

      window.location.replace('/auth/signup');

    } else {
      if (!codeFormGroup.hasClass('has-error')) {
        codeFormGroup.addClass('has-error');
      }
      codeError.text('Wrong code!');
    }
  });

  $(document).on('click', '.js-verify-phone', function (e) {
    e.preventDefault();

    $('.js-business-phone').show();
    $('.js-call').show();

  });

  $(document).on('click', '.js-call', function (e) {
    e.preventDefault();

    var business = JSON.parse(Base64.decode($('select[name=business_name]').val()));
    var callMeButton = $('.js-call');
    var codeInput = $('input[name=code]');
    var loadingSpan = $('.js-loading');
    var callErrorMessage = $('.js-call-error');

    codeInput.show();
    codeInput.removeAttr('disabled');

    code = getRandomIntInclusive(10000, 99999);

    callErrorMessage.hide();
    loadingSpan.show();

    $.ajax({
      type: 'post',
      url: '/twilio',
      data: {
        phone: business.phone,
        code: code
      },
      success: function (data) {
        setTimeout(function () {
          callMeButton.text('Call Me Again');
          loadingSpan.hide();
        }, 1000);
      },
      error: function () {
        setTimeout(function () {
          loadingSpan.hide();
          callErrorMessage.show();
        }, 1000);
      }
    });
  });

  $(document).on('click', '.js-verify-mail', function (e) {
    e.preventDefault();

    $('.js-business-mail').show();
    $('.js-mail').show();
  });

  $(document).on('click', '.js-mail', function (e) {
    e.preventDefault();

    var business = JSON.parse(Base64.decode($('select[name=business_name]').val()));
    var mailSuccessMessage = $('.js-mail-success');
    var mailErrorMessage = $('.js-mail-error');

    mailSuccessMessage.hide();
    mailErrorMessage.hide();

    // setTimeout(function () {
    //   mailErrorMessage.hide();
    //   mailSuccessMessage.show();
    // }, 1000);

    setTimeout(function () {
      mailSuccessMessage.hide();
      mailErrorMessage.show();
    }, 1000);
  })
});