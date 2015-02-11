+function ($) {
  'use strict';

  $('.post-content').each(function (i, postContent) {
    $(postContent).find('img').each(function () {
      // for each <img>, add captions and add classes
      var img = this,
        $img = $(this);
      // (1) wrap imgs in a figure
      var $imgWrap = $img.parent();
      if ($imgWrap.is('p')) {
        $imgWrap.find('br').remove(); // remove extra <br>
        $img.unwrap(); // remove <p> wrap
      }
      $img.wrap('<figure class="post-figure"></figure>');
      // (2) append figcaption
      var alt = img.alt;
      var $figure = $img.parent();
      if (alt) {
        $figure.append('<figcaption class="post-figure-caption">' + alt + '</figcaption>');
      }
      // (3) assign proper class based on image type
      if ($img.hasClass('wide')) { // wide image type
        $img.parent().addClass('post-figure--wide');
      } else if ($img.hasClass('full')) {
        $img.parent().addClass('post-figure--full');
      } else if ($img.hasClass('left')) { // left-floated image type
        $img.parent().addClass('post-figure--left');
        $img.parent().wrap('<div class="container--narrow"></div>');
      } else { // default image type
        $img.parent().addClass('post-figure--default');
      }
    });
  });

}(jQuery);
