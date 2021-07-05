/*!
    * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });
    })


console.clear();

const nav = document.querySelector("nav");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = [...document.querySelectorAll(".link")];
const menuBtn = document.querySelector(".menu-btn");
const subMenuBtn = document.querySelector(".sub-menu-btn");

function createHoverEl() {
	let hoverEl = document.createElement("div");
	hoverEl.className = "hover-el";
	hoverEl.style.setProperty("--y", "0px");
	hoverEl.style.setProperty("--mousex", "0px");
	hoverEl.style.setProperty("--mousey", "0px");
	navLinksContainer.appendChild(hoverEl);
}
createHoverEl();

navLinks.forEach((link, index) => {
	let hoverEl = navLinksContainer.querySelector(".hover-el");
	link.style.setProperty("--delay", `${index * 50}ms`);
	link.addEventListener("mousemove", function(e) {
		hoverEl.style.setProperty("--y", `${index * 60}px`);
		hoverEl.style.setProperty("opacity", "1");
		hoverEl.style.setProperty("--mousex", `${e.pageX - hoverEl.offsetLeft}px`);
		hoverEl.style.setProperty("--mousey", `${e.pageY - hoverEl.offsetTop}px`);
	});
	navLinksContainer.addEventListener("mouseout", function() {
		hoverEl.style.setProperty("opacity", "0");
	});
	link.addEventListener("click", function() {
		let hoverEl = navLinksContainer.querySelector(".hover-el");
		hoverEl.style.opacity = '0';
		toggleSubmenu(link);
	});
});

menuBtn.addEventListener("click", function() {
	nav.classList.toggle("nav-open");
	menuBtn.classList.toggle("close");
});
subMenuBtn.addEventListener("click", function() {
	nav.classList.toggle("sub-menu-open");
	removeSubmenu();
});

function toggleSubmenu(el) {
	let subMenu = nav.querySelector(".sub-menu");
	if (el.children[1]) {
		createSubmenu(el);
	} else if (nav.contains(subMenu)) {
		removeSubmenu();
	} else {
		return;
	}
}

function createSubmenu(el) {
	let subMenuContainer = document.createElement("div");
	subMenuContainer.className = "sub-menu";
	let subMenuItem = el.children[1].cloneNode(true);
	let subMenuItemList = [...subMenuItem.children];
	subMenuItemList.forEach((item, index) => {
		item.classList.add("off-menu");
		item.style.setProperty("--delay", `${index * 40}ms`);
	});
	nav.classList.toggle("sub-menu-open");
	nav.appendChild(subMenuContainer);
	subMenuContainer.appendChild(subMenuItem);
	setTimeout(function() {
		subMenuItemList.forEach(item => {
			item.classList.remove("off-menu");
			item.classList.add("on-menu");
		});
	}, 200);
}
function removeSubmenu() {
	let subMenu = nav.querySelector(".sub-menu");
	let subMenuItemList = [...subMenu.children[0].children];
	if (nav.contains(subMenu)) {
		subMenuItemList.forEach(item => {
			item.classList.add("off-menu");
			item.classList.remove("on-menu");
		});
		setTimeout(function() {
			nav.removeChild(subMenu);
		}, 500);
	}
}

// for project slider from codepen

import gsap from 'https://cdn.skypack.dev/gsap'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger'
import Draggable from 'https://cdn.skypack.dev/gsap/Draggable'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Draggable)

gsap.set('.box', {
  yPercent: -50,
})

const STAGGER = 0.1
const DURATION = 1
const OFFSET = 0
const BOXES = gsap.utils.toArray('.box')

const LOOP = gsap.timeline({
  paused: true,
  repeat: -1,
  ease: 'none',
})

const SHIFTS = [...BOXES, ...BOXES, ...BOXES]

SHIFTS.forEach((BOX, index) => {
  const BOX_TL = gsap
    .timeline()
    .set(BOX, {
      xPercent: 250,
      rotateY: -50,
      opacity: 0,
      scale: 0.5,
    })
    // Opacity && Scale
    .to(
      BOX,
      {
        opacity: 1,
        scale: 1,
        duration: 0.1,
      },
      0
    )
    .to(
      BOX,
      {
        opacity: 0,
        scale: 0.5,
        duration: 0.1,
      },
      0.9
    )
    // Panning
    .fromTo(
      BOX,
      {
        xPercent: 250,
      },
      {
        xPercent: -350,
        duration: 1,
        immediateRender: false,
        ease: 'power1.inOut',
      },
      0
    )
    // Rotations
    .fromTo(
      BOX,
      {
        rotateY: -50,
      },
      {
        rotateY: 50,
        immediateRender: false,
        duration: 1,
        ease: 'power4.inOut',
      },
      0
    )
    // Scale && Z
    .to(
      BOX,
      {
        z: 100,
        scale: 1.25,
        duration: 0.1,
        repeat: 1,
        yoyo: true,
      },
      0.4
    )
    .fromTo(
      BOX,
      {
        zIndex: 1,
      },
      {
        zIndex: BOXES.length,
        repeat: 1,
        yoyo: true,
        ease: 'none',
        duration: 0.5,
        immediateRender: false,
      },
      0
    )
  LOOP.add(BOX_TL, index * STAGGER)
})

const CYCLE_DURATION = STAGGER * BOXES.length
const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET

const LOOP_HEAD = gsap.fromTo(
  LOOP,
  {
    totalTime: START_TIME,
  },
  {
    totalTime: `+=${CYCLE_DURATION}`,
    duration: 1,
    ease: 'none',
    repeat: -1,
    paused: true,
  }
)

const PLAYHEAD = {
  position: 0,
}

const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration())

const SCRUB = gsap.to(PLAYHEAD, {
  position: 0,
  onUpdate: () => {
    LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
  },
  paused: true,
  duration: 0.25,
  ease: 'power3',
})

let iteration = 0
const TRIGGER = ScrollTrigger.create({
  start: 0,
  end: '+=2000',
  horizontal: false,
  pin: '.boxes',
  onUpdate: self => {
    const SCROLL = self.scroll()
    if (SCROLL > self.end - 1) {
      // Go forwards in time
      WRAP(1, 1)
    } else if (SCROLL < 1 && self.direction < 0) {
      // Go backwards in time
      WRAP(-1, self.end - 1)
    } else {
      const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration()
      SCRUB.vars.position = NEW_POS
      SCRUB.invalidate().restart()
    }
  },
})

const WRAP = (iterationDelta, scrollTo) => {
  iteration += iterationDelta
  TRIGGER.scroll(scrollTo)
  TRIGGER.update()
}

const SNAP = gsap.utils.snap(1 / BOXES.length)

const progressToScroll = progress =>
  gsap.utils.clamp(
    1,
    TRIGGER.end - 1,
    gsap.utils.wrap(0, 1, progress) * TRIGGER.end
  )

const scrollToPosition = position => {
  const SNAP_POS = SNAP(position)
  const PROGRESS =
    (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration()
  const SCROLL = progressToScroll(PROGRESS)
  if (PROGRESS >= 1 || PROGRESS < 0) return WRAP(Math.floor(PROGRESS), SCROLL)
  TRIGGER.scroll(SCROLL)
}

ScrollTrigger.addEventListener('scrollEnd', () =>
  scrollToPosition(SCRUB.vars.position)
)

const NEXT = () => scrollToPosition(SCRUB.vars.position - 1 / BOXES.length)
const PREV = () => scrollToPosition(SCRUB.vars.position + 1 / BOXES.length)

document.addEventListener('keydown', event => {
  if (event.code === 'ArrowLeft' || event.code === 'KeyA') NEXT()
  if (event.code === 'ArrowRight' || event.code === 'KeyD') PREV()
})

document.querySelector('.boxes').addEventListener('click', e => {
  const BOX = e.target.closest('.box')
  if (BOX) {
    let TARGET = BOXES.indexOf(BOX)
    let CURRENT = gsap.utils.wrap(
      0,
      BOXES.length,
      Math.floor(BOXES.length * SCRUB.vars.position)
    )
    let BUMP = TARGET - CURRENT
    if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
      BUMP = (BOXES.length - BUMP) * -1
    }
    if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
      BUMP = BOXES.length + BUMP
    }
    scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length))
  }
})

window.BOXES = BOXES

document.querySelector('.next').addEventListener('click', NEXT)
document.querySelector('.prev').addEventListener('click', PREV)

// Dragging
// let startX = 0
// let startOffset = 0

// const onPointerMove = e => {
//   e.preventDefault()
//   SCRUB.vars.position = startOffset + (startX - e.pageX) * 0.001
//   SCRUB.invalidate().restart() // same thing as we do in the ScrollTrigger's onUpdate
// }

// const onPointerUp = e => {
//   document.removeEventListener('pointermove', onPointerMove)
//   document.removeEventListener('pointerup', onPointerUp)
//   document.removeEventListener('pointercancel', onPointerUp)
//   scrollToPosition(SCRUB.vars.position)
// }

// // when the user presses on anything except buttons, start a drag...
// document.addEventListener('pointerdown', e => {
//   if (e.target.tagName.toLowerCase() !== 'button') {
//     document.addEventListener('pointermove', onPointerMove)
//     document.addEventListener('pointerup', onPointerUp)
//     document.addEventListener('pointercancel', onPointerUp)
//     startX = e.pageX
//     startOffset = SCRUB.vars.position
//   }
// })

gsap.set('.box', { display: 'block' })

gsap.set('button', {
  z: 200,
})

Draggable.create('.drag-proxy', {
  type: 'x',
  trigger: '.box',
  onPress() {
    this.startOffset = SCRUB.vars.position
  },
  onDrag() {
    SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.001
    SCRUB.invalidate().restart() // same thing as we do in the ScrollTrigger's onUpdate
  },
  onDragEnd() {
    scrollToPosition(SCRUB.vars.position)
  },
})
