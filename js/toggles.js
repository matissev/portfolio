/* --------------------- NAV TOGGLE */

navOpened = false;

navToggleButton.onclick = function(){
	if (openedMajorProjectIndex !== null) {
		updateMajorProjectsArticle.close();
		openedMajorProjectIndex = null;
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

	$.fn.fullpage.setAllowScrolling(true);
	$.fn.fullpage.setMouseWheelScrolling(true);
};


/* --------------------- MAJOR PROJECT TOGGLE */

openedMajorProjectIndex = null;

function majorProjectToggle(i) {
	majorProjectButton[i].addEventListener('click', function() {
		openedMajorProjectIndex = i;
		updateMajorProjectsArticle.open();
	}, false);
}

for (i = 0; i < majorProjectButton.length; i++) {
	majorProjectToggle(i);
}


/* --------------------- WORK LINK */

worklink.onclick = function() {
	window.location.hash = 'project1';
};