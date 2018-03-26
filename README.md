# Craftsman

A set of tools to develop awesome Drupal theme.

The goal of those tools is to generate assets which can be consumed by a Drupal site the best way possible.
The CSS and JS code aggregation is meant to be done by Drupal, minification by a module like AdvAgg.

## Features

**TODO**

## Usage

Craftsman is **not** a base theme.

**TODO**

### Structure

The tools are designed to leave a great freedom of organisation.  
If you you have a JS file with the extension `.es6.js` a file with the extension `.js` (like Drupal does for its JS).  
Similar applies to SCSS files which are converted in CSS.

You can then easily take advantage of all the Drupal built-in libraries and the dependency management, keep your code well organized according to your wishes.

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

<details>
  <summary></summary>
  
* Create 
  
</details>

## TODOs:

* Render twig templates as styleguide / prototype in way as close as Drupal does
* Generate JS documentation
* Run E2E tests

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

## Author

Valentin `zeropaper` Vago