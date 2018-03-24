# Craftsman

A set of tools to develop awesome Drupal theme.

The goal of those tools is to generate assets which can be consumed by a Drupal site the best way possible.
The CSS and JS code aggregation is meant to be done by Drupal, minification by a module like AdvAgg.

## Structure

The tools are designed to leave a great freedom of organisation.  
If you you have a JS file with the extension `.es6.js` a file with the extension `.js` (like Drupal does for its JS).  
Similar applies to SCSS files which are converted in CSS.

You can then easily take advantage of all the Drupal built-in libraries and the dependency management, keep your code well organized according to your wishes.

### Prototyping and styleguide

Are the next 2 tasks of this project.

## Build and deployment strategies

To delegate the build for deployment add the following lines to the `.gitignore`:
```
*/*.map
*/*.css
*/*.js
!*/*.es6.js
```

