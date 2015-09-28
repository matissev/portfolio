window.addEventListener('load', function load(event) {
	window.setTimeout(function() {
		addClass(document.querySelector('.loader'), 'hide');
		window.setTimeout(function() {
			addClass(document.querySelector('.loader'), 'disapear');
		}, 500);
	}, 3000);
}, false);