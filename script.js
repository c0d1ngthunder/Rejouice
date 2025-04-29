gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function customCursor() {
  const cursor = document.querySelector("#cursor");
  const page1 = document.querySelector("#page1");

  page1.addEventListener("mouseenter", (e) => {
    gsap.to(cursor, {
      opacity: 1,
      duration: 0.2,
      ease: "linear",
    });
  });

  window.addEventListener("mousemove", (e) => {
    const x = e.pageX;
    const y = e.pageY;

    let scrollY = locoScroll && locoScroll.scroll && locoScroll.scroll.instance
      ? locoScroll.scroll.instance.scroll.y
      : 0;

    gsap.to(cursor, {
      x: x,
      y: y + scrollY,
      duration: 0.2,
      ease: "linear",
    });
  });

  page1.addEventListener("mouseleave", (e) => {
    gsap.to(cursor, {
      opacity: 0,
      duration: 0.2,
      ease: "linear",
    });
  });
}

function textanimation(elem,content,head) {
  let y = 100
  if (head=="#page4-head"){
    y=160
  }
  const text = document.querySelector(elem);
  const textArray = text.textContent.split(" ");
  text.innerHTML = ""; // Clear the text content
  textArray.forEach((word, index) => {
    if (word.trim() !== "") {
      const wrapper = document.createElement("span");
      wrapper.classList.add("wrapper");

      const span = document.createElement("span");
      span.classList.add("word");
      span.textContent = word;

      wrapper.appendChild(span);

      text.appendChild(wrapper);
    }
  });

  gsap.from(`${head} .head`, {
    y: y,
    duration: 0.5,
    scrollTrigger: {
      trigger: head,
      start: "top 80%",
      end: "bottom 20%",
      scroller: "main",
    },
    stagger: 0.01,
  });

  gsap.from(`${elem} .word`, {
    y: 120,
    duration: 0.5,
    scrollTrigger: {
      trigger: content,
      start: "top 50%",
      end: "bottom 20%",
      scroller: "main",
    },
    stagger: 0.01,
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

textanimation(".page2-text","#page2-content","#page2-head");
textanimation(".page4-text","#page4-content","#page4-head")
customCursor();