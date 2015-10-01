/* Add class raw javascript */

function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function removeClass(element, className) {
    if (element && hasClass(element,className)) {
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)');
        element.className=element.className.replace(reg,'');
    }
}

function addClass(element, className) {
    if (element && !hasClass(element,className)) {
        element.className += '  '+ className + '  ';
    }
}


/* Browser detect */

function isSafari() {
    return /^((?!chrome).)*safari/i.test(navigator.userAgent);
}

function isChrome() {
	return window.chrome;
}

function isFirefox() {
	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}


/* Font Fix */

if (isSafari()) {
    addClass(document.body, 'safari-font-fix');
}

if (isChrome()) {
    addClass(document.body, 'chrome-font-fix');
}

if (isFirefox()) {
    addClass(document.body, 'moz-font-fix');
}