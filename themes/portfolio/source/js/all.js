+function ($) {
  'use strict';

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
  
  $(window).on('load pageshow', function() {
    // colorize per project
    var color = $(document.getElementById('projectColor')).html();
    if (color) {
      $(document).find('.colorize').each(function () {
        $(this).css('color', color);
      });
    }
  });

}(jQuery);
