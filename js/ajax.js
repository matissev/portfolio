function load(url, callback) {
	var xhr;
	xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.onreadystatechange = ensureReadiness;
	
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
		
		if(xhr.status !== 200) {
			return;
		}

		// all is well	
		if(xhr.readyState === 4) {
			callback(xhr);
		}
	}

	xhr.open('GET', url, true);
	xhr.send('');
}

// Our simplified "load" function accepts a URL and CALLBACK parameter.
window.addEventListener('load', function (event) {
	function injectMajor(url, index) {
		load(url, function(xhr){
			var xmlDoc = document.implementation.createHTMLDocument("example");
			xmlDoc.documentElement.innerHTML = xhr.responseText;
			
			var content = xmlDoc.documentElement.querySelector('.major-content');
			majorProjects[index].insertBefore(content, majorProjects[index].querySelector('footer'));
		});
	}
	
	if (!mobileDevice) {
		for (i = 0; i < majorProjectButton.length; i++) {
			injectMajor(majorProjectButton[i].attributes.href.value, i);
		}
	}
});