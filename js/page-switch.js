/* --------------------- LAYOUT CHANGES BY SECTIONS */

fullpageIndex = 1;

function afterSectionLoad(anchorLink, index) {
	var loadedSection = $(this);

	/* Stick projects on the top on #projects(1,2,3) */

	if (index === 1) {
		updateMajorProjectsRoll.show(0);
	}

	/* Unfold nav on #projects(1,2,3) and #other */

	if (index === 2 || index === 3 || index === 4 || index === 5) {
		parallax.disable();

		if (index === 2 || index === 3 || index === 4) {
			addClass(document.body, 'on-majors');
		}
	}

	if (index === 5) {
		addClass(document.body, 'on-minors');
		listenScroll();
	}
}

function onSectionLeave(index, nextIndex, direction) {
	var leavingSection = $(this);
	fullpagePreviousIndex = index;
	fullpageIndex = nextIndex;

	for (i = 0; i <= navLinks.length; i++) {
		removeClass(navLinks[i], 'active');
		if (i + 1 === nextIndex) {
			addClass(navLinks[i], 'active');
		}
	}

	if ((index !== 1 && index !== 5) && (nextIndex == 1 || nextIndex == 5)) {
		removeClass(document.body, 'on-majors');
	}

	if (index === 5 && direction === 'up') {
		reenableScroll();
		removeClass(document.body, 'on-minors');
		removeClass(nav, 'change-color');
	}

	if (nextIndex !== 1 && navOpened === true) {
		updateNav.close(300);
		navOpened = false;

		updateMajorProjectsRoll.show(300);
	}

	if (index === 1 && direction === 'down') {
		updateNav.onProjects();
	}

	if (nextIndex === 1) {
		updateNav.onHome();
		navOpened = false;
		parallax.enable();
		removeClass(document.body, 'on-minors');
		removeClass(document.body, 'on-majors');

	} else if (nextIndex === 2) {
		updateMajorProjectsRoll.onFirst();
		addClass(document.querySelector('.major-understudy1'), 'active');
		addClass(document.querySelector('.major-project1'), 'choosed');
		removeClass(document.querySelector('.major-understudy2'), 'active');
		removeClass(document.querySelector('.major-project2'), 'choosed');
		removeClass(document.querySelector('.major-understudy3'), 'active');
		removeClass(document.querySelector('.major-project3'), 'choosed');
	} else if (nextIndex === 3) {
		updateMajorProjectsRoll.onSecond();
		addClass(document.querySelector('.major-understudy2'), 'active');
		addClass(document.querySelector('.major-project2'), 'choosed');
		removeClass(document.querySelector('.major-understudy1'), 'active');
		removeClass(document.querySelector('.major-project1'), 'choosed');
		removeClass(document.querySelector('.major-understudy3'), 'active');
		removeClass(document.querySelector('.major-project3'), 'choosed');
	} else if (nextIndex === 4) {
		updateMajorProjectsRoll.onThird();
		addClass(document.querySelector('.major-understudy3'), 'active');
		addClass(document.querySelector('.major-project3'), 'choosed');
		removeClass(document.querySelector('.major-understudy1'), 'active');
		removeClass(document.querySelector('.major-project1'), 'choosed');
		removeClass(document.querySelector('.major-understudy2'), 'active');
		removeClass(document.querySelector('.major-project2'), 'choosed');
	} else if (nextIndex === 5) {
		addClass(nav, 'change-color');
		removeClass(document.body, 'on-majors');
	}
}