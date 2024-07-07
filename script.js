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

function pg1(){
  gsap.to("#pizza-pan", {
    rotation: 250, // Rotate 360 degrees
    ease: 'none', // Linear easing
    scrollTrigger: {
      trigger: "#pizza-pan",
      start: 'bottom top',
      end: 'top bottom', 
      scrub: true,
      scroller:".main",
      markers: true,
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
      markers: true,
    }
  });
  
  
  }
  pg1()

function loader(){
  gsap.config({trialWarn: false});
console.clear();
let select = s => document.querySelector(s),
		q = gsap.utils.selector(document),
		toArray = s => gsap.utils.toArray(s),
		pizzaSpinDuration = 3,
		mainSVG = select('#mainSVG'),
		pizzaBase = select('#pizzaBase'),
		allIngredients = toArray('.ingredient'),
		allMushrooms = toArray('.mushroom'),
		allSalami = toArray('.salami'),
		allOlive = toArray('.olive'),
		allPeppers = toArray('.pepper')

gsap.set('svg', {
	visibility: 'visible'
})
let pizzaProp = gsap.getProperty('#pizzaBase');

function addToPizza(el) {
	let pizzaRot = pizzaProp('rotation');
	//console.log(pizzaRot)
	gsap.set(el, {
		rotation: 360-pizzaRot,
		svgOrigin: '400 300'
	})
	pizzaBase.appendChild(el);
	
}

function reset () {
	
	allIngredients.forEach((c) => {
		select('#ingredientGroup').appendChild(c);
		gsap.set(c, {
			rotation: 0,
			y: 0
		})
	})
	gsap.set('#egg .eggBits', {
		scale: 0,
		svgOrigin: '400 300'		
		
	}) 	
	
	gsap.set('#eggShine', {
		opacity: 0	
	}) 	
}
let tl = gsap.timeline({repeat: 0, onRepeat: reset});
tl.to('#pizzaBase', {
	duration: pizzaSpinDuration,
	rotation: -360,
	repeat: 2,
	svgOrigin: '400 300',
	ease: 'none'
})
.to('#egg', {
	duration: pizzaSpinDuration,
	rotation: -360,
	repeat: 2,
	ease: 'none'
}, 0)

.to(allMushrooms, {
	duration: 1.2,
	opacity: 1,
	y: '+=158',
	stagger: {
		each: pizzaSpinDuration/allMushrooms.length,
		//from: 'random',
		onComplete:function(){
      //fade out each target when it completes
      addToPizza(this.targets()[0])
    }
	},
	ease: 'power3.in'
}, 0.47)
.to(allPeppers, {
	opacity: 1,
	y: '+=200',
	stagger: {
		each: pizzaSpinDuration/allPeppers.length,
		//from: 'random',
		onComplete:function(){
      //fade out each target when it completes
      addToPizza(this.targets()[0])
    }
	},
	ease: 'power1.in'
}, 1)
.to(allSalami, {
	opacity: 1,
	//duration: 0.5,
	y: '+=152',
	stagger: {
		each: pizzaSpinDuration/allSalami.length,
		//from: 'random',
		onComplete:function(){
      //fade out each target when it completes
      addToPizza(this.targets()[0])
    }
	},
	ease: 'power3.in'
}, 1.5)
.to(allOlive, {
	opacity: 1,
	//duration: 0.5,
	y: '+=180',
	stagger: {
		each: pizzaSpinDuration/allOlive.length,
		//from: 'random',
		onComplete:function(){
      //fade out each target when it completes
      addToPizza(this.targets()[0])
    }
	},
	ease: 'power3.in'
}, 0.78)

.to('#egg .eggBits', {
	duration: 1,
	scale: 1,
	stagger: {
		amount: 0.2
	},
	//opacity: 1,
	ease: 'elastic(0.6, 0.5)'
}, '-=4')
.to('#eggShine', {
	opacity: 0.6,
}, '-=3.65')
.to('.ingredient, #egg, #eggShine', {
	opacity: 0
}, '-=0.5')
.to('#loader', {
  scale: 5,
  opacity:0,
  // svgOrigin: '400 300'		
  
}) 	
.to('#loader', {
  display: "none"
}) 	
gsap.globalTimeline.timeScale(1.25)
//.call(addToPizza, [mushroom])
reset()
//ScrubGSAPTimeline(tl)
}
loader()

function page2Slider(){
  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideCount = slides.children.length;

    // Clone slides for infinite effect
    for (let i = 0; i < slideCount; i++) {
        const clone = slides.children[i].cloneNode(true);
        slides.appendChild(clone);
    }

    // Calculate the width of all slides combined
    const slideWidth = slides.children[0].offsetWidth;
    const totalWidth = slideWidth * slides.children.length;
    slides.style.width = `${totalWidth}px`;
});

}
// 
page2Slider();


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
      // markers: true,
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



