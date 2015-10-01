<?php
// page.php
if (isset($_GET['_escaped_fragment_'])) {
    switch ($_GET['_escaped_fragment_']) {
        case 'about':
            // display about page
            break;
        case 'contact':
            // display contact page
            break;
        case 'home':
        default:
            // display home page
            break;
    }
}
?>

<!-- Code taken from : http://zinoui.com/blog/crawlable-ajax-applications -->