function slider(track, dotsBox, prev, next, delay) {
  const total = track.children.length;
  const box = track.parentElement;
  let index = 0;
  let timer;

  function show(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsBox.children].forEach((dot, n) => dot.classList.toggle("active", n === index));
  }

  function stop() {
    clearInterval(timer);
  }

  function start() {
    stop();
    if (delay && total > 1) {
      timer = setInterval(() => show(index + 1), delay);
    }
  }

  function go(i) {
    show(i);
    if (!box.matches(":hover")) start();
  }

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => go(i));
    dotsBox.appendChild(dot);
  }

  prev.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));
  box.addEventListener("mouseenter", stop);
  box.addEventListener("mouseleave", start);

  show(0);
  start();
}

document.querySelectorAll(".hack-carousel").forEach((carousel, i) => {
  slider(
    carousel.querySelector(".carousel-track"),
    carousel.querySelector(".carousel-dots"),
    carousel.querySelector(".left"),
    carousel.querySelector(".right"),
    4000 + i * 700
  );
});

const cert = document.querySelector(".cert-carousel-wrapper");
slider(
  cert.querySelector(".cert-track"),
  document.querySelector(".cert-dots"),
  cert.querySelector(".cert-arrow.left"),
  cert.querySelector(".cert-arrow.right"),
  5000
);