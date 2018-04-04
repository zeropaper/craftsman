'use strict';

(function (Drupal) {
  Drupal.behaviors.page = {
    attach: function attach(context, settings) {
      // eslint-disable-next-line no-console
      console.log('page behavior attach', context, settings);
    }
  };
})(window.Drupal);
//# sourceMappingURL=page.js.map
