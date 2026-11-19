function slider(track, dotsBox, prev, next) {
  const total = track.children.length;
  let index = 0;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => show(i));
    dotsBox.appendChild(dot);
  }

  function show(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsBox.children].forEach((dot, n) => dot.classList.toggle("active", n === index));
  }

  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  show(0);
}

document.querySelectorAll(".hack-carousel").forEach((carousel) => {
  slider(
    carousel.querySelector(".carousel-track"),
    carousel.querySelector(".carousel-dots"),
    carousel.querySelector(".left"),
    carousel.querySelector(".right")
  );
});

const cert = document.querySelector(".cert-carousel-wrapper");
slider(
  cert.querySelector(".cert-track"),
  document.querySelector(".cert-dots"),
  cert.querySelector(".cert-arrow.left"),
  cert.querySelector(".cert-arrow.right")
);