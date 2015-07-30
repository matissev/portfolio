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

		$('.about-container').velocity({
			opacity: 1,
		}, {
			duration: currentDuration,
			delay: 300
		});

		$('section.home header, .nav-toggle-button, .nav-links, .minor-projects-container, .majors .project-details, .majors .tags').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
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

		$('.about-container').velocity({
			opacity: 0,
		}, {
			duration: currentDuration,
		});

		$('section.home header, .nav-toggle-button, .nav-links, .minor-projects-container, .majors .project-details, .majors .tags').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 300,
			begin: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					removeClass(hiddenElementsOnAbout[i], 'hidden');
				}
			}
		});
	}
};