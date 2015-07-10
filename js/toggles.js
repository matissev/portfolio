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