const cursor = document.querySelector("#cursor");
const page1 = document.querySelector("#page1");

page1.addEventListener("mouseenter", (e) => {
  cursor.style.opacity = 1;
})

window.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;

  cursor.style.top = `${y}px`;
  cursor.style.left = `${x}px`;
});

page1.addEventListener("mouseleave", (e) => {
  cursor.style.opacity = 0;
})