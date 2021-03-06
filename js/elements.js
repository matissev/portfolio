/* --------------------- DOM SELECTORS */

body = document.querySelector('body');

nav = document.querySelector('.nav');
navLinks = document.querySelectorAll('.nav-links .link');
navToggleButton = document.querySelector('.nav-toggle-button');

minorProjects = document.querySelector('.minors');

majorProjects = document.querySelectorAll('.majors');
majorProjectButton = document.querySelectorAll('.majors .read-more');
tags = document.querySelectorAll('.majors .tags');

aboutPage = document.querySelector('section.about');
contactForm = document.querySelector('section.about .contact-form');
aboutOpenButton = document.querySelector('.about-open-button');
aboutCloseButton = document.querySelector('.about-close-button');
hiddenElementsOnAbout = document.querySelectorAll('section.home header, nav, .majors .project-details, .majors .tags');