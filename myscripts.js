// slides

const slides = document.querySelectorAll(".slides");
const prevBut = document.querySelector(".prev");
const nextBut = document.querySelector(".next");

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

let curSlide = 0;
const maxSlide = slides.length;

const goSlide = function (slide) {
  slides.forEach(
    (v, i) => (v.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goSlide(curSlide);
  clearInterval(mytimer);
  mytimer = setInterval(nextSlide, 5000);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else curSlide--;

  goSlide(curSlide);
  clearInterval(mytimer);
  mytimer = setInterval(nextSlide, 5000);
};

prevBut.addEventListener("click", prevSlide);
nextBut.addEventListener("click", nextSlide);

let mytimer = setInterval(nextSlide, 2000);

// slides with keyboard event

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

//Sticky Navigation
const slideCont = document.querySelector(".slideshow-container");
const header = document.querySelector(".header");
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
  console.log(entry.target);
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "750px",
});

headerObserver.observe(slideCont);

//revealing about section

// declaring observer callback for all cases
const obsfunc = function (entries, observer) {
  const [entryi] = entries;
  if (!entryi.isIntersecting) {
    return;
  }
  entryi.target.classList.remove("hidden");
  observer.unobserve(entryi.target);
};

const about = document.querySelector(".about");

const aboutObserver = new IntersectionObserver(obsfunc, {
  root: null,
  threshold: 0.1,
});

aboutObserver.observe(about);
about.classList.add("hidden");

// revealing gallery section

const gallery = document.querySelector(".gallery");

const galleryObserver = new IntersectionObserver(obsfunc, {
  root: null,
  threshold: 0.1,
});

galleryObserver.observe(gallery);
gallery.classList.add("hidden");

//revealing contact section

const contact = document.querySelector(".contact");

const contactObserver = new IntersectionObserver(obsfunc, {
  root: null,
  threshold: 0.1,
});

contactObserver.observe(contact);
contact.classList.add("hidden");

// Copying contact informations

let copyText = document.querySelectorAll(".location__box--text");

copyText.forEach((i) =>
  i.addEventListener("click", function (e) {
    const target = e.target;

    navigator.clipboard
      .writeText(target.textContent)
      .then(alert("copied:" + target.textContent));
  })
);

//scroll to sections from nav items

const navAb = document.querySelector(".ab");
navAb.addEventListener("click", function () {
  about.scrollIntoView({ behavior: "smooth" });
});

const navGal = document.querySelector(".gall");
navGal.addEventListener("click", function () {
  gallery.scrollIntoView({ behavior: "smooth" });
});

const navCont = document.querySelector(".cont");
navCont.addEventListener("click", function () {
  contact.scrollIntoView({ behavior: "smooth" });
});
