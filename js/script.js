// PRE LOADER

window.onload = () => {
  const layer = document.getElementById("layer");
  const body = document.querySelector("body");

  setTimeout(() => {
    body.style.overflowY = "visible";
    layer.style.opacity = "0";

    if (layer.style.opacity == 0) {
      setTimeout(() => {
        layer.style.display = "none";
      }, 500);
    }
  }, 1500);
};

// NAV

const btnMobile = document.getElementById("btn-mobile");
const nav = document.getElementById("navigation");

const dropBtn = document.getElementById("dropA");
const dropList = document.getElementById("dropUl");

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  nav.classList.toggle("active");

  document.documentElement.onclick = function (event) {
    if (event.target !== dropBtn && event.target !== dropList) {
      if (window.screen.width <= 990) {
        dropBtn.classList.remove("active");
        dropList.classList.remove("active");
        nav.classList.remove("active");
      }
    }
  };
}

function dropdown() {
  dropBtn.classList.toggle("active");
  dropList.classList.toggle("active");

  if (window.screen.width > 990) {
    document.documentElement.onclick = function (event) {
      if (event.target !== dropBtn && event.target !== dropList) {
        dropBtn.classList.remove("active");
        dropList.classList.remove("active");
      }
    };
  }
}

btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);
dropBtn.addEventListener("click", dropdown);

// CLOSE NAV ON CLICK UL -> A

for (const navLink of document.querySelectorAll(".navLink")) {
  navLink.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// NAV FIXED ON SCROLL  &&  SCROLL TO TOP BTN VISIBILITY and EFFECT

const btnUp = document.getElementById("arrowUp");
const menu = document.getElementById("nav");

(function () {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      menu.classList.add("navFixed");
    } else {
      menu.classList.remove("navFixed");
    }

    if (window.scrollY > 400) {
      btnUp.style.display = "block";
    } else {
      btnUp.style.display = "none";
    }
  });
})();

const scrollTop = () => {
  window.scroll({
    top: 0,
  });
};

btnUp.onclick = scrollTop;

// SCROLL NAV EFFECT

window.onscroll = () => {
  onScrollNavAnimation();
  indicatorsAnimation();
};

function onScrollNavAnimation() {
  activateMenuCurrentSection(description);
  activateMenuCurrentSection(features);
  activateMenuCurrentSection(screens);
  activateMenuCurrentSection(download);
}

function activateMenuCurrentSection(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;

  const sectionEndsAt = sectionTop + sectionHeight;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;

  const sectionBoundaries =
    sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine;

  const sectionId = section.getAttribute("id");
  const menuElement = document.querySelector(`.menu li a[href*=${sectionId}]`);

  menuElement.classList.remove("active");
  if (sectionBoundaries) {
    menuElement.classList.add("active");
  }
}

// LIGHTBOX

const layerLightbox = document.getElementById("lightbox__layer");
const lightbox = document.getElementById("lightbox");

function activeLightbox() {
  layerLightbox.classList.toggle("active");
  lightbox.classList.toggle("active");

  document.documentElement.onclick = function (event) {
    if (event.target === layerLightbox) {
      layerLightbox.classList.toggle("active");
      lightbox.classList.toggle("active");
    }
  };
  document.onkeydown = function (event) {
    if (event.key === "Escape") {
      layerLightbox.classList.remove("active");
      lightbox.classList.remove("active");
    }
  };
}

function closeLightbox() {
  layerLightbox.classList.toggle("active");
  lightbox.classList.toggle("active");
}

// DESCRIPTION ANIMATION

const descriptionContainer = document.querySelector(".description__2__txt");
const descriptionBtn = document.querySelectorAll(".description__2__tittle .description__2__btn");
const descriptionContent = document.querySelectorAll(".content__box");

descriptionContainer.addEventListener("click", (e) => {
  const descriptionId = e.target.dataset.id;
  if (descriptionId) {
    descriptionBtn.forEach((btn) => {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });

    descriptionContent.forEach((descriptionContent) => {
      descriptionContent.classList.remove("active");
    });

    const element = document.getElementById(descriptionId);
    element.classList.add("active");
  }
});

// SLIDER SCREENS

$(".slider").slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  responsive: [
    {
      breakpoint: 1240,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 565,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

// INDICATORS ANIMATION

const sectionIndicator = document.getElementById("indicators");
const valueDisplays = document.querySelectorAll(".numbers");
let enteredIndicatorSection = false;
let valueInterval = 3000;

function indicatorsAnimation() {
  const activeAnimation =
    window.scrollY + window.innerHeight >= sectionIndicator.offsetTop;

  if (activeAnimation && !enteredIndicatorSection) {
    enteredIndicatorSection = true;

    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(valueInterval / endValue);

      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;

        if (startValue == endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }
}
