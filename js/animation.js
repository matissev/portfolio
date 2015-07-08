slideTransitionDuration = 600;

function toggleNav(overrideDuration) {
	currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
	navToggled = !navToggled;

	if (navToggled) {
		$('.nav-links').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			display: 'block'	
		});

		$('.nav-links .link').velocity({
			marginBottom: navLinksMarginBottom
		}, {
			duration: currentDuration
		});

		$('.nav-links .about').velocity({
			paddingTop: navAboutPaddingTop
		}, {
			duration: currentDuration
		});
	} else {
		navLinksMarginBottom = $.Velocity.hook($('.nav-links .link'), "marginBottom");
		navAboutPaddingTop = $.Velocity.hook($('.nav-links .about'), "paddingTop");

		$('.nav-links').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
			display: 'none'
		});

		$('.nav-links .link').velocity({
			marginBottom: 10
		}, {
			duration: currentDuration
		});

		$('.nav-links .about').velocity({
			paddingTop: 10
		}, {
			duration: currentDuration
		});
	}
}

function translateNav(overrideDuration) {
	currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

	if (navTranslated === true) {
		$('#nav').velocity({
			translateY: -82
		}, {
			duration: currentDuration
		});

	} else {
		$('#nav').velocity({
			translateY: 0
		}, {
			duration: currentDuration	
		});
	}
}

function showNavToggle(overrideDuration) {
	currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

	if (navToggleDisplayed === false) {
		$('#nav-toggle-button').velocity({
			opacity: 0
		}, {
			duration: currentDuration,
			display: 'none'
		});

	} else {
		$('#nav-toggle-button').velocity({
			opacity: 1
		}, {
			duration: currentDuration,
			display: 'block'
		});
	}
}

function rotateNavToggle(overrideDuration) {
	currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
	navToggleRotated = !navToggleRotated;

	if (navToggleRotated) {
		$('#nav-toggle-button').velocity({
			rotateX: 180
		}, {
			duration: currentDuration,
		});

	} else {
		$('#nav-toggle-button').velocity({
			rotateX: 0
		}, {
			duration: currentDuration,
		});
	}
}