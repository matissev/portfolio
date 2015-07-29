updateAbout = {
	open: function(overrideDuration, overrideDelay) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		$('section.about').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 200,
			begin: function() {
				removeClass(aboutPage, 'hidden');
			}
		});

		$('section.home header, .nav-toggle-button, .other-projects-container, .projects .project-details, .projects .tags').velocity({
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
			complete: function() {
				addClass(aboutPage, 'hidden');
			}
		});

		$('section.home header, .nav-toggle-button, .other-projects-container, .projects .project-details, .projects .tags').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			delay: 200,
			begin: function() {
				for (i = 0; i < hiddenElementsOnAbout.length; i++) {
					removeClass(hiddenElementsOnAbout[i], 'hidden');
				}
			}
		});
	}
};