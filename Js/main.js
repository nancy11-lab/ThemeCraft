// Start settings-box

// select i Element Settings
document.querySelector(".settings-box .toggle-settings i").onclick =
  function () {
    this.classList.toggle("fa-spin");

    // Toggle Class open on Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
  };

// Check if theres local storage has color-option
let mainColors = window.localStorage.getItem("color-option");

if (mainColors !== null) {
  //console.log('local Storage is not Empty');
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Check for Active Class
  document.querySelectorAll(".settings-box .colors-list li").forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === mainColors) {
      li.classList.add("active");
    }
  });
}

// Random background Option
let backgroudOption = true;
// variable To Control Background Interval Interval
let backgroundInterval;

// check if theres local storage Random background item
let backgroundLocalItem = window.localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  //console.log('not Empty');
  //console.log(backgroundLocalItem);
  //console.log(typeof(backgroundLocalItem));

  if (backgroundLocalItem === "true") {
    backgroudOption = true;
  } else {
    backgroudOption = false;
  }

  // Check for Active Class
  document
    .querySelectorAll(".settings-box .random-background span")
    .forEach((span) => {
      // Remove active class from All Spans
      span.classList.remove("active");
    });

  if (backgroundLocalItem === "true") {
    document
      .querySelector(".settings-box .random-background .yes")
      .classList.add("active");
  } else if (backgroundLocalItem === "false") {
    document
      .querySelector(".settings-box .random-background .no")
      .classList.add("active");
  }
}

// Switcs Colors
let colorsLi = document.querySelectorAll(".settings-box .colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    //Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    window.localStorage.setItem("color-option", e.target.dataset.color);

    handleActive(e);
  });

  /*--------------------anthor way by Use (this Keyword)---------------------------*/
  //   li.onclick = function () {
  //     colorsLi.forEach((li) => {
  //       li.classList.remove("active");
  //     });

  //     this.classList.add("active");

  //     //console.log(this.dataset.color);
  //     document.documentElement.style.setProperty(
  //       "--main-color",
  //       this.dataset.color
  //     );

  //     // Set Color On Local Storage
  //     window.localStorage.setItem("color-option", this.dataset.color);
  //   };
});

// Switc Random Background option
let randomBackgroundEle = document.querySelectorAll(
  ".settings-box .random-background span"
);

// Loop On All Spans
randomBackgroundEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    // // Remove Active Class From All spans
    // e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    //   ele.classList.remove("active");
    // });

    // // Add Active Class on span click
    // e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      //console.log('yes');
      backgroudOption = true;
      //console.log(backgroudOption);
      randomizeImgs();

      window.localStorage.setItem("background_option", true);
    } else {
      //console.log('No');
      backgroudOption = false;
      //console.log(backgroudOption);
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});

// End settings-box

/************************************************************ */
// start landing-page

// Select Elements
let landingPage = document.querySelector(".landing-page");

let backgroundImgs = ["01.jpg", "07.jpg", "03.jpg", "05.jpg", "06.jpg"];

randomizeImgs();

function randomizeImgs() {
  if (backgroudOption) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * backgroundImgs.length);
      // console.log(randomNumber);

      landingPage.style.backgroundImage = `url('../images/${backgroundImgs[randomNumber]}')`;
    }, 10000);
  }
}

// Select All lis in Header
let allLinks = document.querySelectorAll(".landing-page header ul li a");
// console.log(allLinks);
// Trigger function scrollToSection()
scrollToSection(allLinks);

// End landing-page
/****************************************************************** */
// Start Our Skills

// Select Skills Element
let ourSkills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .progress span");

// window.onscroll = function () {

//   // Skills Offset Top
//   let skillsOffsetTop = ourSkills.offsetTop;
//   console.log(skillsOffsetTop);//994

//   // Skills Outer Height
//   let skillsOuterHeight = ourSkills.offsetHeight;
//   console.log(skillsOuterHeight);//540

//   // Window Height
//   let windowHeight = this.innerHeight;
//   console.log(windowHeight);//641

//   // Window ScrollTop
//   let windowScrollTop = this.pageYOffset;// == this.scrollY
//   console.log(windowScrollTop);//893

//   if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

//     console.log("reached")

//     spans.forEach(skill => {

//       skill.style.width = skill.dataset.progress;

//     });

//   }

// };

window.addEventListener("scroll", skillprogress);

function skillprogress() {
  //console.log(window.scrollY);

  if (window.scrollY >= ourSkills.offsetTop - 250) {
    //console.log("reached");

    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
}

// End Our Skills
/******************************************************************** */
// Start Gallery
// Create Popup with the Image

// Select images Array
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((image) => {
  //console.log(image);

  image.addEventListener("click", () => {
    // Create overlay Element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create Popup Element
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    // Create img and append on popupBox

    let popupImg = document.createElement("img");
    popupImg.src = image.src;

    // Check  alt Attribute
    if (image.alt !== null) {
      // Create Heading Image
      let imgHeading = document.createElement("h3");

      let imgText = document.createTextNode(image.alt);

      imgHeading.appendChild(imgText);

      // Append imgHeading to popupBox

      popupBox.appendChild(imgHeading);
    }
    // Append img to popupBox
    popupBox.appendChild(popupImg);

    // Create Close Span
    let closeBtn = document.createElement("span");

    let closeBtnText = document.createTextNode("X");

    closeBtn.appendChild(closeBtnText);

    closeBtn.className = "close-btn";

    // Append closeBtn to popupBox

    popupBox.appendChild(closeBtn);

    // Append  popupBox to body
    document.body.appendChild(popupBox);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    // Remove the Current popup
    e.target.parentElement.remove();

    // Remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// End Gallery
/***************************************************************** */
// Start Nav Bullets

// Select Nav Bullet
let navBullet = document.querySelector(".nav-bullets");

createBullets(allLinks);

// Create Bullets
function createBullets(allLinks) {
  allLinks.forEach((link) => {
    //console.log(link.dataset.section)

    // create Div Bullet
    let bulletDiv = document.createElement("div");
    bulletDiv.className = "bullet";
    bulletDiv.setAttribute("data-section", link.dataset.section);

    // Create Tooltip Div
    let tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltip";

    let tolltipText = document.createTextNode(`${link.dataset.section}`);
    tooltipDiv.appendChild(tolltipText);

    // Append tooltipDiv to bulletDiv
    bulletDiv.appendChild(tooltipDiv);

    // Append  bulletDiv to navBullet
    navBullet.appendChild(bulletDiv);
  });
}

// Select All Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Trigger function scrollToSection()
scrollToSection(allBullets);

// End Nav Bullets

// control Bullets (show or hidden) in Settings-box

let bulletsSpan = document.querySelectorAll(
  ".settings-box .bullets-option span"
);

let bulletLocalItem = window.localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  //console.log("not empty");

  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    navBullet.style.display = "block";

    document
      .querySelector(".settings-box .bullets-option .yes")
      .classList.add("active");
  } else {
    navBullet.style.display = "none";
    document
      .querySelector(".settings-box .bullets-option .no")
      .classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      navBullet.style.display = "block";

      window.localStorage.setItem("bullets-option", "block");
    } else {
      navBullet.style.display = "none";
      window.localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Create Function scroll to Target Section Smooth
function scrollToSection(arrayofElements) {
  arrayofElements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      //console.log(document.querySelector(`.${e.target.dataset.section}`));

      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Create Handle Active function
function handleActive(eve) {
  // Remove Active Class From All spans
  eve.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });

  // Add Active Class on span click
  eve.target.classList.add("active");
}

// Toggle Menu
let toggleButtton = document.querySelector(".landing-page .toggle-menue ");
let toggleLinks = document.querySelector(".landing-page ul");

toggleButtton.onclick = function (e) {
  // Stop propagation
  e.stopPropagation();

  toggleLinks.classList.toggle("open");
};

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  //console.log(e.target);

  if (e.target !== toggleButtton && e.target !== toggleLinks) {
    //console.log("this is not Button and notbthe Menu");

    // Check if menu Is open
    if (toggleLinks.classList.contains("open")) {
      toggleLinks.classList.toggle("open");
    }
  }
});

// Stop propagation on Menu
toggleLinks.onclick = function (e) {
  e.stopPropagation();
};

// Add Settings Box Option (Header Fixed Or No)
let myHeader = document.querySelector(".landing-page .container");
let scrollHeader = document.querySelectorAll(
  ".settings-box .scroll-header span"
);
//console.log(scrollHeader);

let scrolloption = window.localStorage.getItem("scroll-option");

if (scrolloption !== null) {
  scrollHeader.forEach((span) => {
    span.classList.remove("active");
  });

  if (scrolloption === "yes") {
    document
      .querySelector(".settings-box .scroll-header .yes")
      .classList.add("active");

    myHeader.classList.add("fixeed");
  } else {
    myHeader.classList.remove("fixeed");
    document
      .querySelector(".settings-box .scroll-header .no")
      .classList.add("active");
  }
}

scrollHeader.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.scroll === "yes") {
      myHeader.classList.add("fixeed");
      window.localStorage.setItem("scroll-option", "yes");
    } else {
      myHeader.classList.remove("fixeed");
      window.localStorage.setItem("scroll-option", "no");
    }

    handleActive(e);
  });
});

// Background Theme Ligth or Dark
const themeSwitch = document.querySelector(".background-theme span");

let darkmode = localStorage.getItem("darkmode");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// Reset Button
document.querySelector(".settings-box .reset-options").onclick = function () {
  // window.localStorage.clear();

  window.localStorage.removeItem("background_option");
  window.localStorage.removeItem("color-option");
  window.localStorage.removeItem("bullets-option");
  window.localStorage.removeItem("scroll-option");
  window.localStorage.removeItem("darkmode");

  window.location.reload();
};
