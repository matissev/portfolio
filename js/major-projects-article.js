updateMajorProjectsArticle = {
	open: function(overrideDuration) {
		$.fn.fullpage.setAllowScrolling(false);

		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
		var majorProjectClass = '.major-project' + (openedMajorProjectIndex + 1) + ' ';

		majorProjects[openedMajorProjectIndex].addEventListener("scroll", articleScrollHandler, false);

		maxProjectDetailsHeight = getProjectDetailsHeight(openedMajorProjectIndex, 'max');
		minProjectDetailsHeight = getProjectDetailsHeight(openedMajorProjectIndex, 'min');

		var leadText = majorProjects[openedMajorProjectIndex].querySelector('.lead').innerHTML;
		majorProjects[openedMajorProjectIndex].querySelector('.lead-in-article').innerHTML = leadText;

		$(majorProjectClass + 'header').velocity({
			height: '66.666%'
		}, {
			duration: currentDuration,
			easing: 'easeOutQuart',
			begin: function() {
				for (i = 0; i < majorProjects.length; i++) {
					removeClass(majorProjects[i], 'on-majors');
				}
				
				addClass(majorProjects[openedMajorProjectIndex], 'opened');
				$.Velocity.hook($(majorProjectClass + '.project-details'), 'scaleY', '0.999999999');
				$.Velocity.hook($(majorProjectClass + '.cover-image'), 'scaleY', '0.999999999');
				$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', maxProjectDetailsHeight + 'px');
			},
			complete: function() {
				majorProjects[openedMajorProjectIndex].querySelector('.project-details').removeAttribute('style');
				majorProjects[openedMajorProjectIndex].querySelector('.cover-image').removeAttribute('style');
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


		$(majorProjectClass + '.project-details .lead, ' + majorProjectClass + '.project-details .read-more').velocity({
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
			easing: 'easeOutCubic'
		});

	},

	close: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;
		var index = openedMajorProjectIndex;

		var majorProjectClass = '.major-project' + (index + 1) + ' ';
		minProjectDetailsHeight = getProjectDetailsHeight(index, 'min');
		var offsetScroll = majorProjects[index].scrollTop;


		$(majorProjectClass + 'header').velocity({
			height: '100%',
			translateY: offsetScroll
		}, {
			duration: currentDuration,
			easing: 'easeOutQuart',
			begin: function() {
				majorProjects[openedMajorProjectIndex].removeEventListener("scroll", articleScrollHandler, false);
				var majorProjectHeaderHeight = majorProjects[index].querySelector('header').offsetHeight;
				var scrolledHeight = offsetScroll - majorProjectHeaderHeight;
				if (scrolledHeight > 0)
					$.Velocity.hook($(majorProjectClass + 'header'), 'translateY', scrolledHeight + 'px');
				else
					$.Velocity.hook($(majorProjectClass + 'header'), 'translateY', '0px');

				majorProjects[index].style.pointerEvents = 'none';

				removeClass(nav, 'change-color');

				$.Velocity.hook($(majorProjectClass + '.project-details'), 'scaleY', '0.999999999');
				$.Velocity.hook($(majorProjectClass + '.cover-image'), 'scaleY', '0.999999999');
				$.Velocity.hook($(majorProjectClass + '.project-details'), 'height', minProjectDetailsHeight + 'px');
			},
			complete: function() {
				majorProjects[index].scrollTop = 0;
				majorProjects[index].querySelector('header').removeAttribute('style');
				majorProjects[index].querySelector('.project-details').removeAttribute('style');
				majorProjects[openedMajorProjectIndex].querySelector('.cover-image').removeAttribute('style');

				majorProjects[index].style.pointerEvents = '';

				removeClass(majorProjects[index], 'opened');
				for (i = 0; i < majorProjects.length; i++) {
					addClass(majorProjects[i], 'on-majors');
				}

				$.fn.fullpage.setAllowScrolling(true);
				openedMajorProjectIndex = null;
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


		$(majorProjectClass + '.project-details .lead, ' + majorProjectClass + '.project-details .read-more').velocity({
			opacity: 1
		}, {
			duration: currentDuration/2,
			easing: 'easeInCubic',
			display: 'block',
			delay: currentDuration/3
		});


		$(majorProjectClass + '.project-details').velocity({
			height: maxProjectDetailsHeight
		}, {
			duration: currentDuration/2,
			easing: 'easeOutCubic'
		});
	}
};

function getProjectDetailsHeight(index, mode) {
	var totalSize = 0;

	var innerElements = [
		majorProjects[index].querySelector('.project-details h2'),
		majorProjects[index].querySelector('.project-details time')
	];

	if (mode === 'max') {
		innerElements.push(
			majorProjects[index].querySelector('.project-details .lead'),
			majorProjects[index].querySelector('.project-details .read-more')
		);
	}

	var containerElement = majorProjects[index].querySelector('.project-details');

	for (i = 0; i < innerElements.length; i++) {
		innerElements[i].marginTop = window.getComputedStyle(innerElements[i]).getPropertyValue('margin-top');
		innerElements[i].marginTop = parseInt(innerElements[i].marginTop, 10);
		innerElements[i].marginBottom = window.getComputedStyle(innerElements[i]).getPropertyValue('margin-bottom');
		innerElements[i].marginBottom = parseInt(innerElements[i].marginBottom, 10);
		
		totalSize = totalSize + innerElements[i].offsetHeight + innerElements[i].marginTop + innerElements[i].marginBottom;	
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

function articleScrollHandler() {
	var index = openedMajorProjectIndex;
	var scrolledHeight = majorProjects[index].scrollTop;
	var navPositionTop = parseInt(window.getComputedStyle(majorProjects[index].querySelector('.project-details')).getPropertyValue('top'));
	var majorProjectHeaderHeight = majorProjects[index].querySelector('header').offsetHeight;
	var majorProjectHeight = majorProjects[index].scrollHeight;

	// Change nav button color
	if (scrolledHeight > majorProjectHeaderHeight - navPositionTop) {
		addClass(nav, 'change-color');
	} else if (scrolledHeight < majorProjectHeaderHeight - navPositionTop - 20) {
		removeClass(nav, 'change-color');
	}

	var absoluteScrolledHeight = scrolledHeight + majorProjects[index].offsetHeight;

	// Close article when the article is fully scrolled
	if (absoluteScrolledHeight === majorProjectHeight){
		// updateMajorProjectsArticle.close();
	}

}