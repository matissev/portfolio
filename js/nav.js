slideTransitionDuration = 600;

/* Put nav links margin in cache */
navLinksMarginBottom = $.Velocity.hook($('.nav-links .link'), "marginBottom");
navAboutPaddingTop = $.Velocity.hook($('.nav-links .about-nav-block'), "paddingTop");

updateNav = {
	open: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Previous animations are killed to make the new ones respond quicker */

		/* Show nav */
		if ($.Velocity.hook($('.nav-links'), "opacity") !== 1) {
			$('.nav-links').velocity("finish");
			$('.nav-links').velocity({
				opacity: 1
			}, {
				duration: currentDuration,
				display: 'block',
				delay: 200
			});
		}

		/* Unfold nav */
		if ($.Velocity.hook($('.nav-links .link'), "marginBottom") !== navLinksMarginBottom) {
			$('.nav-links .link').velocity("finish");
			$('.nav-links .link').velocity({
				marginBottom: navLinksMarginBottom
			}, {
				duration: currentDuration,
				delay: 200
			});
			
			$('.nav-links .about-nav-block').velocity("finish");
			$('.nav-links .about-nav-block').velocity({
				paddingTop: navAboutPaddingTop
			}, {
				duration: currentDuration,
				delay: 200
			});
		}

		/* Rotate nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), "rotateX") !== 180) {
			$('.nav-toggle-button').velocity("finish");
			$('.nav-toggle-button').velocity({
				rotateX: 180
			}, {
				duration: currentDuration,
				delay: 200
			});
		}
	},

	close: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Hide nav */
		if ($.Velocity.hook($('.nav-links'), "opacity") !== 0) {
			$('.nav-links').velocity({
				opacity: 0
			}, {
				duration: currentDuration,
				display: 'none'
			});
		}

		/* Fold nav */
		if ($.Velocity.hook($('.nav-links .link'), "marginBottom") !== 10) {
			$('.nav-links .link').velocity({
				marginBottom: 10
			}, {
				duration: currentDuration
			});

			$('.nav-links .about-nav-block').velocity({
				paddingTop: 10
			}, {
				duration: currentDuration
			});
		}

		/* Unrotate nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), "rotateX") !== 0) {
			$('.nav-toggle-button').velocity({
				rotateX: 0
			}, {
				duration: currentDuration,
			});
		}
	},

	onHome: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Translate nav links */
		/* If nav is closed, hide it */
		$('.nav-links').velocity("finish");
		if ($.Velocity.hook($('.nav-links'), "opacity") !== 0) {
			$('.nav-links').velocity({
				translateY: 0
			}, {
				duration: currentDuration,
				display: 'block'	
			});
		} else {
			$('.nav-links').velocity({
				opacity: 1,
				translateY: 0
			}, {
				duration: currentDuration,
				display: 'block'	
			});
		}

		/* Untranslate nav (with the toggle) */
		if ($.Velocity.hook($('.nav'), "translateY") !== 0) {
			$('.nav').velocity("finish");
			$('.nav').velocity({
				translateY: 0
			}, {
				duration: currentDuration	
			});
		}

		/* Unrotate and hide nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), "opacity") !== 0) {
			$('.nav-toggle-button').velocity("finish");
			$('.nav-toggle-button').velocity({
				opacity: 0,
				rotateX: 0
			}, {
				duration: currentDuration,
				display: 'none'
			});
		}

		/* Unfold nav */
		if ($.Velocity.hook($('.nav-links .link'), "marginBottom") !== navLinksMarginBottom) {
			$('.nav-links .link').velocity("finish");
			$('.nav-links .link').velocity({
				marginBottom: navLinksMarginBottom
			}, {
				duration: currentDuration
			});

			$('.nav-links .about-nav-block').velocity("finish");
			$('.nav-links .about-nav-block').velocity({
				paddingTop: navAboutPaddingTop
			}, {
				duration: currentDuration
			});
		}
	},

	onProjects: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		/* Translate and hide nav links */
		if ($.Velocity.hook($('.nav-links'), "translateY") !== 30) {
			$('.nav-links').velocity({
				opacity: 0,
				translateY: 30
			}, {
				duration: currentDuration,
				display: 'none'
			});
		}

		/* Translate nav (with the toggle) */
		if ($.Velocity.hook($('.nav'), "translateY") !== -82) {
			$('.nav').velocity({
				translateY: -82
			}, {
				duration: currentDuration
			});
		}

		/* Show nav toggle */
		if ($.Velocity.hook($('.nav-toggle-button'), "opacity") !== 1) {
			$('.nav-toggle-button').velocity({
				opacity: 1
			}, {
				duration: currentDuration,
				display: 'block'
			});
		}

		/* Fold nav */
		if ($.Velocity.hook($('.nav-links .link'), "marginBottom") !== 10) {
			$('.nav-links .link').velocity({
				marginBottom: 10
			}, {
				duration: currentDuration
			});

			$('.nav-links .about-nav-block').velocity({
				paddingTop: 10
			}, {
				duration: currentDuration
			});
		}
	}
};