const nav = document.querySelector(".nav");
const allBanefitsContent = document.querySelectorAll(".banefits-content");
const modalSignUp = document.querySelector(".modal");
const modalLogin = document.querySelector(".modal2");
const bluryBackground = document.querySelector(".overlay");
const btnCloseModal = document.querySelectorAll(".btn--close-modal");
const faqContainer = document.querySelector(".faq-boxes");

const navLinkHandler = function (mouseIn, event) {
  const logo = document.querySelector(".logo h1");
  const loginButton = nav.lastElementChild.querySelectorAll("button");

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
    const navLinks = event.currentTarget.querySelectorAll(".nav-link");

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
  }
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
  }
  //   if (e.target.classList.contains("nav-link")) {
  //     const id = e.target.getAttribute("href");
  //     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  //   }
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

  const eachContent = [...entry.target.children];
  eachContent.forEach((content) => {
    if (content.classList.contains("banefits-hidden-1")) content.classList.remove("banefits-hidden-1");
    else content.classList.remove("banefits-hidden-2");
  });

  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
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
  button.addEventListener("click", function () {
    if (button.parentElement.classList.contains("modal")) closeModal(modalSignUp);
    else if (button.parentElement.classList.contains("modal2")) closeModal(modalLogin);
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

// FAQ Event
faqContainer.addEventListener("click", function (event) {
  if (!event.target.closest(".faq-question")) return;

  if (event.target.closest(".faq-question").classList.contains("faq-question")) {
    if (event.target.closest(".faqbox").lastElementChild.classList.contains("disappear")) event.target.closest(".faqbox").lastElementChild.classList.remove("disappear");
    else event.target.closest(".faqbox").lastElementChild.classList.add("disappear");
  }
});
