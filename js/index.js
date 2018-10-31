$(document).ready(function($){
  // Toggle nav menu on button click
  var $root = $('html, body'),
      menu_toggle = $('.menu-toggle');

  menu_toggle.on('click', function(){
    var $this = $(this)

    $this.toggleClass('close')
    $('.menu, .menu-nav, .menu-nav-item').toggleClass('show')
  })

  // Toggle nav menu on menu item click and smooth scrolling
  $('.menu-nav-item a').on('click', function(){
    var $this = $(this)
    var href = $this.attr('href')

    // Toggle nav menu
    menu_toggle.removeClass('close')
    $this.parents('.menu-nav-item, .menu-nav, .menu').removeClass('show')

    // Smooth scrolling
    $root.animate({
      scrollTop: $(href).offset().top - 100
    }, 500, function() {
      window.location.hash = href
    })

  })
  // Toggle get quote smooth scrolling
  $('#about a').on('click', function(){
    var $this = $(this)
    var href = $this.attr('href')

    $root.animate({
      scrollTop: $(href).offset().top - 100
    }, 500, function() {
      window.location.hash = '#contact'
    })

  })

  // Attach a submit handler to the form
  $('.contact-form').submit(function(e){
    // Stop form from submitting normally
    e.preventDefault();
     // Serialize submitting form data and get action
     var $form = $(this)
     var url = $form.attr('action')

     // Send the data using post
     var posting = $.post(url, $form.serialize())

     // Put the results in a div
     posting.done(function(data){
       var response = $.parseJSON(data)
       var target = $('#status-messages')

       // Add success/error classes
       if(response.status == 1){
         target.removeClass('error')
         target.addClass('success')
       } else if (response.status == 0){
         target.removeClass('success')
         target.addClass('error')
       }

       // Append message
       target.empty().append(response.message).hide().fadeIn(400)
     })
  })
})
