$(function(){

  $(".menu a").on("click", function (e) {
		e.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 1500);
	});

  $('.slider-blog__inner').slick({
    infinite: true,
    dots: true,
    arrows: false
  });

  $('.menu__btn, .menu a').on('click', function(){
    $('.header__top-inner').toggleClass('header__top-inner--active');
  });

  var mixer = mixitup('.portfolio__content');


});