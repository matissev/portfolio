# portfolio
Git repository of my portfolio's source code

## Initialization

Copy/Past this in your shell

	bower install

	npm install

It uses gulp to build up the output folder

	gulp

---

### Todo

- Responsive
- Ajax article
- Retina images via picturefill.js
- Audio Player
- Video Player
- Page switch buttons
- Share buttons

### Done

- ~~CSS3 translates~~
- ~~Next Article Button (or close?)~~
- ~~Fix bug on about open when on projects~~
- ~~PHP mail without redirection (with AJAX)~~
- ~~Font-fix bug on retina~~
- ~~Outlines not inset on imgs (set it to 1px solid)~~
- ~~Fluid height article roll~~
- ~~UI Database (json)~~
- ~~Tags in database and strong~~
- ~~Loader~~
- ~~Cover image scale 1.000001 on height transition (or 0.999999)~~
- ~~Project-details height transition bug on nav scroll~~
- ~~Tags space after dash~~


For the fluid article Roll :
- Add begin and complete functions on changeHeight to put back the height to auto.
- Add a velocity function with begin and complete functions on .read-more to put it in position:absolute and then back in the flow (after the animation).