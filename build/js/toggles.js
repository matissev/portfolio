/* --------------------- NAV TOGGLE */

navToggled = true;
navTranslated = false;
navToggleDisplayed = false;
navToggleRotated = false;

navToggleButton.onclick = function(){
	toggleNav(300);
	rotateNavToggle(300);
};