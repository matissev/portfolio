
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
	}
}

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
			duration: d,
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
			duration: d,
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
			duration: d,
			visibility: 'hidden'
		});
	}
}