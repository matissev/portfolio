/* Put nav links margin in cache */
document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		navLinksMarginBottom = window.getComputedStyle(document.querySelector('.nav-links .link')).getPropertyValue('margin-bottom');
		navAboutPaddingTop = window.getComputedStyle(document.querySelector('.nav-links .about-nav-block')).getPropertyValue('padding-top');
	}
};

updateNav = {
	open: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Previous animations are killed to make the new ones respond quicker */

		/* Show nav */
		if ($.Velocity.hook($('.nav-links'), 'opacity') !== 1) {
			$('.nav-links').velocity('finish');
			$('.nav-links').velocity({
				opacity: 1
			}, {
				duration: currentDuration,
				display: 'block',
				queue: false
			});
		}

		/* Unfold nav */
		if ($.Velocity.hook($('.nav-links .link'), 'marginBottom') !== navLinksMarginBottom) {
			$('.nav-links .link').velocity('finish');
			$('.nav-links .link').velocity({
				marginBottom: navLinksMarginBottom
			}, {
				duration: currentDuration,
				queue: false
			});
			
			$('.nav-links .about-nav-block').velocity('finish');
			$('.nav-links .about-nav-block').velocity({
				paddingTop: navAboutPaddingTop
			}, {
				duration: currentDuration,
				queue: false
			});
		}

		/* Rotate nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), 'rotateX') !== 180) {
			$('.nav-toggle-button').velocity('finish');
			$('.nav-toggle-button').velocity({
				rotateX: 180
			}, {
				duration: currentDuration,
				queue: false
			});
		}
	},

	close: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Hide nav */
		if ($.Velocity.hook($('.nav-links'), 'opacity') !== 0) {
			$('.nav-links').velocity({
				opacity: 0
			}, {
				duration: currentDuration,
				display: 'none',
				queue: false
			});
		}

		/* Fold nav */
		if ($.Velocity.hook($('.nav-links .link'), 'marginBottom') !== 10) {
			$('.nav-links .link').velocity({
				marginBottom: 10
			}, {
				duration: currentDuration,
				queue: false
			});

			$('.nav-links .about-nav-block').velocity({
				paddingTop: 10
			}, {
				duration: currentDuration,
				queue: false
			});
		}

		/* Unrotate nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), 'rotateX') !== 0) {
			$('.nav-toggle-button').velocity({
				rotateX: 0
			}, {
				duration: currentDuration,
				queue: false
			});
		}
	},

	onHome: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Translate nav links */
		/* If nav is closed, hide it */
		$('.nav-links').velocity('finish');
		if ($.Velocity.hook($('.nav-links'), 'opacity') !== 0) {
			$('.nav-links').velocity({
				translateY: 0
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				display: 'block',
				queue: false
			});
		} else {
			$('.nav-links').velocity({
				opacity: 1,
				translateY: 0
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				display: 'block',
				queue: false	
			});
		}

		/* Untranslate nav (with the toggle) */
		if ($.Velocity.hook($('.nav'), 'translateY') !== 0) {
			$('.nav').velocity('finish');
			$('.nav').velocity({
				translateY: 0
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				queue: false
			});
		}

		/* Unrotate and hide nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), 'opacity') !== 0) {
			$('.nav-toggle-button').velocity('finish');
			$('.nav-toggle-button').velocity({
				opacity: 0,
				rotateX: 0
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				display: 'none',
				queue: false
			});
		}

		/* Unfold nav */
		if ($.Velocity.hook($('.nav-links .link'), 'marginBottom') !== navLinksMarginBottom) {
			$('.nav-links .link').velocity('finish');
			$('.nav-links .link').velocity({
				marginBottom: navLinksMarginBottom
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				queue: false
			});

			$('.nav-links .about-nav-block').velocity('finish');
			$('.nav-links .about-nav-block').velocity({
				paddingTop: navAboutPaddingTop
			}, {
				duration: currentDuration/2,
				delay: currentDuration/2,
				queue: false
			});
		}
	},

	onProjects: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Translate and hide nav links */
		if ($.Velocity.hook($('.nav-links'), 'translateY') !== 30) {
			$('.nav-links').velocity({
				opacity: 0,
				translateY: 30
			}, {
				duration: currentDuration/2,
				display: 'none',
				queue: false
			});
		}

		/* Translate nav (with the toggle) */
		if ($.Velocity.hook($('.nav'), 'translateY') !== -82) {
			$('.nav').velocity({
				translateY: -82
			}, {
				duration: currentDuration/2,
				queue: false
			});
		}

		/* Show nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), 'opacity') !== 1) {
			$('.nav-toggle-button').velocity({
				opacity: 1
			}, {
				duration: currentDuration/2,
				display: 'block',
				queue: false
			});
		}

		/* Fold nav */
		if ($.Velocity.hook($('.nav-links .link'), 'marginBottom') !== 10) {
			$('.nav-links .link').velocity({
				marginBottom: 10
			}, {
				duration: currentDuration/2,
				queue: false
			});

			$('.nav-links .about-nav-block').velocity({
				paddingTop: 10
			}, {
				duration: currentDuration/2,
				queue: false
			});
		}
	}
};