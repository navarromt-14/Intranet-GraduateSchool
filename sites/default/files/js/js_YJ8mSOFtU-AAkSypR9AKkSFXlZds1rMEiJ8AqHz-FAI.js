/**
 * @file
 * Javascript behaviors for time integration.
 */

(function ($, Drupal) {

  'use strict';

  // @see https://github.com/jonthornton/jquery-timepicker#options
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.timePicker = Drupal.webform.timePicker || {};
  Drupal.webform.timePicker.options = Drupal.webform.timePicker.options || {};

  /**
   * Attach timepicker fallback on time elements.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior to time elements.
   */
  Drupal.behaviors.webformTime = {
    attach: function (context, settings) {
      var $context = $(context);
      // Skip if time inputs are supported by the browser.
      if (Modernizr.inputtypes.time === true) {
        return;
      }
      $context.find('input[type="time"]').once('timePicker').each(function () {
        var $input = $(this);

        var options = {};
        if ($input.data('webformTimeFormat')) {
          options.timeFormat = $input.data('webformTimeFormat');
        }
        if ($input.attr('min')) {
          options.minTime = $input.attr('min');
        }
        if ($input.attr('max')) {
          options.maxTime = $input.attr('max');
        }

        // HTML5 time element steps is in seconds but for the timepicker
        // fallback it needs to be in minutes.
        // Note: The 'datetime' element uses the #date_increment which defaults
        // to 1 (second).
        // @see \Drupal\Core\Datetime\Element\Datetime::processDatetime
        // Only use step if it is greater than 60 seconds.
        if ($input.attr('step') && ($input.attr('step') > 60)) {
          options.step = Math.round($input.attr('step') / 60);
        }
        else {
          options.step = 1;
        }

        options = $.extend(options, Drupal.webform.timePicker.options);

        $input.timepicker(options);
      });
    }
  }

})(jQuery, Drupal);
;