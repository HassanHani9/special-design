//check if there is color in local storage to apply
if (window.localStorage.getItem("color")) {
  //change the color in the html root
  document.documentElement.style.setProperty(
    "--color",
    window.localStorage.getItem("color")
  );
}
//selectiong landing page
let landingPage = document.querySelector(".landing");
let imageArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
//variable for the conditon of the background
let imageCondition = true;
//variable for the interval inside the fuction
let randomInterval;

//check if there is any background option in local storage
if (window.localStorage.getItem("background-opt")) {
  if (window.localStorage.getItem("background-opt") === "false") {
    imageCondition = false;
  } else {
    imageCondition = true;
  }
  // remove all class lists from button
  document
    .querySelectorAll(".setting-container .background-sec .button")
    .forEach((element) => {
      element.classList.remove("active");
    });
  // butting the active class on the active button in local storage
  if (window.localStorage.getItem("background-opt") === "false") {
    document
      .querySelector(".setting-container .background-sec-buttons .no")
      .classList.add("active");
  } else {
    document
      .querySelector(".setting-container .background-sec-buttons .yes")
      .classList.add("active");
  }
}
// console.log(document.querySelector('.setting-container .background-sec-buttons .no'))
//function for random image
function randomImage() {
  if (imageCondition === true) {
    randomInterval = setInterval(() => {
      landingPage.style.backgroundImage =
        'url("/images/' +
        imageArr[Math.floor(Math.random() * imageArr.length)] +
        '")';
    }, 10000);
  }
}

// turn active class on when i click on the yes/no button
let randomImageButtons = document.querySelectorAll(
  ".setting-container .background-sec .button"
);
randomImageButtons.forEach(function (button) {
  button.addEventListener("click", function (b) {
    // remove class list from all
    b.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    button.classList.add("active");
    // console.log(window.localStorage.getItem('background-opt'))

    if (b.target.dataset.status === "yes") {
      imageCondition = true;
      window.localStorage.setItem("background-opt", true);

      randomImage();
    } else {
      imageCondition = false;
      window.localStorage.setItem("background-opt", false);
      clearInterval(randomInterval);
    }
  });
});
randomImage();

//make the gear spin when click on it
let settGearSpan = document.querySelector(".setting-box .gear");
let gear = document.querySelector(".setting-box span:first-of-type i");
let settBox = document.querySelector(".setting-box");
settGearSpan.onclick = function () {
  gear.classList.toggle("fa-shake");
  settBox.classList.toggle("open");
};
//add active class on the color you click in
let colors = document.querySelectorAll(".setting-container .color-sec ul li");
colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--color",
      e.target.dataset.color
    );
    //set color in local storage
    window.localStorage.setItem("color", e.target.dataset.color);
    //remove active class from lis
    e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
      ele.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
//if there insturctures for bullets in local storage
let bulletCondition;
let bullet = document.querySelector(".landing .bullets");
let bulltesButtons = document.querySelectorAll(
  ".setting-container .bullet-sec .button"
);
if (window.localStorage.getItem("show")) {
  bulltesButtons.forEach((bullet) => {
    if (bullet.classList.contains("active")) {
      bullet.classList.remove("active");
    }
  });
  if (window.localStorage.getItem("show") === "yes") {
    bulletCondition = true;
    bullet.style.display = "block";
    document
      .querySelector(".setting-container .bullet-sec .button.yes")
      .classList.add("active");
  } else {
    bulletCondition = false;
    document
      .querySelector(".setting-container .bullet-sec .button.no")
      .classList.add("active");
    bullet.style.display = "none";
  }
}
//show or hide bullets section

bulltesButtons.forEach((e) => {
  e.addEventListener("click", (button) => {
    if (button.target.dataset.status === "no") {
      bullet.style.display = "none";
      window.localStorage.setItem("show", "no");
      document
        .querySelector(".setting-container .bullet-sec .button.yes")
        .classList.remove("active");
      document
        .querySelector(".setting-container .bullet-sec .button.no")
        .classList.add("active");
    } else {
      bullet.style.display = "block";
      window.localStorage.setItem("show", "yes");
      document
        .querySelector(".setting-container .bullet-sec .button.no")
        .classList.remove("active");
      document
        .querySelector(".setting-container .bullet-sec .button.yes")
        .classList.add("active");
    }
  });
});

// reset option
let resetButton = document.querySelector(".setting-container .reset");

resetButton.addEventListener("click", () => {
  window.localStorage.setItem("color", "#ff9800");
  window.localStorage.setItem("background-opt", "true");
  window.localStorage.setItem("show", "yes");
  location.reload();
});

// select skills section
let ourSkills = document.querySelector("#skills");

window.onscroll = () => {
  // كل اللى فوق السكشن
  let skillOffsetTop = ourSkills.offsetTop;

  // skills hieght
  let skillsHieght = ourSkills.offsetHeight;

  let windowHieght = this.innerHeight;

  let windowscroll = this.scrollY;
  //selecting all spans
  let allSpans = document.querySelectorAll(
    ".ourskills .container .skill .skillprogress span"
  );

  if (windowscroll > skillOffsetTop + skillsHieght - windowHieght) {
    allSpans.forEach((span) => {
      span.style = `width:${span.dataset.progress};`;
    });
  }
};
// pop up photo
let allImages = document.querySelectorAll(".gallery .container img");
allImages.forEach((image) => {
  image.addEventListener("click", (e) => {
    // create parent div
    let parent = document.createElement("div");
    parent.classList.add("popup");
    //create container div
    let container = document.createElement("div");
    container.classList.add("popup-container");
    //create heading
    let h2 = document.createElement("h2");
    //create img
    let newImage = document.createElement("img");
    newImage.setAttribute("src", e.target.getAttribute("src"));
    //create close button
    let X = document.createElement("span");
    X.classList.add("remove");
    X.innerText = `X`;
    //append heading ,image and button to the container
    container.append(h2, newImage, X);
    //append container to parent div
    parent.appendChild(container);
    //append parent div to the page
    document.body.appendChild(parent);
    //adding alt text to heading
    h2.innerText = e.target.getAttribute("alt");
    //create the close function to the button
    X.addEventListener("click", () => {
      X.parentElement.parentElement.remove();
    });
  });
});
// fdfdf
gfgfg;
