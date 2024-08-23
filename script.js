/*Rules button functionality   */

let closeButton = document.getElementById("close-button");
let rules = document.querySelector(".rules");
let rulesButton = document.getElementById("rules-button");
let rulesContainer = document.querySelector(".rules-container");
let signLeft = document.querySelector(".hand-sign-1");
let signRight = document.querySelector(".hand-sign-2");
let signBottom = document.querySelector(".hand-sign-3");

let url = ["images/scissor.png", "images/paper.png", "images/stone.png"];
let yourChoiceStyle = ["hand-sign-1", "hand-sign-2", "hand-sign-3"];
let pcChoice, yourChoice, winner;

//Rules Section

closeButton.addEventListener("click", () => {
  rules.style.transformOrigin = "top right";
  rules.style.transform = "scale(0)";
  closeButton.style.transform = "scale(0)";
});

rulesButton.addEventListener("click", () => {
  rules.style.transform = "scale(1)";
  closeButton.style.transform = "scale(1)";
  closeButton.style.display = "flex";
});

function clickAnimation(sign) {
  document.querySelector(".line1").style.display = "none";
  document.querySelector(".line2").style.display = "none";
  document.querySelector(".line3").style.display = "none";

  signLeft.style.borderColor = "white";
  signRight.style.borderColor = "white";

  signLeft.style.transition = "1s ease";
  signRight.style.transition = "1s ease";
  signBottom.style.transition = "1s ease";

  signLeft.style.transform = "translateX(130px)";
  signRight.style.transform = "translateX(-128px)";

  if (sign == "scissor") {
    yourChoice = 0;
    signBottom.style.borderColor = "#0074b6";
    document.querySelector(".hand-sign-3 img").src = "images/scissor.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }
  if (sign == "paper") {
    yourChoice = 1;
    signBottom.style.borderColor = "#bd00ff";
    document.querySelector(".hand-sign-3 img").src = "images/paper.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }

  if (sign == "stone") {
    yourChoice = 2;
    signBottom.style.borderColor = "#ffa943";
    document.querySelector(".hand-sign-3 img").src = "images/stone.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }

  setTimeout(() => {
    signLeft.style.transition = "0s";
    signLeft.style.transform = "scale(0)";
    signBottom.style.transform = "translateX(-21.5vw) translateY(-180px)";
    signRight.style.transform = "translateX(16vw) translateY(50px)";
    signRight.style.width = "140px";
    signRight.style.height = "140px";
    signBottom.style.width = "140px";
    signBottom.style.height = "140px";

    signBottom.addEventListener("transitionend", () => {
      signLeft.style.transition = "0s";
      signRight.style.transition = "0s";
      signBottom.style.transition = "0s";
    });
  }, 500); // Adjust the delay to match your transition duration (0.5s)


  signLeft.removeEventListener("click", leftHandler);
  signRight.removeEventListener("click", rightHandler);
  signBottom.removeEventListener("click", bottomHandler);

  pcSelectionAnimation();
}

function leftHandler() {
  clickAnimation("scissor");
}
function rightHandler() {
  clickAnimation("paper");
}
function bottomHandler() {
  clickAnimation("stone");
}

signLeft.addEventListener("click", leftHandler);
signRight.addEventListener("click", rightHandler);
signBottom.addEventListener("click", bottomHandler);

function pcSelectionAnimation() {
  let img = document.querySelector(".hand-sign-2 img");

  setTimeout(() => {
    img.style.width = "100px";
    img.style.height = "100px";

    img.src = "images/loading.png";

    img.style.transition = "transform 2s linear";
    img.style.transform = "rotate(1200deg)";
  }, 1200);
  img.addEventListener("transitionend", () => {
    pcSelection();
    removeFirstScreen();
  });
}

function pcSelection() {
  pcChoice = getRandomNumber();
  let img = document.querySelector(".hand-sign-2 img");
  img.src = `${url[pcChoice]}`;
  if (pcChoice == 0) {
    img.style.width = "42px";
    img.style.height = "57px";
  }
  if (pcChoice == 1) {
    img.style.width = "72px";
    img.style.height = "72px";
  }
  if (pcChoice == 2) {
    img.style.width = "80px";
    img.style.height = "59px";
  }
}

function getRandomNumber() {
  let randomNumber = Math.ceil(Math.random() * 3);
  return randomNumber - 1;
}

function removeFirstScreen() {
  let element = document.querySelectorAll(".game");
  let halo = document.querySelectorAll(".halo");

  halo.forEach((element) => element.remove());
  element.forEach((element) => element.remove());

  addSecondScreen();
}

function addSecondScreen() {

  
  const linkElement = document.querySelector(
    'link[rel="stylesheet"][href="style.css"]'
  );

  // Change the href attribute to point to style2.css
  if (linkElement) {
    linkElement.href = "style2.css";
  }

  const container = document.createElement("div");
  winner = decideWinner();

  if (winner == "you") {
    container.innerHTML = `
  <div class="game-container">
    <div class="left-handsign-container">
    <div class="halo">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
    </div> 
      <div class="you-picked">YOU PICKED</div>
      <div class="hand-sign ${yourChoiceStyle[yourChoice]}" id="left">
          <img src="${url[yourChoice]}" />
        </div>
    </div>
        <div class="middle">
        <div class="you-win">YOU WIN</div>
        <div class="against-pc">AGAINST PC</div>
        <button class="play-again">PLAY AGAIN</button>
    </div>
    <div class="right-handsign-container">
             <div class="hand-sign ${yourChoiceStyle[pcChoice]}" id="right">
          <img src="${url[pcChoice]}"  />
        </div>
    </div>
  </div>`;
  }
  if (winner == "pc") {
    container.innerHTML = `
  <div class="game-container">
    <div class="left-handsign-container">
    
      <div class="you-picked">YOU PICKED</div>
      <div class="hand-sign ${yourChoiceStyle[yourChoice]}" id="left">
          <img src="${url[yourChoice]}" />
        </div>
    </div>
        <div class="middle">
        <div class="you-win">YOU LOST</div>
        <div class="against-pc">AGAINST PC</div>
        <button class="play-again">PLAY AGAIN</button>
    </div>
    <div class="right-handsign-container">
            <div class="halo">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <div class="circle3"></div>
            </div> 
             <div class="hand-sign ${yourChoiceStyle[pcChoice]}" id="right">
          <img src="${url[pcChoice]}"  />
        </div>
    </div>
  </div>`;
  }

  if (winner == "draw") {
    container.innerHTML = `
  <div class="game-container">
    <div class="left-handsign-container">
    
      <div class="you-picked">YOU PICKED</div>
      <div class="hand-sign ${yourChoiceStyle[yourChoice]}" id="left">
          <img src="${url[yourChoice]}" />
        </div>
    </div>
    <div class="middle">
        <div class="you-win">TIE UP</div>
        <button class="play-again">REPLAY</button>
    </div>
    <div class="right-handsign-container">
          <div class="hand-sign ${yourChoiceStyle[pcChoice]}" id="right">
          <img src="${url[pcChoice]}"  />
          </div>
    </div>
  </div>`;
  }

  document.body.appendChild(container);

  if (winner == "pc") {
    document.querySelector(".halo").style.left = "115px";
  }

  
  // let playAgain=document.querySelector('.play-again');

  // playAgain.addEventListener("click",()=>{

  // })
    startHaloAnimation();


}

function startHaloAnimation() {
  if (haloInterval) clearInterval(haloInterval);

  var haloInterval = setInterval(() => {
    haloAnimation();
  }, 1800);

  haloAnimation();
}

function haloAnimation() {
  let circles = document.querySelectorAll(".circle1, .circle2, .circle3");
  let reversedCircles = Array.from(circles).reverse();
  reversedCircles.forEach((circle, index) => {
    setTimeout(() => {
      circle.style.opacity = 1;
    }, index * 200 + 400);

    setTimeout(() => {
      circle.style.opacity = 0;
    }, index * 400 + 1200);
  });
}

function stopHaloAnimation() {
  clearInterval(haloInterval);
  haloInterval = null;
}

function decideWinner() {
  if (yourChoice == 0) {
    if (pcChoice == 1) {
      winner = "you";
    } else winner = "pc";
  }
  if (yourChoice == 1) {
    if (pcChoice == 2) {
      winner = "you";
    } else winner = "pc";
  }
  if (yourChoice == 2) {
    if (pcChoice == 0) {
      winner = "you";
    } else winner = "pc";
  }
  if (yourChoice == pcChoice) {
    winner = "draw";
  }
  return winner;
}
