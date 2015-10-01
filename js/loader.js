window.location.hash = "";

window.addEventListener('load', function (event) {
	window.setTimeout(function() {
		addClass(document.querySelector('.loader'), 'hide');
		window.setTimeout(function() {
			addClass(document.querySelector('.loader'), 'disapear');
		}, 500);
	}, 500);
}, false);