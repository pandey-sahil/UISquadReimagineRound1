function loco(){
    gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true }
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

});

};
loco()


gsap.to("#pizza-pan img", {
  rotation: 250, // Rotate 360 degrees
  ease: 'none', // Linear easing
  scrollTrigger: {
    trigger: "#pizza-pan",
    start: 'top bottom',
    end: 'bottom top', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
});
gsap.to("#page1", {
  borderBottomLeftRadius: "50%", // Rotate 360 degrees
  borderBottomRightRadius: "50%", // Rotate 360 degrees
  ease: 'none', // Linear easing
  scrollTrigger: {
    trigger: "#pizza-pan img",
    start: 'top center',
    end: 'bottom top', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
});
gsap.from("#page2 p", {
  opacity:0,
  bottom: 100,
  ease: 'none', // Linear easing
  scrollTrigger: {
    trigger: "#page2",
    start: 'top center',
    end: 'center bottom', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
});


var clutter = ""
var pText = document.querySelector("#page3 p").textContent
var splitedText = pText.split("")
splitedText.forEach(function (elem) {
    clutter += `<span>${elem}</span>`
})
document.querySelector("#page3 p").innerHTML = clutter


gsap.from("#page3 h1", {
opacity:0,
  y:100,
  scrollTrigger: {
    trigger: "#page3",
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
})
gsap.from("#page3 p", {
opacity:0,
  x:-100,
  scrollTrigger: {
    trigger: "#page3",
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
})
gsap.from("#page3 img", {
opacity:0,
  x:100,
  scrollTrigger: {
    trigger: "#pg3-right",
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
})

var tl = gsap.timeline({
  scrollTrigger: {
      trigger: "#page3",
      scroller: ".main",
      start: "top 0%",
      end: "top -50%",
      pin: true,
      scrub: .2,
      markers: true,
      onUpdate: function() {
        console.log("Scrolling animation for #page4b updated");
    },
      onComplete: function() {
        console.log("Animation for #page4b completed");
    }
  }
})

tl.to("#page3 p>span", {
  color: "#000",
  stagger: 0.1,
  duration:0.5
})


tl.from("#page4>#scroller h1",{
  y: 200,
  opacity:0,
  scrollTrigger:{
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
      trigger:"#page4",
      scrub:2
  }
},"a").to("#page4",{
  backgroundColor: "#16A850",
  scrollTrigger:{
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
      trigger:"#page4",

  }
},"a")
gsap.to("#page4>#scroller",{
  x:"-60%",
  duration: 20,
  scrollTrigger:{
      start:"top 0%",
      end:"top -100%",
      trigger:"#page4",
      scroller:".main",
      // markers:true,
      pin:true,
      scrub:true
  }
})
gsap.to("#page5",{
  backgroundColor: " #F2F2F2",
  scrollTrigger:{
    start: 'top top',
    end: 'bottom top', 
    scrub: true,
    scroller:".main",
      trigger:"#page5",

  }
},"a")



$('.slider__container').each(function(i){
  var $this = $(this);
  var $slides = $('.slider__items',this);
  var currentSlide = 1;
  var activeSlidesLength = 0;
  var slidePositions = {};
  var totalSlides = 0;
  var trackStart = 0;
  var lastSlideWidth = 0;
  var interval = null;
  var sliderSpeed = 3000; //ms for slide to scroll
  var tweenNext = '';
  var tweenPrev = '';
  var backClicked = false;
  var autoAdvance = true;
  $slides.on('init',function(e,slick){
    var $track = $('.slick-track',$this);
    function setSizeVars() {
      activeSlidesLength = 0;
      trackStart = $('.slick-slide',$this).first().outerWidth();
      slidePositions[1] = trackStart;
      $('.slick-slide:not(.slick-cloned)',$this).each(function(i){
        var width = $(this).outerWidth();
        activeSlidesLength += width;
        slidePositions[i + 2] = trackStart + activeSlidesLength;
        lastSlideWidth = width;
        totalSlides = i + 2;
      });
    };
    setSizeVars();
    $(window).on('resize',function(){
      setSizeVars();
    });
    $track.css({'transform':'translate(-'+slidePositions[currentSlide]+'px,0,0)'});
    function goToNextSlide(transitionTime,transitionEasing) {
      if (currentSlide == totalSlides - 1) { // Go to first cloned slide if reached end
        var nextSlide = currentSlide + 1;
        tweenNext = TweenLite.to($track, 0,{
          x:-(slidePositions[1] - lastSlideWidth),
          ease: Power0.easeNone,
          onComplete: function(){
            currentSlide = nextSlide;
            goToNextSlide(transitionTime,transitionEasing);
          }
        });
      } else {
        var nextSlide = (currentSlide == totalSlides ? 1 : currentSlide + 1);
        tweenNext = TweenLite.to($track, transitionTime,{
          x:-(slidePositions[nextSlide]),
          ease: transitionEasing,
          onComplete: function(){
            currentSlide = nextSlide;
            if (autoAdvance) {
              goToNextSlide(sliderSpeed/1000, Power0.easeNone);
            }
          }
        });
      }
    }
    function goToPrevSlide(transitionTime,transitionEasing) {
      backClicked = true;
      if (currentSlide == totalSlides) {//Go to last Slide
        var prevSlide = currentSlide - 1;
        tweenPrev = TweenLite.to($track, 0,{
          x:-(slidePositions[prevSlide]),
          ease: Power0.easeNone,
          onComplete: function(){
            currentSlide = prevSlide;
            goToPrevSlide(transitionTime,transitionEasing);
          }
        });
      } else if (currentSlide == 1) {//Go to cloned slide instead of last slide
        var prevSlide = totalSlides;
        tweenPrev = TweenLite.to($track, transitionTime,{
          x:-(slidePositions[1] - lastSlideWidth),
          ease: transitionEasing,
          onComplete: function(){
            currentSlide = prevSlide;
          }
        });
      } else {
        var prevSlide = currentSlide - 1;
        tweenPrev = TweenLite.to($track, transitionTime,{
          x:-(slidePositions[prevSlide]),
          ease: transitionEasing,
          onComplete: function(){
            currentSlide = prevSlide;
          }
        });
      }
    }
    setTimeout(function(){
      goToNextSlide(sliderSpeed/1000, Power0.easeNone);
    },1000);
    $this.hover(function() {
      tweenNext.pause();
    },function() {
      if (backClicked) {
        goToNextSlide(sliderSpeed/1000, Power0.easeNone);
      } else {
        tweenNext.play();
      }
      autoAdvance = true;
      backClicked = false;
    });
    $('.slider-prev',$this).on('click',function(){
      if (backClicked) {
        goToPrevSlide(0.2, Power1.easeInOut);
      } else {
        tweenNext.reverse().timeScale(6);
      }
      backClicked = true;
      autoAdvance = false;
    });
    $('.slider-next',$this).on('click',function(){
      goToNextSlide(0.2, Power1.easeInOut);
      autoAdvance = false;
    });
  });
  $slides.slick({
    infinite: true,
    variableWidth: true,
    arrows:false,
    accessibility:false,
    draggable:false,
    swipe:false,
    touchMove:false,
  });
});