updateMajorProjectsRoll = {
	onFirst: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags1, .major-project1 time'), currentDuration);

		changeHeight($('.majors .project-details'), currentDuration, 0);

		rotateAndHideBottom($('.tags2, .tags3'), 30, currentDuration);
		rotateAndHideBottom($('.major-project2 time, .major-project3 time'), 90, currentDuration);

		translateAndShow($('.major-project1 h2, .major-project1 .lead'), currentDuration);
		translateAndHideBottom($('.major-project2 h2, .major-project2 .lead, .major-project3 h2, .major-project3 .lead'), currentDuration);
	},

	onSecond: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags2, .major-project2 time'), currentDuration);

		changeHeight($('.majors .project-details'), currentDuration, 1);

		rotateAndHideTop($('.tags1'), 30, currentDuration);
		rotateAndHideBottom($('.tags3'), 30, currentDuration);

		rotateAndHideTop($('.major-project1 time'), 90, currentDuration);
		rotateAndHideBottom($('.major-project3 time'), 90, currentDuration);

		translateAndShow($('.major-project2 h2, .major-project2 .lead'), currentDuration);
		translateAndHideTop($('.major-project1 h2, .major-project1 .lead'), currentDuration);
		translateAndHideBottom($('.major-project3 h2, .major-project3 .lead'), currentDuration);
	},

	onThird: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags3, .major-project3 time, .major-project3 time small'), currentDuration);

		changeHeight($('.majors .project-details'), currentDuration, 2);

		rotateAndHideTop($('.tags1, .tags2'), 30, currentDuration);
		rotateAndHideTop($('.major-project1 time, .major-project2 time'), 90, currentDuration);

		translateAndShow($('.major-project3 h2, .major-project3 .lead'), currentDuration);
		translateAndHideTop($('.major-project1 h2, .major-project1 .lead, .major-project2 h2, .major-project2 .lead'), currentDuration);
	},

	show: function(overrideDuration, overrideDelay) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		if (overrideDuration === 0) {
			$.Velocity.hook($('.majors .project-details, .majors .tags, .minor-projects-container'), 'opacity', 1);
			$.Velocity.hook($('.majors .project-details, .majors .tags, .minor-projects-container'), 'display', 'block');
		} else {
			currentDelay = overrideDelay ? overrideDelay : 250;
			showProjects($('.majors .project-details, .majors .tags, .minor-projects-container'), currentDuration, currentDelay);
		}
	},

	hide: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		hideProjects($('.majors .project-details, .majors .tags, .minor-projects-container'), currentDuration);
	}
};

function rotateAndShow(ele, d) {
	if ($.Velocity.hook(ele, 'rotateX') !== 0) {
		ele.velocity({
			rotateX: 0,
			opacity: 1
		}, {
			duration: d,
			visibility: 'visible'
		});
	}
}

function rotateAndHideTop(ele, angle, d) {
	if ($.Velocity.hook(ele, 'rotateX') !== -angle) {
		ele.velocity({
			rotateX: -angle,
			opacity: 0
		}, {
			duration: d,
			visibility: 'hidden'
		});
	}
}

function rotateAndHideBottom(ele, angle, d) {
	if ($.Velocity.hook(ele, 'rotateX') !== angle) {
		ele.velocity({
			rotateX: angle,
			opacity: 0
		}, {
			duration: d,
			visibility: 'hidden'
		});
	}
}

function translateAndShow(ele, d) {
	if ($.Velocity.hook(ele, 'translateY') !== 0) {
		ele.velocity({
			translateY: 0,
			opacity: 1
		}, {
			duration: d/2,
			visibility: 'visible'
		});
	}
}

function translateAndHideTop(ele, d) {
	if ($.Velocity.hook(ele, 'translateY') !== -20) {
		ele.velocity({
			translateY: -20,
			opacity: 0
		}, {
			duration: d/2,
			visibility: 'hidden'
		});
	}
}

function translateAndHideBottom(ele, d) {
	if ($.Velocity.hook(ele, 'translateY') !== 20) {
		ele.velocity({
			translateY: 20,
			opacity: 0
		}, {
			duration: d/2,
			visibility: 'hidden'
		});
	}
}

function showProjects(ele, duration, delay) {
	if ($.Velocity.hook(ele, 'opacity') !== 1) {
		ele.velocity({
			opacity: 1
		}, {
			duration: duration,
			delay: delay,
			queue: false,
			visibility: 'visible'
		});
	}
}

function hideProjects(ele, d) {
	if ($.Velocity.hook(ele, 'opacity') !== 0) {
		ele.velocity({
			opacity: 0
		}, {
			duration: d,
			queue: false,
			visibility: 'hidden'
		});
	}
}

function changeHeight(ele, d, index) {
	var majorProjectClass = '.major-project' + (index + 1) + ' ';

	ele.velocity({
		height: getProjectDetailsHeight(index, 'max')
	}, {
		queue: false,
		begin: function() {
			$.Velocity.hook($(majorProjectClass + '.project-details'), 'scaleY', '0.999999999');
			$.Velocity.hook($(majorProjectClass + '.project-details .read-more'), 'position', 'absolute');
			$.Velocity.hook($(majorProjectClass + '.project-details .read-more'), 'bottom', '25px');
		},
		complete: function() {
			majorProjects[index].querySelector('.project-details').removeAttribute('style');
			majorProjects[index].querySelector('.project-details .read-more').removeAttribute('style');
		},
		duration: d/2
	});
}