updateAbout = {
	open: function(overrideDuration, overrideDelay) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		$('section.about').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 150,
			begin: function() {
				removeClass(aboutPage, 'hidden');
			},
			queue: false
		});


		$('.about-close-button').velocity({
			rotateZ: '90deg'
		}, {
			duration: currentDuration,
			easing: 'easeOutSine',
			delay: 150
		});


		$('.about-container').velocity({
			opacity: 1,
		}, {
			duration: currentDuration,
			delay: 300,
			queue: false
		});


		$('.news').velocity({
			opacity: 0,
		}, {
			duration: currentDuration,
			queue: false
		});


		$('header.home .home-header, .nav, .majors .project-details, .majors .tags').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
			display: 'none',
			complete: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					addClass(hiddenElementsOnAbout[i], 'hidden');
				}
			},
			queue: false
		});
	},

	close: function(overrideDuration, overrideDelay) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		$('section.about').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
			delay: 150,
			complete: function() {
				addClass(aboutPage, 'hidden');
			},
			queue: false
		});

		$('.about-close-button').velocity({
			rotateZ: '0deg'
		}, {
			duration: currentDuration,
			easing: 'easeInCubic',
			delay: 150
		});

		$('.about-container').velocity({
			opacity: 0,
		}, {
			duration: currentDuration,
			queue: false
		});


		$('.minor-projects-container').velocity({
			opacity: 1,
			display: 'block'
		}, {
			duration: currentDuration,
			delay: 300,
			queue: false
		});

		$('.news').velocity({
			opacity: 1,
		}, {
			duration: currentDuration,
			delay: 300,
			queue: false
		});

		$('header.home .home-header, .nav, .majors .project-details, .majors .tags').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 300,
			display: 'block',
			begin: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					removeClass(hiddenElementsOnAbout[i], 'hidden');
				}
			},
			queue: false
		});
	}
};