document.addEventListener("DOMContentLoaded", function(event) {
	window.setTimeout(function() {
		addClass(document.querySelector('.loader'), 'hide');
		window.setTimeout(function() {
			addClass(document.querySelector('.loader'), 'disapear');
		}, 500);
	}, 3000);
});