# Craftsman

A set of tools to develop awesome Drupal 8 theme.

The goal of those tools is to generate assets which can be consumed by a Drupal site the best way possible.
The CSS and JS code aggregation is meant to be done by Drupal, minification by a module like AdvAgg.

## Why?

Of course you could build base your theme on a other one and/or use a fancy framework
which produces a monolythic `app.js` and `styles.css`. You could.  

But!

Drupal has already (almost) everything ready for the front-end of a fancy website.   
You doubt?  
Just have a look at the Drupal default admin theme and the way scripts and stylesheets handling is done.
The libraries available with the Drupal core allow you to do everything. Backbone, jQuery, jQuery UI, ...
Drupal handles the loading, configuration and initialization of widgets very well.

## Usage

Craftsman is **not** a base theme.

To start a project with Craftsman:
1. clone the repository (or better a fork) in one of the themes folders of Drupal
1. install Grunt CLI if needed (`npm install -g grunt-cli`)
1. install the dependencies with `npm install`
1. install the theme in Drupal
1. then `npm run auto-build` to start working

### Structure

The tools are designed to leave a great freedom of organisation.  
If you you have a JS file with the extension `.es6.js` a file with the extension `.js` will be created (like Drupal does for its JS).  
Similar applies to SCSS files which are converted in CSS.

You can then easily take advantage of all the Drupal built-in libraries and the dependency management, keep your code well organized according to your wishes.

### Scripts

You can use `npm` to run the following tasks:
* `npm run build` to compile all assets
* `npm run auto-build` to compile assets when they change.  
  The information about 

### Examples

<details>
  <summary>View page styling</summary>

* Create a folder called `views`.
* Create a `views/view-VIEW_ID.scss` file with some styles with something like:
  ```scss
  .view-VIEW_ID {
    .view-content {
      display: flex;
      flex-wrap: wrap;
    }
    .views-row {
      width: 25%;
    }
  }
  ```
* Add a `view-VIEW_ID` in the `craftsman.libraries.yml` as follow:
  ```yml
  view-VIEW_ID:
    css:
      theme:
        views/view-VIEW_ID.css: {}
  ```
* In the `craftsman.theme` file, add a `craftsman_preprocess_views_view` hook similar to:
  ```php
  function craftsman_preprocess_views_view(&$variables) {
    if ($variables['id'] == 'VIEW_ID') {
      $variables['#attached']['library'][] = 'craftsman/view-VIEW_ID';
    }
  }
  ```
* Rebuild the Drupal cache.

</details>

## Roadmap:

* [ ] #1 Render twig templates as styleguide / prototype in way as close as Drupal does
* [ ] #2 Generate JS documentation
* [ ] #3 Run E2E tests
  * [ ] on Drupal site
  * [ ] on prototype

## Build and deployment strategies

By default, Craftsman expect an automated build for deployment, if you want to keep the compiled assets in your Git project, comment the 3 first following lines of the `.gitignore`:
```
*/*.map
*/*.css
*/*.js
# Keep the following line as-is.
*/*.precss
!Gruntfile.js
!*/*.es6.js
project-docs
```

## Further reading

* Twig
  * https://www.drupal.org/docs/8/theming/twig/discovering-and-inspecting-variables-in-twig-templates
  * https://www.drupal.org/docs/8/theming/twig/functions-in-twig-templates
* JS
  * https://www.drupal.org/docs/8/api/javascript-api/javascript-api-overview
* Breakpoints
  * https://www.drupal.org/docs/8/theming-drupal-8/working-with-breakpoints-in-drupal-8
  * https://www.prometsource.com/blog/how-set-responsive-images-drupal-8
* Templates suggestions  
  https://www.dannyenglander.com/blog/drupal-8-theming-tutorial-how-craft-custom-theme-hook-suggestions-and-templates
* The Drupal JavaScript (it's less than 600 lines)  
  https://github.com/drupal/drupal/blob/8.5.x/core/misc/drupal.es6.js
* The available libraries  
  https://github.com/drupal/drupal/blob/8.5.x/core/core.libraries.yml 

## Author

Valentin `zeropaper` Vago

## License

[MIT](./LICENSE)