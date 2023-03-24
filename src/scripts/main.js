// document.addEventListener("loadeddata", () => {
const yearElement = document.getElementById("year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
yearElement.innerText = currentYear.toString();

const containers = [
  ...document.querySelectorAll(".reveal"),
  ...document.querySelectorAll(".reveal-left"),
  ...document.querySelectorAll(".reveal-300"),
  ...document.querySelectorAll(".reveal-600"),
  ...document.querySelectorAll(".reveal-right")
];
const windowHeight = window.innerHeight;

function reveal() {
  containers.forEach((container) => {
    const containerTop = container.getBoundingClientRect().top;
    if (containerTop < windowHeight) {
      container.classList.add("reveal-show");
    }
  });
}

window.addEventListener("scroll", reveal);

const scroller = document.getElementById("scroll-down");

scroller.addEventListener("click", (e) =>
  window.scrollBy({
    top: windowHeight * 0.66,
    left: 0
  })
);

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navigation");
const backdropMenu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

backdropMenu.addEventListener("click", (e) => {
  if (e.target.id === "menu" && nav.classList.contains("active"))
    nav.classList.remove("active");
});

const openModalButtonCollection = document.querySelectorAll(
  '[data-modal="open-modal"]'
);

const modalBackground = document.getElementById("modal-background");
const modal = document.getElementById("modal");
const modalForm = document.getElementById("modal-form");

openModalButtonCollection.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalBackground.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.classList.add("animate__animated", "animate__fadeIn");
  })
);

// Hide modal when background is clicked
modalBackground.addEventListener("click", function () {
  closeModal();
});

// Hide modal when close button is clicked
const closeButton = document.createElement("button");
closeButton.innerHTML = "X";
closeButton.classList.add(
  "absolute",
  "top-0",
  "right-0",
  "m-3",
  "text-gray-700",
  "hover:text-red-500"
);
modal.prepend(closeButton);

closeButton.addEventListener("click", function () {
  closeModal();
});

// Hide modal and submit form when form is submitted
modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  closeModal();
  // add your form submission logic here
});

function closeModal() {
  modal.classList.remove("animate__fadeIn");
  modal.classList.add("animate__animated", "animate__fadeOut");
  setTimeout(function () {
    modalBackground.classList.add("hidden");
    modal.classList.add("hidden");
    modal.classList.remove("animate__fadeOut");
  }, 500);
}
