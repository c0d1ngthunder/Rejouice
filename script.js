gsap.registerPlugin(ScrollTrigger);

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

    gsap.to(cursor, {
      x: x,
      y: y,
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

function page2textanimation() {
  const text = document.querySelector(".page2-text");
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

  gsap.from(".head", {
    y: 100,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page2-head",
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
    },
    stagger: 0.01,
  });

  gsap.from(".word", {
    y: 120,
    duration: 0.5,
    scrollTrigger: {
      trigger: "#page2-content",
      start: "top 50%",
      end: "bottom 20%"
    },
    stagger: 0.01,
  });
}

page2textanimation();
customCursor();
