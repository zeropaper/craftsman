<?php

/**
 * @file
 * Contains the theme's settings form.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function craftsman_form_system_theme_settings_alter(&$form, FormStateInterface &$form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  // Create the form using Forms API: http://api.drupal.org/api/7
  $form['craftsman'] = [
    '#type'  => 'fieldset',
    '#title' => t('craftsman settings'),
  ];
  $form['craftsman']['debug'] = [
    '#type'          => 'checkbox',
    '#title'         => t('Debug'),
    '#default_value' => theme_get_setting('debug'),
    '#description'   => t("Applies the `.debug` CSS class to the `body`."),
  ];

  $form['craftsman']['browsersync_port'] = [
    '#type'          => 'textfield',
    '#title'         => t('BrowserSync port'),
    // '#placeholder'   => 3000,
    '#default_value' => theme_get_setting('browsersync_port'),
    '#description'   => t("BrowserSync is disabled when not provided.")
  ];

  $form['craftsman']['browsersync_host'] = [
    '#type'          => 'textfield',
    '#title'         => t('BrowserSync host'),
    // '#placeholder'   => 'localhost',
    '#default_value' => theme_get_setting('browsersync_host'),
    '#description'   => t("Will use `location.hostname` if empty.")
  ];
  //

  /* -- Delete this line if you want to remove this base theme setting.
  // We don't need breadcrumbs to be configurable on this site.
  unset($form['breadcrumb']);
  // */

  // We are editing the $form in place, so we don't need to return anything.
}
