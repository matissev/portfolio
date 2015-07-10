/* --------------------- NAV TOGGLE */

navOpened = false;

navToggleButton.onclick = function(){
	if (navOpened) {
		updateNav.close(300);
	} else {
		updateNav.open(300);
	}

	navOpened = !navOpened;
};