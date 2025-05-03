let usersBtn = document.querySelector("#users-btn");
let oneBtn= document.querySelector("#one-btn");
let twoBtn = document.querySelector("#two-btn");
let threeBtn = document.querySelector("#three-btn");
let fourBtn = document.querySelector("#four-btn");

let usersScreen = document.querySelector("#users-screen");
let oneScreen = document.querySelector("#one-screen");
let twoScreen = document.querySelector("#two-screen");
let threeScreen = document.querySelector("#three-screen");
let fourScreen = document.querySelector("#four-screen");

let screens = document.querySelectorAll(".screen");
let navBarBtn = document.querySelectorAll(".nav-bar-btn");

const interactionSqS = [
    {
        target: usersBtn,
        trigger: usersScreen
    },
    {
        target: oneBtn,
        trigger: oneScreen
    },
    {
        target: twoBtn,
        trigger: twoScreen
    },
    {
        target: threeBtn,
        trigger: threeScreen
    },
    {
        target: fourBtn,
        trigger: fourScreen
    }
];

function initializeScreens() {
    screens.forEach(screen => screen.style.display = "none");
    usersScreen.style.display = "block";
    navBarBtn.forEach(btn => btn.style.backgroundColor = "rgb(44, 46, 45)");
    usersBtn.style.backgroundColor = "black";
}

function setupNavbarClicks() {
    interactionSqS.forEach(({ target, trigger }) => {
        target.addEventListener("click", () => {
            screens.forEach(screen => screen.style.display = "none");
            navBarBtn.forEach(btn => btn.style.backgroundColor = "rgb(44, 46, 45)");
            trigger.style.display = "block";
            target.style.backgroundColor = "black";
        });
        target.addEventListener("dragstart", (e) => e.preventDefault());
    });
}

initializeScreens();
setupNavbarClicks();
