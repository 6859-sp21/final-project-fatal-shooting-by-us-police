
//https://codyhouse.co/gem/vertical-fixed-navigation-2

jQuery(document).ready(function($){
	var contentSections = $('.nav-section'),
		navigationItems = $('#cd-vertical-nav a');

	//console.log(contentSections)
	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
	});
	//smooth scroll to second section
	$('.cd-scroll-down').on('click', function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
	});

	function updateNavigation() {
		var halfWindowHeight = $(window).height()/2,
			scrollTop = $(window).scrollTop();
		contentSections.each(function(){
			var section = $(this),
				sectionId = section.attr('id'),
				navigationItem = navigationItems.filter('[href^="#'+ sectionId +'"]');
			( (section.offset().top - halfWindowHeight < scrollTop ) && ( section.offset().top + section.height() - halfWindowHeight > scrollTop) )
				? navigationItem.addClass('is-selected')
				: navigationItem.removeClass('is-selected');
		});
	}

	function smoothScroll(target) {
		$('body,html').animate(
			{'scrollTop':target.offset().top},
			600
		);
	}
});
