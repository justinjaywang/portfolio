+function ($) {
  'use strict';

  // figure captions
  $('.project-content').each(function (i, projectContent) {
    $(projectContent).find('img').each(function () {
      // (1) wrap imgs in a figure
      var img = this,
        $img = $(this),
        $imgWrap = $img.parent();
      if ($imgWrap.is('p')) {
        $imgWrap.find('br').remove(); // remove extra <br>
        $img.unwrap(); // remove <p> wrap
      }
      $img.wrap('<figure class="project-figure"></figure>');
      // (2) append figcaption
      var alt = img.alt,
        $figure = $img.parent();
      if (alt) {
        $figure.append('<figcaption class="project-figure-caption">' + alt + '</figcaption>');
      }
      // (3) assign proper CSS class based on image type
      if ($img.hasClass('wide')) { // wide image type
        $img.parent().addClass('project-figure--wide');
      } else if ($img.hasClass('full')) {
        $img.parent().addClass('project-figure--full');
      } else if ($img.hasClass('left')) { // left-floated image type
        $img.parent().addClass('project-figure--left');
        $img.parent().wrap('<div class="container--narrow"></div>');
      } else { // default image type
        $img.parent().addClass('project-figure--default');
      }
    });
  });

  // navigation
  // : variables
  var body = $('body'),
    projectLink = $('.projectCard'),
    backLink = $('.backNav');
  var arriveDelay = 0,
    departDelay = 0;

  // : functions
  var navigate = function(href) {
    setTimeout(function() {
      window.location.href = href;
    }, departDelay);
  };
  var navigateBack = function() {
    setTimeout(function() {
      history.back();
    }, departDelay);
  };

  // : handlers
  projectLink.click(function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    if (href) navigate(href);
    return false;
  });
  backLink.click(function(e) {
    e.preventDefault();
    var shouldGoBack = (history.length > 1) && (document.referrer.indexOf(window.location.origin) != -1);
    if (shouldGoBack) {
      navigateBack();
    } else {
      var href = $(this).attr('href');
      if (href) navigate(href);
    }
    return false;
  });

}(jQuery);
