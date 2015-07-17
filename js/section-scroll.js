var fixThreshold = 1;
numberOfItems = $('#fullpage .section').length;

thresholdDelay = null;
timerActive = false;
hasScrollDown = false;

function listenScroll(){
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setMouseWheelScrolling(false);
    $('.others').on('scroll.fix', scrollHandler);
}

function scrollHandler(){
    /* If the user don't scroll down, allow him to scroll back on previous section */
    if (hasScrollDown === false) {
        detectScrollOnTop();
    }

    /* If the user scrolls down, reset the timer */
    if ($('.others').scrollTop() > fixThreshold && timerActive === false) {
    	clearTimeout(thresholdDelay);
    	timerActive = true;
        hasScrollDown = true;
	}

    /* If the user scrolls back to the top, launch the timer */
    if($('.others').scrollTop() < fixThreshold && hasScrollDown === true) {
        thresholdDelay = setTimeout(detectScrollOnTop, 400);
    }
}

function detectScrollOnTop() {
    /* When the function launches, set the timer's status to off */
    timerActive = false;

    /* Bind a listener on mousewheel direction. */
    window.addEventListener('mousewheel', function(e){
        /* If it goes up when the user is on the top, go back to previous section */
        if (e.wheelDelta >= 0 && $('.others').scrollTop() < fixThreshold && timerActive === false) {
            reenableScroll();
            return;
        }
    })
}

function reenableScroll() {
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setMouseWheelScrolling(true);
    $(window).off('scroll.fix');
    clearTimeout(thresholdDelay);
    timerActive = false;
    return;
}