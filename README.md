# portfolio
Git repository of my portfolio's source code

## Initialization

Copy/Past this in your shell

	bower install

	npm install

It uses gulp to build up the dist folder

	gulp

---

### Todo

- PHP mail without redirection (with AJAX)
- Share buttons
- Responsive
- Next Article Button
- Page switch buttons
- CSS3 translates
- Replace links by buttons
- Audio Player
- Video Player
- Ajax article

### Done

- ~~Fluid height article roll~~
- ~~UI Database (json)~~
- ~~Tags in database and strong~~
- ~~Loader~~
- ~~Cover image scale 1.000001 on height transition (or 0.999999)~~


For the fluid article Roll :
- Add begin and complete functions on changeHeight to put back the height to auto.
- Add a velocity function with begin and complete functions on .read-more to put it in position:absolute and then back in the flow (after the animation).