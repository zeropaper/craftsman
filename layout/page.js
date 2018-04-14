'use strict';

(function (Drupal) {
  var _document = document,
      body = _document.body;

  var selector = '.layout-container a[href^="/"]:not(.js-page-transition):not(.js-no-page-transition)';

  var fadePage = function fadePage(destination) {
    return function (event) {
      event.preventDefault();
      body.addEventListener('animationend', function () {
        window.location.href = destination;
      });
      body.classList.add('page-transition');
    };
  };

  Drupal.behaviors.pageTransition = {
    attach: function attach(context) {
      var links = body.querySelectorAll(selector);

      links.forEach(function (link) {
        link.classList.add('js-page-transition');
        link.addEventListener('click', fadePage(link.href));
      });
    }
  };
})(window.Drupal);
//# sourceMappingURL=page.js.map
