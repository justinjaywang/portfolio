$(document).ready(function() {
  
  $(window)
  .load(function() {
    updateHeaderWidths($('.persist-header'));
  })
  .resize(function() {  
    updateHeaderWidths($('.persist-header'));
    updateSticky();
  })
  // .bind('touchmove', function() {
  //   updateSticky();
  // })
  .bind('scroll', function(){
    updateSticky();
    console.log('gets here')
  })
  .bind('scrollstart', function() {
    startUpdateSticky();
  })
  .bind('scrollstop', function() {
    stopUpdateSticky();
  });

  $('a#top-anchor').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 250);
    return false;
  });

});

scrolling = new Object();
scrolling.intervalVar = 0;

function startUpdateSticky() {
  updateSticky();
  console.log('it\'s happening')
  scrolling.intervalVar = setTimeout(startUpdateSticky, 1);
}

function stopUpdateSticky() {
  if (scrolling.intervalVar) {
    console.log('stopped')
    clearInterval(scrolling.intervalVar); 
  }
}

function updateSticky() {
  $('.persist-area').each(function() {
    var area         = $(this),
      offset         = area.offset(),
      areaTop        = offset.top,
      windowTop      = $(window).scrollTop(),
      headerHeight   = this.children[1].clientHeight,
      bufferHeight   = area.height() - headerHeight - 10 + 50,
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