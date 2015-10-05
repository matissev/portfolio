document.addEventListener('DOMContentLoaded', function(event) {
	/* --------------------- NAV TOGGLE */

	navOpened = false;

	navToggleButton.onclick = function(){
		if (openedMajorProjectIndex !== null) {
			updateMajorProjectsArticle.close();
		} else {
			if (navOpened) {
				updateNav.close(300);
				updateMajorProjectsRoll.show(300);
			} else {
				updateNav.open(300);
				updateMajorProjectsRoll.hide(300);
			}

			navOpened = !navOpened;
		}
	};


	/* --------------------- ABOUT TOGGLE */

	aboutOpenButton.onclick = function(){
		updateAbout.open(300);

		if (fullpageIndex !== 1) {
			updateNav.close(300);
			navOpened = false;
		}

		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setMouseWheelScrolling(false);
	};

	aboutCloseButton.onclick = function(){
		updateAbout.close(200);
		updateMajorProjectsRoll.show(300);

		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setMouseWheelScrolling(true);
	};


	/* --------------------- MAJOR PROJECT TOGGLE */

	openedMajorProjectIndex = null;

	function majorProjectToggle(i) {
		majorProjectButtonUnderstudy[i].addEventListener('click', function(event) {
			event.preventDefault();
			openedMajorProjectIndex = i;
			updateMajorProjectsArticle.open();
			return false;
		}, false);

		majorProjectButton[i].addEventListener('click', function(event) {
			event.preventDefault();
			openedMajorProjectIndex = i;
			updateMajorProjectsArticle.open();
			return false;
		}, false);
	}

	if (!mobileDevice) {
		for (i = 0; i < majorProjectButton.length; i++) {
			majorProjectToggle(i);
		}
	}


	/* --------------------- CLOSE NAV TOGGLE */

	function closeNav(i) {
		navLinks[i].addEventListener('click', function() {
			if (fullpageIndex !== 1 && hasClass(navLinks[i], 'targeted')) {
				updateNav.close(300);
				updateMajorProjectsRoll.show(300);
				navOpened = false;
			}
		}, false);
	}

	for (i = 0; i < navLinks.length; i++) {
		closeNav(i);
	}
}, false);


/* --------------------- CLOSE ARTICLE TOGGLE */

function attachArticleCloseEvent(closeArticleButton) {
	function closeArticleToggle(i) {
		closeArticleButton[i].addEventListener('click', function() {
			updateMajorProjectsArticle.close();
		}, false);
	}

	for (i = 0; i < closeArticleButton.length; i++) {
		closeArticleToggle(i);
	}
}