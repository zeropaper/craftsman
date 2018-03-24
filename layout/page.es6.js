((Drupal) => {
  Drupal.behaviors.page = {
    attach: (context, settings) => {
      // eslint-disable-next-line no-console
      console.log('page behavior attach', context, settings);
    },
  };
})(window.Drupal);
