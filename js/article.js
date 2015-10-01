window.addEventListener('scroll', articleScrollHandler, false);

function articleScrollHandler() {
	var scrolledHeight = document.body.scrollTop;
	var nav = document.querySelector('nav');
	var navPositionTop = parseInt(window.getComputedStyle(nav).getPropertyValue('top'));
	var articleHeaderHeight = document.querySelector('header.home').offsetHeight + document.querySelector('.majors header').offsetHeight;

	// Change nav button color
	if (scrolledHeight > articleHeaderHeight - navPositionTop) {
		addClass(nav, 'change-color');
	} else if (scrolledHeight < articleHeaderHeight - navPositionTop - 20) {
		removeClass(nav, 'change-color');
	}
}