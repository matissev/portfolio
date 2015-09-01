/* --------------------- LAYOUT CHANGES BY SECTIONS */

fullpageIndex = 1;

function afterSectionLoad(anchorLink, index) {
	var loadedSection = $(this);

	if(index === numberOfItems) {
		listenScroll();
	}


	/* Stick projects on the top on #projects(1,2,3) */

	if (index === 2 || index === 3 || index === 4) {
		addClass(nav, 'on-majors');
		for(i = 0; i <= majorProjects.length; i++) {
			addClass(majorProjects[i], 'on-majors');
		}
	}

	if (index === 1) {
		updateMajorProjectsRoll.show(0);
	}


	/* Unfold nav on #projects(1,2,3) and #other */

	if (index === 2 || index === 3 || index === 4 || index === 5) {
		removeClass(nav, 'on-home');
	}
}

function onSectionLeave(index, nextIndex, direction) {
	var leavingSection = $(this);

	fullpagePreviousIndex = index;
	fullpageIndex = nextIndex;

	if (index === 5 && direction === 'up') {
		reenableScroll();
	}


	/* Unstick projects off the top and change nav color on #projects(1,2,3) */

	if ((index !== 1 && index !== 5) && (nextIndex == 1 || nextIndex == 5)) {
		for(i = 0; i <= majorProjects.length; i++) {
			removeClass(majorProjects[i], 'on-majors');
		}
	}


	/* Nav color change */

	if (nextIndex === 5) {
		addClass(nav, 'on-minors');
		removeClass(nav, 'on-majors');

	}

	if (nextIndex === 1) {
		updateNav.onHome();
		navOpened = false;

		removeClass(nav, 'on-minors');
		removeClass(nav, 'on-majors');
		addClass(nav, 'on-home');

	}

	if (index === 5 && direction === 'up' && nextIndex !== 1) {
		removeClass(nav, 'on-minors');
		addClass(nav, 'on-majors');

	}

	if (index === 1 && direction === 'down') {
		worklink.onclick = null;
		updateNav.onProjects();
	}


	if (nextIndex === 2) {
		updateMajorProjectsRoll.onFirst();

	} else if (nextIndex === 3) {
		updateMajorProjectsRoll.onSecond();

	} else if (nextIndex === 4) {
		updateMajorProjectsRoll.onThird();
	}


	if (nextIndex !== 1 && navOpened === true) {
		updateNav.close(300);
		navOpened = false;

		updateMajorProjectsRoll.show(300);
	}
}


/* --------------------- FULLPAGE INITIALIZE */

$(document).ready(function() {
	var autoScroll = isMobile.any ? false : true;

	$('#fullpage').fullpage({
		verticalCentered: false,
		loopTop: false,
		loopBottom: false,
		scrollBar: false,
		css3: false,
		recordHistory: false,
		autoScrolling: autoScroll,
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