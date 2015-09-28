/* --------------------- LAYOUT CHANGES BY SECTIONS */

fullpageIndex = 1;
numberOfItems = $('#fullpage .section').length;

function afterSectionLoad(anchorLink, index) {
	var loadedSection = $(this);

	if(index === numberOfItems) {
		listenScroll();
	}


	/* Stick projects on the top on #projects(1,2,3) */

	if (index === 2 || index === 3 || index === 4) {
		addClass(document.body, 'on-majors');
	}

	if (index === 1) {
		updateMajorProjectsRoll.show(0);
	}


	/* Unfold nav on #projects(1,2,3) and #other */

	if (index === 2 || index === 3 || index === 4 || index === 5) {
		removeClass(document.body, 'on-home');
		parallax.disable();
	}

	if (index === 5) {
		addClass(document.body, 'on-minors');
	} else {
		removeClass(document.body, 'on-minors');
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
		removeClass(document.body, 'on-majors');
	}


	/* Nav color change */

	if (nextIndex === 5) {
		addClass(document.body, 'on-minors');
		removeClass(document.body, 'on-majors');

	}

	if (nextIndex === 1) {
		updateNav.onHome();
		navOpened = false;
		parallax.enable();

		removeClass(document.body, 'on-minors');
		removeClass(document.body, 'on-majors');
		addClass(document.body, 'on-home');

	}

	if (index === 5 && direction === 'up' && nextIndex !== 1) {
		removeClass(document.body, 'on-minors');
	}

	if (index === 1 && direction === 'down') {
		worklink.onclick = null;
		updateNav.onProjects();
	}


	if (nextIndex === 2) {
		updateMajorProjectsRoll.onFirst();
		addClass(document.querySelector('.major-understudy1'), 'active');
		removeClass(document.querySelector('.major-understudy2'), 'active');
		removeClass(document.querySelector('.major-understudy3'), 'active');
	} else if (nextIndex === 3) {
		updateMajorProjectsRoll.onSecond();
		addClass(document.querySelector('.major-understudy2'), 'active');
		removeClass(document.querySelector('.major-understudy1'), 'active');
		removeClass(document.querySelector('.major-understudy3'), 'active');
	} else if (nextIndex === 4) {
		updateMajorProjectsRoll.onThird();
		addClass(document.querySelector('.major-understudy3'), 'active');
		removeClass(document.querySelector('.major-understudy1'), 'active');
		removeClass(document.querySelector('.major-understudy2'), 'active');
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

	var majorsUnderstudy = document.querySelector('.majors-understudy');
	var understudyElements = null;
	var understudyContainer = null;

	for (i = 0; i < majorProjects.length; i++) {
		understudyElements = majorProjects[i].querySelectorAll('.majors .project-details, .majors .tags');
		understudyContainer = document.createElement('div');
		addClass(understudyContainer, 'major-understudy major-understudy' + (i + 1));
		for (u = 0; u < understudyElements.length; u++)
			understudyContainer.appendChild(understudyElements[u].cloneNode(true));
		majorsUnderstudy.appendChild(understudyContainer);
	}

	majorProjectButtonUnderstudy = document.querySelectorAll('.major-understudy .read-more');
	majorProjectsUnderstudy = document.querySelectorAll('.major-understudy');

	$('#fullpage').fullpage({
		verticalCentered: false,
		loopTop: false,
		loopBottom: false,
		scrollBar: false,
		css3: true,
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