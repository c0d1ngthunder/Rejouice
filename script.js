const cursor = document.querySelector('#cursor');
const page1 = document.querySelector('#page1');

page1.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  cursor.style.top = `${y}px`;
  cursor.style.left = `${x}px`;
})