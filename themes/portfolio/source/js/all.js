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

  // stickyHeader
  // : variables
  var $window = $(window),
    $document = $(document),
    $stickyHeader = $('.stickyHeader'),
    scrollInterval = 150,
    windowHeight = 0,
    bodyHeight = 0,
    headerHeight = 0,
    headerBufferHeight = 0,
    headerBufferMultiplier = 2,
    prevScrollTop = 0,
    scrollTop = 0,
    relativeScrollTop = 0,
    scrollBottom = 0,
    headerElement,
    headerClasses = {},
    isPristine = true;

  // : construction
  var init = function() {
    if (isTouchDevice()) return; 
    if (!$stickyHeader.length) return;
    if ($window.scrollIntervalId) {
      // clear previous scrollIntervalId
      $window.prevScrollIntervalId = $window.scrollIntervalId;
      clearInterval($window.prevScrollIntervalId);
    }
    $window.scrollIntervalId = setInterval(updatePage, scrollInterval);
    setInitialValues();
    bindWindowResize();
  };

  var setInitialValues = function() {
    windowHeight = window.innerHeight;
    bodyHeight = $document[0].body.scrollHeight;
    headerHeight = $stickyHeader[0].offsetHeight;
    headerBufferHeight = Math.ceil(headerHeight * headerBufferMultiplier);
    prevScrollTop = window.pageYOffset;
    scrollTop = prevScrollTop;
    scrollBottom = scrollTop + windowHeight;
    headerClasses.isAffixed = false;
    headerClasses.isShown = false;
    headerClasses.isTransitioned = false;
    isPristine = true;
  };

  // : updating
  var updatePage = function() {
    window.requestAnimationFrame(function() {
      updateValues();
      updateClasses();
    });
  };

  var updateValues = function() {
    bodyHeight = $document[0].body.scrollHeight;
    prevScrollTop = scrollTop;
    scrollTop = window.pageYOffset;
    scrollBottom = scrollTop + windowHeight;
    relativeScrollTop = scrollTop - prevScrollTop; // positive value = scrolled down
  };

  var applyClasses = function() {
    // apply classes to header element
    var stickyHeader = $('.stickyHeader');
    $.each(headerClasses, function(key, val) {
      if (val) {
        stickyHeader.addClass(key);
      } else {
        stickyHeader.removeClass(key);
      }
    });
  };

  var updateClasses = function() {
    // update header classes isAffixed, isShown, and isTransitioned (main function)
    // console.log(headerClasses)
    var isAtTop = (scrollTop <= 0),
      isTallEnough = (bodyHeight > (windowHeight + headerBufferHeight)),
      isAtBottom = (scrollBottom >= bodyHeight) && isTallEnough,
      isBelowHeader = (scrollTop > headerHeight),
      isBelowHeaderBuffer = (scrollTop > headerBufferHeight),
      hasScrolledDown = (relativeScrollTop > 0),
      hasScrolledUp = (relativeScrollTop < 0);

      if (isAtTop && isPristine) {
        // (1a) if at top, is pristine
        // then remove affix, hide, remove transition, make not pristine, return
        // console.log('1a');
        headerClasses.isAffixed = false;
        headerClasses.isShown = false;
        headerClasses.isTransitioned = false;
        isPristine = false;
        return;
      } else if (isAtTop && !headerClasses.isAffixed && (headerClasses.isShown || headerClasses.isTransitioned)) {
        // (1b) if at top, not affixed, shown or transitioned
        // then hide and remove transition
        // console.log('1b');
        headerClasses.isShown = false;
        headerClasses.isTransitioned = false;
      } else if (isAtTop && !headerClasses.isAffixed) {
        // (1c) if at top, not affixed,
        // then return
        // console.log('1c');
        return;
      } else if (isAtTop && headerClasses.isTransitioned) {
        // (1d) if at top, (affixed), transitioned,
        // then remove transition, go to (1e)
        // console.log('1d');
        headerClasses.isTransitioned = false;
      } else if (isAtTop) {
        // (1e) if at top, (affixed), (not transitioned),
        // then remove affix, hide, make not pristine, go to (1c)
        // console.log('1e');
        headerClasses.isAffixed = false;
        headerClasses.isShown = false;
        isPristine = false;
      } else if (isPristine && !headerClasses.isAffixed) {
        // (2a) if pristine, (not affixed),
        // then affix, go to (2b)
        // console.log('2a');
        headerClasses.isAffixed = true;
      } else if (isPristine) {
        // (2b) if pristine, (affixed), (not shown), (not transitioned),
        // then show, transition, and make not pristine
        // console.log('2b');
        headerClasses.isShown = true;
        headerClasses.isTransitioned = true;
        isPristine = false;
      } else if (isAtBottom && !headerClasses.isAffixed) {
        // (3a) if at bottom, not affixed,
        // then affix, go to (3b)
        // console.log('3a');
        headerClasses.isAffixed = true;
      } else if (isAtBottom && !headerClasses.isShown) {
        // (3b) if at bottom, (affixed), not shown, (may or may not be transitioned),
        // then show, transition, go to (3c)
        // console.log('3b');
        headerClasses.isShown = true;
        headerClasses.isTransitioned = true;
      } else if (isAtBottom) {
        // (3c) if at bottom, (affixed), (shown), (transitioned),
        // then return
        // console.log('3c');
        return;
      } else if (hasScrolledDown && !(headerClasses.isAffixed && headerClasses.isShown && headerClasses.isTransitioned)) {
        // (4a) if scrolled down, not affixed, not shown, not transitioned
        // then return
        // console.log('4a');
        return;
      } else if (hasScrolledDown && (headerClasses.isAffixed && headerClasses.isShown && headerClasses.isTransitioned) && isBelowHeader) {
        // (4b) if scrolled down, affixed, shown, transitioned, is below header
        // then hide
        // console.log('4b');
        headerClasses.isShown = false;
      } else if (hasScrolledUp && !headerClasses.isAffixed && isBelowHeaderBuffer) {
        // (5a) if scrolled up, not affixed, is below header,
        // then affix, go to (5c)
        // console.log('5a');
        headerClasses.isAffixed = true;
      } else if (hasScrolledUp && (headerClasses.isShown && headerClasses.isTransitioned)) {
        // (5b) if scrolled up, (affixed), shown, transitioned,
        // then return
        // console.log('5b');
        return;
      } else if (hasScrolledUp && !headerClasses.isShown) {
        // (5c) if scrolled up, (affixed), not shown, (may or may not be transitioned),
        // then show, transition, go to (5b)
        // console.log('5c');
        headerClasses.isShown = true;
        headerClasses.isTransitioned = true;
      } else {
        // else,
        // then return
        // console.log('else');
        return;
      }
      applyClasses();
  };

  // : bind window resize
  var bindWindowResize = function() {
    $window.bind('resize',
      function() {
        setInitialValues();
      }
    );
  };

  // : detect touch device
  var isTouchDevice = function() {
    return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
  };

  // : start
  init();

}(jQuery);
