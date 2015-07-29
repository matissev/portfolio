/* --------------------- NAV TOGGLE */

navOpened = false;

navToggleButton.onclick = function(){
	if (navOpened) {
		updateNav.close(300);
		updateProjects.show(300);
	} else {
		updateNav.open(300);
		updateProjects.hide(300);
	}

	navOpened = !navOpened;
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
	updateAbout.close(300);

    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setMouseWheelScrolling(true);
};


/* --------------------- WORK LINK */

worklink.onclick = function() {
	window.location.hash = 'project1';
};