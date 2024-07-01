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
  rotation: 200, // Rotate 360 degrees
  ease: 'none', // Linear easing
  scrollTrigger: {
    trigger: "#pizza-pan",
    start: 'top center',
    end: 'bottom center', 
    scrub: true,
    scroller:".main",
    // markers: true,
  }
});
gsap.to("#page1", {
  borderBottomLeftRadius: "70%", // Rotate 360 degrees
  borderBottomRightRadius: "70%", // Rotate 360 degrees
  ease: 'none', // Linear easing
  scrollTrigger: {
    trigger: "#pizza-pan",
    start: 'top center',
    end: 'bottom center', 
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
      scrub: 2,
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


gsap.from("#page4>#scroller h1",{
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
},"a")
gsap.to("#page4",{
  backgroundColor: "#16A850",
  scrollTrigger:{
    start: 'top center',
    end: 'bottom bottom', 
    scrub: true,
    scroller:".main",
      trigger:"#page4",
      scrub:2
  }
},"a")
gsap.to("#page4>#scroller",{
  transform:"translateX(-60%)",
  duration: 20,
  scrollTrigger:{
      start:"top 0%",
      end:"top -100%",
      trigger:"#page4",
      scroller:".main",
      // markers:true,
      pin:true,
      scrub:2
  }
})