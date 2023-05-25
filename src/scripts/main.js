// document.addEventListener("loadeddata", () => {
const yearElement = document.getElementById("year");
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
yearElement.innerText = currentYear.toString();

const dateInput = document.getElementById("date");

// Disable Mondays in the calendar
const closeAlertBtn = document.getElementById("closeAlert");
const bookAlert = document.getElementById("bookAlert");

// Disable Mondays in the calendar
dateInput.addEventListener("input", (e) => {
  const selectedDate = new Date(e.target.value);
  if (selectedDate.getDay() === 1) {
    bookAlert.classList.remove("hidden");
    e.target.value = "";
  }
});

closeAlertBtn.addEventListener("click", (e) => {
  bookAlert.classList.add("hidden");
});

const containers = [
  ...document.querySelectorAll(".reveal"),
  ...document.querySelectorAll(".reveal-left"),
  ...document.querySelectorAll(".reveal-300"),
  ...document.querySelectorAll(".reveal-600"),
  ...document.querySelectorAll(".reveal-right")
];
const windowHeight = window.innerHeight;

if (containers.length > 0) {
  function reveal() {
    containers.forEach((container) => {
      const containerTop = container.getBoundingClientRect().top;
      if (containerTop < windowHeight) {
        container.classList.add("reveal-show");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  document.addEventListener("DOMContentLoaded", reveal);
}

const scroller = document.getElementById("scroll-down");

if (scroller) {
  scroller.addEventListener("click", (e) =>
    window.scrollBy({
      top: windowHeight * 0.66,
      left: 0
    })
  );
}

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
closeButton.innerHTML =
  '<span class="bar"></span><span class="bar"></span>';
closeButton.classList.add(
  "close-button",
  "absolute",
  "md:top-0",
  "md:right-0",
  "top-12",
  "right-4",
  "m-4",
  "text-gray-700",
  "hover:text-red-500"
);
modal.prepend(closeButton);

closeButton.addEventListener("click", function () {
  closeModal();
});

// Hide modal and submit form when form is submitted
const loader = document.getElementById("loader");
const modalFormContainer = document.getElementById(
  "modal-form-container"
);

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loader.classList.add("loader-active");

  setTimeout(() => {
    loader.classList.remove("loader-active");
    modalFormContainer.innerHTML =
      '        <h3 class="mb-4 text-3xl font-bold">REZERWACJA ZOSTAŁA PRZESŁANA</h3>\n' +
      '        <p class="max-w-md text-center">\n' +
      "          Dziękujemy za wybór naszej restauracji, skontaktujemy się z\n" +
      "          Państwem najszybciej jak to będzie możliwe w celu\n" +
      "          potwierdzenia szczegółów rezerwacji.\n" +
      "        </p>\n" +
      "        <img\n" +
      '          alt="ozdobny separator"\n' +
      '          class="my-6"\n' +
      '          src="assets/separator.svg"\n' +
      "        />\n" +
      '        <a class="button button--primary" href="/"\n' +
      "          ><span>WRÓĆ DO STRONY GŁÓWNEJ</span></a\n" +
      "        >";
  }, 1000);
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

// Gallery

const gallery = document.getElementById("gallery");
const tabs = document.querySelectorAll(".gallery__tab");
const items = document.querySelectorAll(".gallery__item");
const loadMoreButton = document.getElementById("loadMoreButton");

if (gallery) {
  const perPage = 6;
  let images = [];
  let totalCount = 0;
  let currentPage = 1;
  let offset = 0;

  const spinner = document.createElement("span");
  const getImagesByCategory = async (category) => {
    try {
      const res = await fetch(
        `https://farina.com.pl/new2023/wp-json/gallery/v1/category/${category}`
      );
      const { gallery } = await res.json();
      const [{ images: data }] = gallery;
      const images = data;

      return images.map((img) => {
        return {
          id: img.id,
          alt: img.alt,
          title: img.title,
          urls: img.sizes
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  const render = () => {
    const offsetImages = images.slice(offset, perPage * currentPage);

    if (offsetImages.length > 0) {
      offsetImages.forEach((img) => {
        const galleryItem = document.createElement("a");
        galleryItem.classList.add("gallery__item");
        galleryItem.href = img.urls["2048x2048"];
        const galleryImg = document.createElement("img");
        galleryImg.src = img.urls.large;
        galleryImg.alt = img?.alt || img.title;
        galleryItem.append(galleryImg);
        gallery.append(galleryItem);
      });
    }
    spinner.remove();
  };

  loadMoreButton.addEventListener("click", () => {
    currentPage++;
    offset = offset + perPage;

    const limit = Math.ceil(totalCount / 6);
    if (limit > currentPage) {
      loadMoreButton.style.display = "block";
    }

    if (limit === currentPage) {
      loadMoreButton.style.display = "none";
    }
    render();
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", async () => {
      totalCount = 0;
      currentPage = 1;
      offset = 0;
      images = [];

      gallery.innerHTML = "";

      spinner.classList.add("spinner");
      gallery.append(spinner);

      tabs.forEach((tab) =>
        tab.classList.remove("gallery__tab--active")
      );

      tab.classList.add("gallery__tab--active");

      items.forEach((item) => (item.style.display = "none"));
      // Show items with matching data-tab attribute
      const selectedTab = tab.getAttribute("data-gallery");

      images = await getImagesByCategory(selectedTab);
      totalCount = images.length;

      const limit = Math.ceil(totalCount / 6);
      if (limit > currentPage) {
        loadMoreButton.style.display = "block";
      }

      render();
    });
  });

  gallery.onclick = function (event) {
    const target = event.target;
    const link = target.src ? target.parentNode : target;
    const options = { index: link, event: event };
    const links = this.getElementsByTagName("a");
    blueimp.Gallery(links, options);
  };

  tabs[0].click();
}

const lazyVideos = document.querySelectorAll(".lazy-video");

const options = {
  rootMargin: "0px",
  threshold: 0.5
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const src = video.getAttribute("data-src");

      video.src = src;
      video.load();
      video.play();

      observer.unobserve(video);
    }
  });
};

const observer = new IntersectionObserver(callback, options);

lazyVideos.forEach((video) => {
  observer.observe(video);
});

const container = document.getElementById("container");
const containerMiddleTop = document.getElementById(
  "container-middle-top"
);
const backgroundTop = document.getElementById("background");
const backgroundMiddleTop = document.getElementById(
  "background-middle-top"
);

const updateBackgroundPosition = (container, background) => {
  if (window.innerWidth >= 1024) {
    background.style.width =
      container.offsetLeft + container.offsetWidth / 2 + 15 + "px";
  } else {
    background.style.width = "100%";
  }
};

if (container) {
  window.addEventListener("resize", () =>
    updateBackgroundPosition(container, backgroundTop)
  );
  document.addEventListener("DOMContentLoaded", () =>
    updateBackgroundPosition(container, backgroundTop)
  );
}
if (backgroundMiddleTop) {
  window.addEventListener("resize", () =>
    updateBackgroundPosition(containerMiddleTop, backgroundMiddleTop)
  );
  document.addEventListener("DOMContentLoaded", () =>
    updateBackgroundPosition(containerMiddleTop, backgroundMiddleTop)
  );
}

const hideOnScroll = document.querySelector(".hide-on-scroll");

if (hideOnScroll) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= nav.getBoundingClientRect().height) {
      hideOnScroll.classList.add("hide");
    }
    if (window.scrollY < nav.getBoundingClientRect().height) {
      hideOnScroll.classList.remove("hide");
    }
  });
}
