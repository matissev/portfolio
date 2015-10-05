window.location.hash = '';

document.addEventListener('DOMContentLoaded', function(event) {
	document.querySelector('.loader').style.display = 'block';
});

window.addEventListener('load', function (event) {
	window.setTimeout(function() {
		addClass(document.querySelector('.loader'), 'hide');
		window.setTimeout(function() {
			addClass(document.querySelector('.loader'), 'disapear');
		}, 500);
	}, 500);
}, false);