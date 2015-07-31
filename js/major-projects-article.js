updateMajorProjectsArticle = {
	open: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
		var majorProjectClass = '.major-project' + (openedMajorProjectIndex + 1) + ' ';

		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setMouseWheelScrolling(false);

		maxProjectDetailsHeight = majorProjects[openedMajorProjectIndex].querySelector('.project-details').offsetHeight;
		minProjectDetailsHeight = getProjectDetailsHeight(openedMajorProjectIndex);

		$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', maxProjectDetailsHeight + 'px');


		$(majorProjectClass + '.cover-image').velocity({
			height: '66.666%'
		}, {
			duration: currentDuration,
			easing: 'easeOutQuart',
			begin: function() {
				for (i = 0; i < majorProjects.length; i++) {
					removeClass(majorProjects[i], 'on-majors');
				}
			}
		});


		$('nav .nav-toggle-button').velocity({
			rotateZ: '90deg',
			translateX: '6px',
			translateY: '6px'
		}, {
			duration: currentDuration,
			easing: 'easeOutCirc'
		});


		$(majorProjectClass + '.lead, ' + majorProjectClass + '.read-more').velocity({
			opacity: 0
		}, {
			duration: currentDuration/2,
			easing: 'easeInCubic',
			display: 'none'
		});


		$(majorProjectClass + '.project-details').velocity({
			height: minProjectDetailsHeight
		}, {
			duration: currentDuration/2,
			delay: currentDuration/3,
			easing: 'easeOutCubic',
			complete: function() {
				$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', 'auto');
			}
		});

	},

	close: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
		var majorProjectClass = '.major-project' + (openedMajorProjectIndex + 1) + ' ';

		$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', minProjectDetailsHeight + 'px');

		$(majorProjectClass + '.cover-image').velocity({
			height: '100%'
		}, {
			duration: currentDuration,
			easing: 'easeOutQuart',
			complete: function() {
				for (i = 0; i < majorProjects.length; i++) {
					addClass(majorProjects[i], 'on-majors');
				}
			}
		});


		$('nav .nav-toggle-button').velocity({
			rotateZ: '0deg',
			translateX: '0px',
			translateY: '0px'
		}, {
			duration: currentDuration,
			easing: 'easeOutCirc'
		});


		$(majorProjectClass + '.lead, ' + majorProjectClass + '.read-more').velocity({
			opacity: 1
		}, {
			duration: currentDuration/2,
			easing: 'easeInCubic',
			display: 'block',
			delay: currentDuration/2
		});


		$(majorProjectClass + '.project-details').velocity({
			height: maxProjectDetailsHeight
		}, {
			duration: currentDuration/2,
			delay: currentDuration/4,
			easing: 'easeOutCubic',
			complete: function() {
				$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', 'auto');
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setMouseWheelScrolling(true);
			}
		});
	}
};

function getProjectDetailsHeight(index) {
	var totalSize = 0;

	var innerElements = [
		majorProjects[index].querySelector('.project-details h2'),
		majorProjects[index].querySelector('.project-details time')
	];

	var containerElement = majorProjects[index].querySelector('.project-details');

	for (i = 0; i < innerElements.length; i++) {
		innerElements[i].marginTop = window.getComputedStyle(innerElements[i]).getPropertyValue('margin-top');
		innerElements[i].marginTop = parseInt(innerElements[i].marginTop, 10);
		innerElements[i].marginBottom = window.getComputedStyle(innerElements[i]).getPropertyValue('margin-bottom');
		innerElements[i].marginBottom = parseInt(innerElements[i].marginBottom, 10);
		
		var totalSize = totalSize + innerElements[i].offsetHeight + innerElements[i].marginTop + innerElements[i].marginBottom;	
	}

	containerElement.borderTop = window.getComputedStyle(containerElement).getPropertyValue('border-top');
	containerElement.borderTop = parseInt(containerElement.borderTop, 10);
	containerElement.borderBottom = window.getComputedStyle(containerElement).getPropertyValue('border-bottom');
	containerElement.borderBottom = parseInt(containerElement.borderBottom, 10);

	containerElement.paddingTop = window.getComputedStyle(containerElement).getPropertyValue('padding-top');
	containerElement.paddingTop = parseInt(containerElement.paddingTop, 10);
	containerElement.paddingBottom = window.getComputedStyle(containerElement).getPropertyValue('padding-bottom');
	containerElement.paddingBottom = parseInt(containerElement.paddingBottom, 10);

	totalSize = totalSize + containerElement.paddingTop + containerElement.paddingBottom + containerElement.borderTop + containerElement.borderBottom;

	return totalSize;
}