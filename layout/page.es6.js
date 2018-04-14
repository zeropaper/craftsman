((Drupal) => {
  const { body } = document;
  const selector = '.layout-container a[href^="/"]:not(.js-page-transition):not(.js-no-page-transition)';

  const fadePage = destination => (event) => {
    event.preventDefault();
    body.addEventListener('animationend', () => {
      window.location.href = destination;
    });
    body.classList.add('page-transition');
  };

  Drupal.behaviors.pageTransition = {
    attach: (context) => {
      const links = body.querySelectorAll(selector);

      links.forEach((link) => {
        link.classList.add('js-page-transition');
        link.addEventListener('click', fadePage(link.href));
      });
    },
  };
})(window.Drupal);
