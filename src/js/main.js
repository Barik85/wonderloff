//= ../../bower_components/jquery/dist/jquery.js

(function($){
  $(document).ready(function(){
    $(document)
      .on('click.open_modal', '.btn_black', function() {
        $('.modal_wrapper').show();
      })
      .on('click.close_modal', '.cancel_button', function() {
        $('.modal_wrapper').hide();
      })
      .on('submit.subscribe', '.subscribe_form', function(e){
        e.preventDefault();
        var form = $(this);
        var email = form.find('input[name="email"]').val();
        var name = form.find('input[name="name"]').val();
        var phone = form.find('input[name="phone"]').val();
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (email === '' || ! re.test(email)) {
          form.addClass('is_error');
        } else {
          var action = $(this).prop('action');
          var form_data = new FormData();
          form_data.append('email', email);
          form_data.append('name', name);
          form_data.append('phone', phone);
          $.ajax({
              url: action,
              type: 'post',
              data: form_data,
              cache: false,
              dataType: 'json',
              processData: false,
              contentType: false,
              complete: function (response) {
                if (response.status === 200 && response.responseText === "1") {
                  form.removeClass('is_error');
                  $('.modal_wrapper').addClass('is_sent');
                  form.find('input').val('');
                  $('.modal_content').hide();
                  $('.thanks_message').show();
                } else {
                  form.addClass('is_error');
                }
              },
              error: function() {
                form.addClass('is_error');
              }
          });
        }
      })

      .on('click.close_modal', '.ok_button', function(){
        $('.modal_wrapper').hide();
      });
  });
})(jQuery);
