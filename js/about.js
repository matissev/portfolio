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
			}
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
			delay: 300
		});


		$('section.home header, .nav-toggle-button, .minor-projects-container, .majors .project-details, .majors .tags').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
			display: 'none',
			complete: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					addClass(hiddenElementsOnAbout[i], 'hidden');
				}
			}
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
			}
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
		});

		$('section.home header, .nav-toggle-button, .minor-projects-container, .majors .project-details, .majors .tags').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 300,
			display: 'block',
			begin: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					removeClass(hiddenElementsOnAbout[i], 'hidden');
				}
			}
		});
	}
};