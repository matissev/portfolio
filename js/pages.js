/* --------------------- LAYOUT CHANGES BY SECTIONS */

function afterSectionLoad(anchorLink, index) {
	var loadedSection = $(this);


	/* Stick projects on the top and toggle off the nav on #projects(1,2,3) */

	if (anchorLink === 'project1' || anchorLink === 'project2' || anchorLink === 'project3') {
		addClass(nav, 'on-projects');
		for(i = 0; i <= projects.length; i++) {
			addClass(projects[i], 'on-projects');
		}
	}


	/* Unfold nav on #projects(1,2,3) and #other */

	if (anchorLink === 'project1' || anchorLink === 'project2' || anchorLink === 'project3' || anchorLink === 'other')
		removeClass(nav, 'folded');
}

function onSectionLeave(index, nextIndex, direction) {
	var leavingSection = $(this);


	/* Unstick projects off the top and change nav color on #projects(1,2,3) */

	if ((index === 2 && direction === 'up') || (index === 4 && direction === 'down')) {
		removeClass(nav, 'on-projects');
		for(i = 0; i <= projects.length; i++) {
			removeClass(projects[i], 'on-projects');
		}
	}


	/* Nav change color on #other */

	if (index === 4 && direction === 'down') {
		addClass(nav, 'on-others');
	} else if (index === 5 && direction == 'up') {
		removeClass(nav, 'on-others');
	}


	/* Work links in nav folding on #home */

	if (index === 2 && direction === 'up') {
		worklink.onclick = function() {
			window.location.hash = 'project1';
		};

		addClass(nav, 'folded');

		navToggleDisplayed = false;
		showNavToggle();

		navToggled = true;
		toggleNav();

		navTranslated = false;
		translateNav();
	} else if (index === 1 && direction === 'down') {
		worklink.onclick = null;

		navToggleDisplayed = true;
		showNavToggle();

		navToggled = false;
		toggleNav();

		navTranslated = true;
		translateNav();
	}
}


/* --------------------- FULLPAGE INITIALIZE */

$(document).ready(function() {
	'use strict';
	
	$('#fullpage').fullpage({
		verticalCentered: false,
		loopTop: false,
		loopBottom: false,
		scrollBar: false,
		css3: false,
		scrollingSpeed: slideTransitionDuration,
		anchors:['home', 'project1', 'project2', 'project3', 'other'],
		afterLoad: function(anchorLink, index){
			afterSectionLoad(anchorLink, index);
		},
		onLeave: function(index, nextIndex, direction){
			onSectionLeave(index, nextIndex, direction);
		}
	});
});