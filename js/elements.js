/* --------------------- DOM SELECTORS */

body = document.querySelector('body');

nav = document.querySelector('.nav');
worklink = document.querySelector('.worklink');
navToggleButton = document.querySelector('.nav-toggle-button');

aboutPage = document.querySelector('section.about');
aboutOpenButton = document.querySelector('.about-open-button');
aboutCloseButton = document.querySelector('.about-close-button');
hiddenElementsOnAbout = document.querySelectorAll('section.home header, nav, .minor-projects-container, .majors .project-details, .majors .tags');

majorProjects = document.querySelectorAll('.majors');
majorProjectButton = document.querySelectorAll('.majors .read-more');
tags = document.querySelectorAll('.majors .tags');