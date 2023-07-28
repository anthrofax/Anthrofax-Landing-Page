const nav = document.querySelector(".nav");
const learnMoreButton = document.querySelector(".learnmore-button");
const allBanefitsContent = document.querySelectorAll(".banefits-content");
const modalSignUp = document.querySelector(".modal");
const modalLogin = document.querySelector(".modal2");
const bluryBackground = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".btn--close-modal");
const faqContainer = document.querySelector(".faq-boxes");
const subscriptionContainer = document.querySelector(".subscription-boxes");
const subsOptionContainer = document.querySelector(".subscription-duration-option");
const selectedOption = document.querySelector(".selected-option");
const mobileLoginButton = document.querySelector(".nav-link-login");
const mobileSignupButton = document.querySelector(".nav-link-signup");

const navLinkHandler = function (mouseIn, event) {
  const logo = document.querySelector(".logo h1");
  const loginButton = nav.querySelectorAll("button");
  const navLinks = event.currentTarget.querySelectorAll(".nav-link");

  if (event.target.classList.contains("nav-link")) {
    const siblings = event.target.closest(".nav-group-link ul").querySelectorAll(".nav-link");
    if (mouseIn == true) {
      event.target.classList.add("text-shadow");
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 1;
    } else {
      event.target.classList.remove("text-shadow");
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 0.5;
    }

    siblings.forEach((sibling) => {
      if (event.target !== sibling) {
        sibling.style.opacity = this;
        sibling.style.transition = "0.5s";
      }
    });

    logo.style.opacity = this;
    logo.style.transition = "0.5s";

    loginButton.forEach((button) => {
      button.style.opacity = this;
      button.style.transition = "0.5s";
    });
  } else if (event.target.classList.contains("nav-button")) {
    if (mouseIn == true) {
      event.target.classList.add("box-shadow");
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 1;
    } else {
      event.target.classList.remove("box-shadow");
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 0.5;
    }

    navLinks.forEach((navLink) => {
      navLink.style.opacity = this;
      navLink.style.transition = "0.5s";
    });

    logo.style.opacity = this;
    logo.style.transition = "0.5s";

    loginButton.forEach((button) => {
      if (event.target !== button) {
        button.style.opacity = this;
        button.style.transition = "0.5s";
      }
    });
  } else if (event.target.closest(".logo")) {
    if (mouseIn == true) {
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 1;
    } else {
      if (event.currentTarget.classList.contains("sticky")) event.currentTarget.style.opacity = 0.5;
    }

    navLinks.forEach((navLink) => {
      navLink.style.opacity = this;
      navLink.style.transition = "0.5s";
    });

    loginButton.forEach((button) => {
      button.style.opacity = this;
      button.style.transition = "0.5s";
    });
  }
};

const hoverAnimation = function (textColor, event) {
  const hoveredButton = event.target.closest(".subscription-option");
  if (!hoveredButton) return;

  const changeBackgroundColor = () => {
    hoveredButton.style.backgroundColor = this;

    hoveredButton.style.color = textColor;
  };

  if (hoveredButton.classList.contains("subscription-option-1") && selectedOption.classList.contains("move-to-right")) {
    changeBackgroundColor();
  } else if (hoveredButton.classList.contains("subscription-option-2") && !selectedOption.classList.contains("move-to-right")) {
    changeBackgroundColor();
  }
};

const clickOptionAnimation = function (event, whatButton) {
  if (whatButton == "right") selectedOption.classList.add("move-to-right");
  else selectedOption.classList.remove("move-to-right");

  document.querySelectorAll(".subscription-option").forEach((button) => (button.style.backgroundColor = "transparent"));

  event.target.closest(".subscription-option").style.backgroundColor = "black";
};

const openModal = function (openedModal) {
  openedModal.classList.remove("hidden");
  bluryBackground.classList.remove("hidden");
};

const closeModal = function (closedModal) {
  closedModal.classList.add("hidden");
  bluryBackground.classList.add("hidden");
};

// 1. Give animation when hover to Navagation Links
nav.addEventListener("mouseover", navLinkHandler.bind(0.5, true));

nav.addEventListener("mouseout", navLinkHandler.bind(1, false));

// 2. Implement Smooth Scroll when clicking the Navigation Links
nav.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav-link")) {
    const sectionDestination = document.querySelectorAll(".nav-link-destination");
    const yPositionOfSection = [];
    sectionDestination.forEach((section) => {
      yPositionOfSection.push(section.offsetTop);
    });

    window.scrollTo({
      top: yPositionOfSection[e.target.dataset.index] - nav.getBoundingClientRect().height,
      behavior: "smooth",
    });
  } else if (e.target.classList.contains("nav-button-signup")) {
    openModal(modalSignUp);
  } else if (e.target.classList.contains("nav-button-login")) {
    openModal(modalLogin);
  } else if (e.target.closest(".logo")) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

learnMoreButton.addEventListener("click", function () {
  window.scrollTo({
    top: document.querySelector(".start-section").offsetTop - nav.getBoundingClientRect().height,
    behavior: "smooth",
  });
});

// 3. Make the Navigation Bar to be Fixed when the determined scroll position has already reached
const obsCallback = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
    nav.style.opacity = 1;
  } else {
    nav.classList.add("sticky");
    nav.style.opacity = 0.5;
  }
};

const navFixedObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

navFixedObserver.observe(document.querySelector("header"));

// 4. Reveal Sections
const allSections = document.querySelectorAll("section");
const revealSection = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  if (entry.target.classList.contains("start-section")) document.querySelector(".start-section h1").style.transform = "scale(1.3, 1.3)";

  const eachContent = [...entry.target.children];
  eachContent.forEach((content) => {
    if (content.classList.contains("banefits-hidden-1")) content.classList.remove("banefits-hidden-1");
    else content.classList.remove("banefits-hidden-2");
  });

  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// 5. Banefits Content Animation
allBanefitsContent.forEach((content) => {
  if (content.dataset.order == "odd") content.classList.add("banefits-hidden-1");
  else content.classList.add("banefits-hidden-2");
});

// 6. Close Modal Window
btnCloseModal.forEach((button) => {
  button.addEventListener("click", function (e) {
    if (e.target.closest(".modal")) closeModal(modalSignUp);
    else if (e.target.closest(".modal2")) closeModal(modalLogin);
  });
});

bluryBackground.addEventListener("click", function () {
  if (!modalLogin.classList.contains("hidden")) closeModal(modalLogin);
  else if (!modalSignUp.classList.contains("hidden")) closeModal(modalSignUp);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalSignUp.classList.contains("hidden")) {
    closeModal(modalSignUp);
  } else if (e.key === "Escape" && !modalLogin.classList.contains("hidden")) {
    closeModal(modalLogin);
  }
});

// 7. Links to Sign In Modal from Login Modal
const createNewAccLink = document.querySelector(".signup-link");
createNewAccLink.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(modalLogin);
  openModal(modalSignUp);
});

// 8. FAQ Event
const dropDownEvent = function (e, eventActive, rotateDeg) {
  if (eventActive == true) e.target.closest(".faqbox").lastElementChild.classList.remove("disappear");
  else e.target.closest(".faqbox").lastElementChild.classList.add("disappear");

  e.target.closest(".faqbox").querySelector("object").style.transform = `rotate(${rotateDeg}deg)`;
};

faqContainer.addEventListener("click", function (event) {
  if (!event.target.closest(".faq-question")) return;

  if (event.target.closest(".faq-question").classList.contains("faq-question")) {
    if (event.target.closest(".faqbox").lastElementChild.classList.contains("disappear")) {
      dropDownEvent(event, true, 180);
    } else {
      dropDownEvent(event, false, 0);
    }
  }
});

// 9. Subscription Purchase
subsOptionContainer.addEventListener("mouseover", hoverAnimation.bind("rgb(0, 0, 0, 0.5)", "white"));

subsOptionContainer.addEventListener("mouseout", hoverAnimation.bind("transparent", "black"));

subsOptionContainer.addEventListener("click", function (e) {
  const optionButton = e.target.closest(".subscription-option");

  if (!optionButton) return;

  const regularPrice = document.querySelector(".regular-price");
  const proPrice = document.querySelector(".pro-price");
  const businessPrice = document.querySelector(".business-price");

  if (optionButton.classList.contains("subscription-option-2")) {
    clickOptionAnimation(e, "right");
    regularPrice.textContent = "250";
    proPrice.textContent = "720";
    businessPrice.textContent = "894";
  } else if (optionButton.classList.contains("subscription-option-1")) {
    clickOptionAnimation(e, "left");

    regularPrice.textContent = "25";
    proPrice.textContent = "50";
    businessPrice.textContent = "149";
  }

  document.querySelectorAll(".subscription-option").forEach((button) => (button.style.color = "black"));
  e.target.style.color = "white";
});

subscriptionContainer.addEventListener("click", function (e) {
  const purchaseButton = e.target.closest(".purchase-button");

  if (!purchaseButton) return;

  openModal(modalSignUp);
});

// 10. Rating Slider
const ratingSlider = document.querySelectorAll(".slideer");
const smallCircle = document.querySelectorAll(".small-circle");
const ratingArrowButton = document.querySelector(".btn-arrow");
const mobileCardRating = document.querySelectorAll(".mobile-card-rating");
const mobileCardPos = [0, 110, 220, 330, 440, 550];

if (screen.width < 768) {
  smallCircle[mobileCardPos.findIndex((cardPos) => cardPos == 0)].style.backgroundColor = "black";
} else {
  const ratingSliderArr = [...ratingSlider];
  ratingSlider[0].style.transform = "translateX(0%)";
  ratingSlider[1].style.transform = "translateX(100%)";

  smallCircle[ratingSliderArr.findIndex((slider) => slider.style.transform == "translateX(0%)")].style.backgroundColor = "black";
}

const sliderHandler = function () {
  const transformTo = function (slide1Shift, slide2Shift, circleIndex) {
    ratingSlider[0].style.transform = `translateX(${slide1Shift}%)`;
    ratingSlider[1].style.transform = `translateX(${slide2Shift}%)`;

    smallCircle[circleIndex].style.backgroundColor = "black";
  };

  smallCircle.forEach((circle) => {
    circle.style.backgroundColor = "rgb(0, 0, 0, 0.2)";
  });

  if (ratingSlider[0].style.transform == "translateX(0%)") {
    transformTo(-100, 0, 1);
  } else {
    transformTo(0, 100, 0);
  }
};

const mobileSliderHandler = function (whatButton) {
  const transformTo = function () {
    mobileCardRating[0].style.transform = `translateX(${mobileCardPos[0]}%)`;
    mobileCardRating[1].style.transform = `translateX(${mobileCardPos[1]}%)`;
    mobileCardRating[2].style.transform = `translateX(${mobileCardPos[2]}%)`;
    mobileCardRating[3].style.transform = `translateX(${mobileCardPos[3]}%)`;
    mobileCardRating[4].style.transform = `translateX(${mobileCardPos[4]}%)`;
    mobileCardRating[5].style.transform = `translateX(${mobileCardPos[5]}%)`;
  };

  if (whatButton == "left") {
    if (mobileCardPos[0] == 0) {
      mobileCardPos[0] = -550;
      mobileCardPos[1] = -440;
      mobileCardPos[2] = -330;
      mobileCardPos[3] = -220;
      mobileCardPos[4] = -110;
      mobileCardPos[5] = 0;
    } else {
      mobileCardPos[0] += 110;
      mobileCardPos[1] += 110;
      mobileCardPos[2] += 110;
      mobileCardPos[3] += 110;
      mobileCardPos[4] += 110;
      mobileCardPos[5] += 110;
    }

    transformTo();
  } else if (whatButton == "right") {
    if (mobileCardPos[5] == 0) {
      mobileCardPos[0] = 0;
      mobileCardPos[1] = 110;
      mobileCardPos[2] = 220;
      mobileCardPos[3] = 330;
      mobileCardPos[4] = 440;
      mobileCardPos[5] = 550;
    } else {
      mobileCardPos[0] -= 110;
      mobileCardPos[1] -= 110;
      mobileCardPos[2] -= 110;
      mobileCardPos[3] -= 110;
      mobileCardPos[4] -= 110;
      mobileCardPos[5] -= 110;
    }
    transformTo();
  }

  smallCircle.forEach((circle) => {
    circle.style.backgroundColor = "rgb(0, 0, 0, 0.2)";
  });

  smallCircle[mobileCardPos.findIndex((cardPos) => cardPos == 0)].style.backgroundColor = "black";
};

ratingArrowButton.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-left")) {
    if (screen.width < 768) mobileSliderHandler("left");
    else sliderHandler();
  } else if (e.target.classList.contains("btn-right")) {
    if (screen.width < 768) mobileSliderHandler("right");
    else sliderHandler();
  }
});

// 11. Aksi pada tombol hamburger pada Device Mobile saat di-klik
const tombolHamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-group-link");

tombolHamburger.addEventListener("click", () => {
  tombolHamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) => {
  n.addEventListener("click", () => {
    tombolHamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// 12. Open Modal When Click Login Button On Mobile Device
mobileLoginButton.addEventListener("click", function (e) {
  e.preventDefault();

  openModal(modalLogin);
});

mobileSignupButton.addEventListener("click", function (e) {
  e.preventDefault();
  openModal(modalSignUp);
});

// Shadow pada judul 'ANTHROFAX berganti"
const anthrofax = document.querySelector(".logo h1");

setInterval(function () {
  const r = Math.round(Math.random() * 256);
  const g = Math.round(Math.random() * 256);
  const b = Math.round(Math.random() * 256);
  anthrofax.style.textShadow = `0 0 10px rgb(${r}, ${g}, ${b}), 0 0 20px rgb(${r}, ${g}, ${b}),0 0 30px rgb(${r}, ${g}, ${b})`;
}, 2000);
