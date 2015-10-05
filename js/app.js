/* --------------------- FULLPAGE INITIALIZE */

document.addEventListener('DOMContentLoaded', function(event) {
	slideTransitionDuration = 600;

	mobileDevice = isMobile.any;
	var fixedElements = '.nav';


	if (mobileDevice) {
		addClass(document.body, 'mobile');
		removeClass(aboutPage, 'hidden');

	} else {
		fixedElements += ', .about';
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
	}

	$('#fullpage').fullpage({
		verticalCentered: false,
		loopTop: false,
		loopBottom: false,
		scrollBar: false,
		fitToSection: false,
		css3: true,
		recordHistory: false,
		autoScrolling: !mobileDevice,
		scrollingSpeed: slideTransitionDuration,
		fixedElements: fixedElements,
		anchors: ['home', 'project1', 'project2', 'project3', 'other'],
		afterLoad: function(anchorLink, index){
			afterSectionLoad(anchorLink, index);
		},
		onLeave: function(index, nextIndex, direction){
			onSectionLeave(index, nextIndex, direction);
		}
	});
}, false);