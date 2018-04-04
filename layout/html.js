'use strict';

(function (Drupal) {
  Drupal.behaviors.html = {
    //
    attach: function attach(context, settings) {
      // eslint-disable-next-line no-console
      console.log('W00p behavior attach', context, settings);
    }
  };
})(window.Drupal);
//# sourceMappingURL=html.js.map
