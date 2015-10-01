hasScrollDown = false;
wheelState = 'hot';
previousDelta = null;


function listenScroll(){
    $.fn.fullpage.setAllowScrolling(false);
    minorProjects.addEventListener('scroll', scrollHandler);
    minorProjects.addEventListener('mousewheel', detectScrollOnTop, false);
    minorProjects.addEventListener('wheel', detectScrollOnTop, false);
}


function scrollHandler(){
    /* If the user scrolls down, reset the timer */
    if (minorProjects.scrollTop > 4) {
        hasScrollDown = true;
        wheelState = 'hot';
        previousDelta = null;
        minorProjects.removeEventListener('mousewheel', detectScrollOnTop, false);
        minorProjects.removeEventListener('wheel', detectScrollOnTop, false);
	}

    /* If the user scrolls back to the top, launch the timer */
    if (minorProjects.scrollTop < 4 && hasScrollDown) {
        minorProjects.addEventListener('mousewheel', detectScrollOnTop, false);
        minorProjects.addEventListener('wheel', detectScrollOnTop, false);
    }
}


function detectScrollOnTop(e) {
    var force = normalizeWheel(e);

    if (10 > -force.pixelY) {
      wheelState = 'cooled';
    }

    if (previousDelta + 50 < -force.pixelY && wheelState === 'cooled') {
      wheelState = 'heating';
    }

    previousDelta = force.pixelY;

    /* If it goes up when the user is on the top, go back to previous section */
    if (-force.spinY > 0 && wheelState === 'heating') {
        reenableScroll();
        minorProjects.removeEventListener('mousewheel', detectScrollOnTop, false);
        minorProjects.removeEventListener('wheel', detectScrollOnTop, false);
        return;
    }
}


function reenableScroll() {
    $.fn.fullpage.setAllowScrolling(true);
    minorProjects.removeEventListener('scroll', scrollHandler, false);
    hasScrollDown = false;
    return;
}


// ====== A piece of code taken from some guys at Facebook

// Reasonable defaults
var PIXEL_STEP  = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function normalizeWheel(/*object*/ event) /*object*/ {
  var sX = 0, sY = 0,       // spinX, spinY
      pX = 0, pY = 0;       // pixelX, pixelY

  // Legacy
  if ('detail'      in event) { sY = event.detail; }
  if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
  if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
  if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in event) { pY = event.deltaY; }
  if ('deltaX' in event) { pX = event.deltaX; }

  if ((pX || pY) && event.deltaMode) {
    if (event.deltaMode == 1) {          // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    } else {                             // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  return { spinX  : sX,
           spinY  : sY,
           pixelX : pX,
           pixelY : pY };
}