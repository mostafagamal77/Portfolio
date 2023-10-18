// Selection of Elements in HTML
const toggleMenu = document.querySelector(".toggle-menu"),
  secondBar = document.querySelector(".second"),
  menu = document.querySelector(".menu"),
  scrollTop = document.querySelector(".scroll-top"),
  jop = document.querySelector(".title"),
  techProgress = document.querySelectorAll(".progress .span"),
  progressNum = document.querySelectorAll(".progress .number"),
  circularProgress = document.querySelectorAll(".circular-progress"),
  progressValue = document.querySelectorAll(".progress-value"),
  skillsSection = document.querySelector("#skills"),
  categories = document.querySelectorAll(".categories li"),
  projects = document.querySelectorAll(".project-card"),
  darkToggle = document.getElementById("dark-mode"),
  darkLabel = document.querySelector(".dark-toggle"),
  darkSpan = document.querySelector(".dark-toggle span"),
  inputs = document.querySelectorAll(".input"),
  submitBtn = document.querySelector(".submit");

// ========== Start Dark mode ==========

window.onload = () => {
  if (localStorage.getItem("darkmode")) {
    document.body.classList.add("dark");
    darkLabel.style.backgroundColor = "#fff";
    darkSpan.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  } else {
    document.body.classList.remove("dark");
  }
  if (localStorage.getItem("checked")) {
    darkToggle.checked = true;
  }
};
function darkMode() {
  darkToggle.addEventListener("click", () => {
    if (darkToggle.checked) {
      document.body.classList.add("dark");
      darkLabel.style.backgroundColor = "#fff";
      darkSpan.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      localStorage.setItem("darkmode", "dark");
      localStorage.setItem("checked", "true");
    } else {
      document.body.classList.remove("dark");
      darkSpan.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      localStorage.removeItem("darkmode", "dark");
      localStorage.removeItem("checked", "true");
    }
  });
}
darkMode();
// ========== End Dark mode  ==========

// ========== Start toggle menu ==========
toggleMenu.onclick = () => {
  menu.classList.toggle("toggle");
  toggleMenu.classList.toggle("close");
};
menu.addEventListener("click", () => {
  menu.classList.remove("toggle");
  toggleMenu.classList.remove("close");
});
// ========== End toggle menu ==========

// ========== Start Scroll Top ==========
scrollTop.onclick = () => {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
};
// ========== End Scroll Top ==========

// ========== Start Typewriter ==========
const typeWriter = () => {
  setTimeout(() => {
    jop.textContent = "frontend developer";
  }, 0);
  setTimeout(() => {
    jop.textContent = "web designer";
  }, 4000);
};
typeWriter();
setInterval(typeWriter, 8000);
// ========== End Typewriter ==========

// ========== Start skills progress ==========
// technical progress
function technicalProgress() {
  for (let i = 0; i < techProgress.length; i++) {
    let width = 0;
    let progress = setInterval(() => {
      width++;
      techProgress[i].style.width = `${width}%`;
      progressNum[i].textContent = `${width}%`;
      if (width == techProgress[i].dataset.width) {
        clearInterval(progress);
      }
    }, 1000 / techProgress[i].dataset.width);
  }
}

// Personal Progress
let speed = 10,
  start = false;
function personalProgress() {
  for (let i = 0; i < progressValue.length; i++) {
    let progressValueStart = 0;
    let progressValueEnd = progressValue[i].dataset.progress;
    let progress = setInterval(() => {
      progressValueStart++;
      progressValue[i].textContent = `${progressValueStart}%`;
      circularProgress[
        i
      ].style.background = `conic-gradient(var(--main-color) ${
        progressValueStart * 3.6
      }deg, var(--main-color-light) 0deg)`;
      if (progressValueStart == progressValueEnd) {
        clearInterval(progress);
      }
    }, speed);
  }
}

window.onscroll = () => {
  // Show button to scroll to top
  if (window.scrollY >= 600) {
    scrollTop.style.display = "block";
  } else {
    scrollTop.style.display = "none";
  }

  // Show progress functions on scroll
  if (window.scrollY >= skillsSection.offsetTop - 300) {
    if (!start) {
      technicalProgress();
      personalProgress();
    }
    start = true;
  }
};
// ========== End skills progress ==========

// ========== Start Slider ==========
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 15,
  slidesPerGroup: 1,
  loop: true,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    520: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3
    }
  }
});
// ========== End Slider ==========

// ========== Start Works ==========
categories.forEach((li) => {
  li.addEventListener("click", () => {
    // remove active class from all lis
    categories.forEach((el) => {
      el.classList.remove("active");
    });
    // add active class to this li
    li.classList.add("active");
    projects.forEach((p) => {
      // hide all elements
      p.style.display = "none";
      // display project that contains class name the same to li dataset
      p.classList.forEach((e) => {
        if (li.dataset.category == e) {
          p.style.display = "block";
        }
      });
    });
  });
});
// ========== End Works ==========

// ========== Start Contact ==========
function addFocus() {
  let inputParent = this.parentNode;
  inputParent = inputParent.classList.add("focus");
}

function removeFocus() {
  let inputParent = this.parentNode;
  if (this.value == "") {
    inputParent = inputParent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addFocus);
  input.addEventListener("blur", removeFocus);
});

// Emailjs
function sendEmail() {
  (function () {
    emailjs.init("wN-yBO86BImXHGIPd");
  })();
  var params = {
    from_name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };
  const serviceId = "service_flto4rx",
    templateId = "template_dzwv5y7";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
      console.log(res);
      alert("your message was sent");
    })
    .catch((err) => console.log("error"));
}
// ========== End Contact ==========
