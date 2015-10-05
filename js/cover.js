document.addEventListener('DOMContentLoaded', function(event) {
	var parallaxCover = document.getElementById('parallax-cover');

	parallax = new Parallax(parallaxCover, {
		calibrateX: mobileDevice,
		calibrateY: mobileDevice,
		invertX: !mobileDevice,
		invertY: !mobileDevice,
		scalarX: mobileDevice ? 10 : 3,
		scalarY: mobileDevice ? 10 : 3,
	});
}, false);