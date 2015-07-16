
updateProjects = {
	onFirst: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags1, .project1 time'), currentDuration);

		rotateAndHideBottom($('.tags2, .tags3'), 30, currentDuration);
		rotateAndHideBottom($('.project2 time, .project3 time'), 90, currentDuration);

		translateAndShow($('.project1 h2, .project1 .lead'), currentDuration);
		translateAndHideBottom($('.project2 h2, .project2 .lead, .project3 h2, .project3 .lead'), currentDuration);
	},

	onSecond: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags2, .project2 time'), currentDuration);

		rotateAndHideTop($('.tags1'), 30, currentDuration);
		rotateAndHideBottom($('.tags3'), 30, currentDuration);

		rotateAndHideTop($('.project1 time'), 90, currentDuration);
		rotateAndHideBottom($('.project3 time'), 90, currentDuration);

		translateAndShow($('.project2 h2, .project2 .lead'), currentDuration);
		translateAndHideTop($('.project1 h2, .project1 .lead'), currentDuration);
		translateAndHideBottom($('.project3 h2, .project3 .lead'), currentDuration);
	},

	onThird: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		rotateAndShow($('.tags3, .project3 time, .project3 time small'), currentDuration);

		rotateAndHideTop($('.tags1, .tags2'), 30, currentDuration);
		rotateAndHideTop($('.project1 time, .project2 time'), 90, currentDuration);

		translateAndShow($('.project3 h2, .project3 .lead'), currentDuration);
		translateAndHideTop($('.project1 h2, .project1 .lead, .project2 h2, .project2 .lead'), currentDuration);
	},

	show: function(overrideDuration, overrideDelay) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		if (overrideDuration === 0) {
			$.Velocity.hook($('.projects .project-details, .projects .tags, .other-projects-container'), "opacity", 1);
			$.Velocity.hook($('.projects .project-details, .projects .tags, .other-projects-container'), "display", "block");
		} else {
			currentDelay = overrideDelay ? overrideDelay : 250;
			showProjects($('.projects .project-details, .projects .tags, .other-projects-container'), currentDuration, currentDelay);
		}
	},

	hide: function(overrideDuration) {
		currentDuration = overrideDuration ? overrideDuration : slideTransitionDuration;

		hideProjects($('.projects .project-details, .projects .tags, .other-projects-container'), currentDuration);
	}
};

function rotateAndShow(ele, d) {
	if ($.Velocity.hook(ele, "rotateX") !== 0) {
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
	if ($.Velocity.hook(ele, "rotateX") !== -angle) {
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
	if ($.Velocity.hook(ele, "rotateX") !== angle) {
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
	if ($.Velocity.hook(ele, "translateY") !== 0) {
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
	if ($.Velocity.hook(ele, "translateY") !== -20) {
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
	if ($.Velocity.hook(ele, "translateY") !== 20) {
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
	if ($.Velocity.hook(ele, "opacity") !== 1) {
		ele.velocity({
			opacity: 1
		}, {
			duration: duration,
			delay: delay,
			display: 'block'
		});
	}
}

function hideProjects(ele, d) {
	if ($.Velocity.hook(ele, "opacity") !== 0) {
		ele.velocity({
			opacity: 0
		}, {
			duration: d,
			display: 'none'
		});
	}
}