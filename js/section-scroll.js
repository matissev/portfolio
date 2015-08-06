var fixThreshold = 1;
numberOfItems = $('#fullpage .section').length;

thresholdDelay = null;
timerActive = false;
hasScrollDown = false;

function listenScroll(){
    $.fn.fullpage.setAllowScrolling(false);
    minorProjects.addEventListener("scroll", scrollHandler);

    /* If the user don't scroll down, allow him to scroll back on previous section */
    if (hasScrollDown === false) {
        detectScrollOnTop();
    }
}

function scrollHandler(){
    /* If the user scrolls down, reset the timer */
    if (minorProjects.scrollTop > fixThreshold && timerActive === false) {
    	clearTimeout(thresholdDelay);
        hasScrollDown = true;
        minorProjects.removeEventListener("scroll", scrollHandler);
	}

    /* If the user scrolls back to the top, launch the timer */
    if(minorProjects.scrollTop < fixThreshold && hasScrollDown === true) {
        timerActive = true;
        thresholdDelay = setTimeout(detectScrollOnTop, 600);
    }
}

function detectScrollOnTop() {
    /* Bind a listener on mousewheel direction. */
    minorProjects.addEventListener('mousewheel', function(event){
        /* When the function launches, set the timer's status to off */
        timerActive = false;

        /* If it goes up when the user is on the top, go back to previous section */
        if (event.wheelDelta >= 100 && minorProjects.scrollTop < fixThreshold && timerActive === false) {
            reenableScroll();
            return;
        }
    }, false);
}



function reenableScroll() {
    $.fn.fullpage.setAllowScrolling(true);
    minorProjects.removeEventListener("scroll", scrollHandler, false);
    minorProjects.removeEventListener('mousewheel', detectScrollOnTop, false);
    clearTimeout(thresholdDelay);
    timerActive = false;
    hasScrollDown = false;
    return;
}