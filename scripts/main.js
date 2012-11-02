$(document).ready(function() {
  
  $(window)
  .load(function() {
    imageResize($('img'));
    updateHeaderWidths($('.persist-header'));
  })
  .resize(function() {  
    imageResize($('img'));
    updateHeaderWidths($('.persist-header'));
    updateSticky();
  });
  
  $(function () {
		$('a#top-anchor').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 250);
			return false;
		});
	});

});

$(function() {
  
  $('.project-content img').lazyload({
    effect: 'fadeIn'
  });
   
  // $(window)
  // .scroll(updateSticky)
  // .resize(updateSticky)
  // .trigger('scroll');
  
  $(window)
  .bind('touchmove', function() {
    updateSticky();
  })
  .bind('scroll', function(){
    updateSticky();
  })

});

function imageResize(obj) {
  
  var width = obj.attr('width');
  var height = obj.attr('height');
  var ratio = height/width;
  
  var newWidthStr = $('.project-content').css('width');
  var newWidthNum = Number(newWidthStr.replace('px', ''));
  var newHeightNum = Math.round(newWidthNum*ratio);

  obj.attr('width', String(newWidthNum));
  obj.attr('height', String(newHeightNum));
  
}

function updateSticky() {
  $('.persist-area').each(function() {
    var area         = $(this),
      offset         = area.offset(),
      areaTop        = offset.top,
      windowTop      = $(window).scrollTop(),
      headerHeight   = this.children[1].clientHeight,
      bufferHeight   = area.height() - headerHeight - 10 + 50;
      header         = $('.persist-header', this)

    if ((windowTop <= areaTop)) 
     {
       // before sticky zone
       header.css({ 'position': 'absolute', 'top': '0px' })
     }
    else if ((windowTop > areaTop) && (windowTop < areaTop + bufferHeight))
     {
       // in sticky zone
       header.css({ 'position': 'fixed', 'top': '0px' })
     }
    else
     {
       // after sticky zone
       header.css({ 'position': 'absolute', 'top': String(bufferHeight) + 'px'})
     }
  });
}

function updateHeaderWidths(obj) {
  obj.each(function() {
    var prevElementWidth = this.previousElementSibling.offsetWidth;
    $(this).css('width', prevElementWidth);
  });
}