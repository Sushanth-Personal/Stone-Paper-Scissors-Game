/**######################################################################################## */
//SECTION : INFORMATION
/**######################################################################################## */
/*
 *
 *
 * AUTHOR    : SUSHANTH P
 *
 * MAIL ID   : sushanthp.calicut@gmail.com
 *
 * TITLE     : STONE PAPER SCISSORS GAME SCRIPT
 *
 *
 */

/**######################################################################################## */
//SECTION : GLOBAL VARIABLE DECLARATION
/**######################################################################################## */

// Arrays for storing image URLs and corresponding styles
let url = ["images/scissor.png", "images/paper.png", "images/stone.png"];
let yourChoiceStyle = ["hand-sign-1", "hand-sign-2", "hand-sign-3"];
let pcChoice, yourChoice, winner; // Variables for storing choices and winner
let pcCurrentScore, yourCurrentScore;
let gameOver = false;
let currentPage = 1;
/**######################################################################################## */
//SECTION : GLOBAL ELEMENT / QUERY / CLASSNAME / ID DECLARATION
/**######################################################################################## */

// Element selectors for rules section and game elements
let closeButton = document.getElementById("close-button");
let rules = document.querySelector(".rules");
let rulesButton = document.getElementById("rules-button");
let rulesContainer = document.querySelector(".rules-container");
let signLeft = document.querySelector(".hand-sign-1");
let signRight = document.querySelector(".hand-sign-2");
let signBottom = document.querySelector(".hand-sign-3");

/**######################################################################################## */
//SECTION : FUNCTIONS DEFINITION
/**######################################################################################## */

/****************************************************************************************** */
/*  Function Name  :  leftHandler, rightHandler, bottomHandler

    Description    :  Calls clickAnimation Function and send what option user has clicked

    Param          :  null

    return         :  void

/****************************************************************************************** */

// Handlers for click events on each hand sign
function leftHandler() {
  clickAnimation("scissor");
}
function rightHandler() {
  clickAnimation("paper");
}
function bottomHandler() {
  clickAnimation("stone");
}

/****************************************************************************************** */
/*  Function Name  :  clickAnimation

    Description    :  Function to handle animation when a player clicks a hand sign

    Param          :  String : sign ( sciccor / paper / stone )

    return         :  void

/****************************************************************************************** */

function clickAnimation(sign) {
  // Hide lines connecting hand signs
  document.querySelector(".line1").style.display = "none";
  document.querySelector(".line2").style.display = "none";
  document.querySelector(".line3").style.display = "none";

  // Set the border color of left and right signs to white
  signLeft.style.borderColor = "white";
  signRight.style.borderColor = "white";

  // Apply transition for the animation
  signLeft.style.transition = "1s ease";
  signRight.style.transition = "1s ease";
  signBottom.style.transition = "1s ease";

  // Move the left and right hand signs outward for animation
  signLeft.style.transform = "translateX(130px)";
  signRight.style.transform = "translateX(-128px)";

  // Determine which sign was clicked and update the bottom sign accordingly
  if (sign == "scissor") {
    yourChoice = 0;
    signBottom.style.borderColor = "#0074b6"; // Scissor border color
    document.querySelector(".hand-sign-3 img").src = "images/scissor.png";
    document.querySelector(".hand-sign-1 img").src = ""; // Clear other images
    document.querySelector(".hand-sign-2 img").src = "";
  }
  if (sign == "paper") {
    yourChoice = 1;
    signBottom.style.borderColor = "#bd00ff"; // Paper border color
    document.querySelector(".hand-sign-3 img").src = "images/paper.png";
    document.querySelector(".hand-sign-1 img").src = ""; // Clear other images
    document.querySelector(".hand-sign-2 img").src = "";
  }
  if (sign == "stone") {
    yourChoice = 2;
    signBottom.style.borderColor = "#ffa943"; // Stone border color
    document.querySelector(".hand-sign-3 img").src = "images/stone.png";
    document.querySelector(".hand-sign-1 img").src = ""; // Clear other images
    document.querySelector(".hand-sign-2 img").src = "";
  }

  // After a delay, animate the hand signs to smaller size and position
  setTimeout(() => {
    signLeft.style.transition = "0s"; // Stop transition for left sign
    signLeft.style.transform = "scale(0)"; // Hide the left sign
    signBottom.style.transform = "translateX(-21.5vw) translateY(-180px)";
    signRight.style.transform = "translateX(16vw) translateY(50px)";
    signRight.style.width = "140px"; // Resize right sign
    signRight.style.height = "140px";
    signBottom.style.width = "140px"; // Resize bottom sign
    signBottom.style.height = "140px";

    // Disable further transitions after animation ends
    signBottom.addEventListener("transitionend", () => {
      signLeft.style.transition = "0s";
      signRight.style.transition = "0s";
      signBottom.style.transition = "0s";
    });
  }, 500); // Adjust the delay to match the transition duration (0.5s)

  // Remove click event listeners after the first click
  signLeft.removeEventListener("click", leftHandler);
  signRight.removeEventListener("click", rightHandler);
  signBottom.removeEventListener("click", bottomHandler);

  // Trigger PC's selection animation
  pcSelectionAnimation();
}

/****************************************************************************************** */
/*  Function Name  :  removeFirstScreen
    
    Description    :  Function to remove the first screen and its elements

    Param          :  null

    return         :  void

/****************************************************************************************** */

function removeFirstScreen() {
  let element = document.querySelectorAll(".game"); // Select all game elements
  let halo = document.querySelectorAll(".halo"); // Select all halo elements

  // Remove halo and game elements from the DOM
  halo.forEach((element) => element.remove());
  element.forEach((element) => element.remove());

  addSecondScreen(); // Add the second screen after removing the first one
}

/****************************************************************************************** */
/*  Function Name  :  addSecondScreen

    Description    :  Adding the result screen along with new css style sheet

    Param          :  null

    return         :  void

/****************************************************************************************** */

function addSecondScreen() {
  currentPage=2;
  // Switch to the second stylesheet for different styles
  const linkElement = document.querySelector(
    'link[rel="stylesheet"][href="style.css"]'
  );
  if (linkElement) {
    linkElement.href = "style2.css"; // Switch to style2.css
  }

  const container = document.createElement("div");
  winner = decideWinner(); // Determine the winner

  // Different layouts depending on the result of the game
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
                      <img src="${url[pcChoice]}" />
                    </div>
                  </div>
                </div>
                <div class="next-button" id="next">NEXT</div>
                `;
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
                      <img src="${url[pcChoice]}" />
                    </div>
                  </div>
                </div>
                <div class="next-button" id="next">NEXT</div>
                `;
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
                      <img src="${url[pcChoice]}" />
                    </div>
                  </div>
                </div>
                <div class="next-button" id="next">NEXT</div>
                `;
  }

  document.body.appendChild(container); // Add the container to the body
  makeResponsive();
  setEventListeners();
  if (winner == "pc") {
    if (window.innerWidth > 1100) {
      document.querySelector(".halo").style.right = "-10px"; // Adjust halo position if PC wins
      document.querySelector(".you-picked").style.top = "150px";
    }else{
      document.querySelector(".halo").style.right = "-10px"; // Adjust halo position if PC wins
    }
  }

  if (winner == "draw") {
    if (window.innerWidth > 1100) {
      document.querySelector(".you-picked").style.top = "150px";
    }
  }
  if (winner == "you") {
    if (window.innerWidth > 1100) {
      
      document.querySelector(".halo").style.left = "35px"; // Adjust halo position if PC wins
    }
    else{
      document.querySelector(".halo").style.left = "35px"; // Adjust halo position if PC wins
    }
  }

  updateScore();
  moveRulesButton();
 

  //Adding event listener to next button

  let nextButton = document.querySelector("#next");

  nextButton.addEventListener("click", () => {
    currentPage=3;
    showFinalResult();
  });

  startHaloAnimation(); // Start halo animation

}

/****************************************************************************************** */
/*  Function Name  :  startHaloAnimation

    Description    :  Function to start the halo animation on the winning hand sign

    Param          :  null

    return         :  void

/****************************************************************************************** */

function startHaloAnimation() {
  if (haloInterval) clearInterval(haloInterval); // Clear existing interval if any

  var haloInterval = setInterval(() => {
    haloAnimation();
  }, 1800); // Start the halo animation at regular intervals

  haloAnimation(); // Trigger the first halo animation
}

/****************************************************************************************** */
/*  Function Name  :  haloAnimation

    Description    :  Function to animate halo effect (glowing circles)

    Param          :  null

    return         :  void

/****************************************************************************************** */

function haloAnimation() {
  let circles = document.querySelectorAll(".circle1, .circle2, .circle3"); // Select all circles
  let reversedCircles = Array.from(circles).reverse(); // Reverse the order of circles for the animation
  reversedCircles.forEach((circle, index) => {
    setTimeout(() => {
      circle.style.opacity = 1; // Make circle visible
    }, index * 200 + 400); // Delayed opacity change for each circle

    setTimeout(() => {
      circle.style.opacity = 0; // Make circle invisible
    }, index * 400 + 1200); // Delayed opacity reset for each circle
  });
}

/****************************************************************************************** */
/*  Function Name  :  stopHaloAnimation

    Description    :  Function to stop the halo animation

    Param          :  null

    return         :  void

/****************************************************************************************** */

function stopHaloAnimation() {
  clearInterval(haloInterval); // Clear the interval to stop the animation
  haloInterval = null; // Reset the interval reference
}

/****************************************************************************************** */
/*  Function Name  :  decideWinner

    Description    : Function to determine the winner of the game based on choices 

    Param          :  null

    return         :  String : winner

/****************************************************************************************** */

function decideWinner() {
  if (yourChoice == 0) {
    // If player chose Scissor
    if (pcChoice == 1) {
      // If PC chose Paper
      winner = "you"; // Player wins
    } else winner = "pc"; // PC wins
  }
  if (yourChoice == 1) {
    // If player chose Paper
    if (pcChoice == 2) {
      // If PC chose Stone
      winner = "you"; // Player wins
    } else winner = "pc"; // PC wins
  }
  if (yourChoice == 2) {
    // If player chose Stone
    if (pcChoice == 0) {
      // If PC chose Scissor
      winner = "you"; // Player wins
    } else winner = "pc"; // PC wins
  }
  if (yourChoice == pcChoice) {
    // If both chose the same sign
    winner = "draw"; // It's a draw
  }
  return winner; // Return the result of the game
}

/****************************************************************************************** */
/*  Function Name  :  getRandomNumber

    Description    :  Function to get a random number between 0 and 2

     Param          :  null

     return         :  number : randomNumber - 1 

/****************************************************************************************** */

function getRandomNumber() {
  let randomNumber = Math.ceil(Math.random() * 3); // Generate a random number from 1 to 3
  return randomNumber - 1; // Subtract 1 to get a value from 0 to 2
}

/****************************************************************************************** */
/*  Function Name  :  pcSelection

     Description    :  Function to randomly select PC's choice and update the corresponding image

     Param          :  null

     return         :  void

/****************************************************************************************** */

function pcSelection() {
  pcChoice = getRandomNumber(); // Get a random number for PC's choice
  let img = document.querySelector(".hand-sign-2 img");
  img.src = `${url[pcChoice]}`; // Set the image based on PC's choice

  // Adjust the size of the image based on the selected choice
  if (pcChoice == 0) {
    img.style.width = "42px"; // Scissor image size
    img.style.height = "57px";
  }
  if (pcChoice == 1) {
    img.style.width = "72px"; // Paper image size
    img.style.height = "72px";
  }
  if (pcChoice == 2) {
    img.style.width = "80px"; // Stone image size
    img.style.height = "59px";
  }
}

/****************************************************************************************** */
/*  Function Name  :  pcSelectionAnimation

    Description    :  Function for animating the PC's hand sign selection

    Param          :  null

    return         :  void

/****************************************************************************************** */

function pcSelectionAnimation() {
  let img = document.querySelector(".hand-sign-2 img");

  // Display loading animation for PC's choice
  setTimeout(() => {
    img.style.width = "100px"; // Set image size
    img.style.height = "100px";

    img.src = "images/loading.png"; // Display loading image

    img.style.transition = "transform 2s linear";
    img.style.transform = "rotate(1200deg)"; // Rotate image for loading effect
  }, 1200); // 1.2s delay before loading animation starts

  // After the transition ends, determine PC's selection and remove the first screen
  img.addEventListener("transitionend", () => {
    pcSelection();
    removeFirstScreen();
  });
}

/****************************************************************************************** */
/*  Function Name  :  updateScore

    Description    :  Result score updated after a game to screen and Session storage

    Param          :  null

    return         :  void

/****************************************************************************************** */

function updateScore() {
  let computerScore = document.querySelector("#computer-score");
  let yourScore = document.querySelector("#your-score");

  downloadCurrentScore(); // Get current score from session storage

  console.log(yourCurrentScore);
  console.log(pcCurrentScore);
  if (winner == "pc") {
    pcCurrentScore += 1;
  }
  if (winner == "you") {
    yourCurrentScore += 1;
  }

  uploadCurrentScore(); // Upload updated current score to sessio storage

  computerScore.textContent = pcCurrentScore;
  yourScore.textContent = yourCurrentScore;
}

/****************************************************************************************** */
/*  Function Name  :  downloadCurrentScore

    Description    :  Get Current Score date from Session Storage during reload

    Param          :  null

    return         :  void

/****************************************************************************************** */

function downloadCurrentScore() {
  yourCurrentScore = parseInt(sessionStorage.getItem("yourScore"));
  pcCurrentScore = parseInt(sessionStorage.getItem("pcScore"));
}

/****************************************************************************************** */
/*  Function Name  :  uploadCurrentScore

    Description    :  Update score to Session Storage

    Param          :  null

    return         :  void

/****************************************************************************************** */

function uploadCurrentScore() {
  console.log(yourCurrentScore);
  console.log(pcCurrentScore);
  sessionStorage.setItem("pcScore", pcCurrentScore);
  sessionStorage.setItem("yourScore", yourCurrentScore);
}

/****************************************************************************************** */
/*  Function Name  :  moveRulesButton

    Description    :  Rules button is moved to give space for next Button

    Param          :  null

    return         :  void

/****************************************************************************************** */

function moveRulesButton() {
  rulesButton.style.transition = "transform 0.5s";
  rulesButton.style.transform = "translateX(-150px)";
}

/****************************************************************************************** */
/*  Function Name  :  setEventListeners

    Description    :  Set event listeners for rules button, close button

    Param          :  null

    return         :  void

/****************************************************************************************** */

function setEventListeners() {
  const rulesButton = document.querySelector(".rules-button");
  let closeButton = document.getElementById("close-button");
  let rules = document.querySelector(".rules");
  const playAgain = document.querySelector(".play-again");

  // Event listener for closing the rules modal
  closeButton.addEventListener("click", () => {
    rules.style.transformOrigin = "top right";
    rules.style.transform = "scale(0)"; // Animate the rules to scale out
    closeButton.style.transform = "scale(0)"; // Hide the close button
  });

  // Event listener for opening the rules modal
  rulesButton.addEventListener("click", () => {
    rules.style.transform = "scale(1)"; // Animate the rules to scale in
    closeButton.style.transform = "scale(1)"; // Show the close button
    closeButton.style.display = "flex"; // Ensure the close button is visible
  });

  // Play again event listener
  playAgain.addEventListener("click", () => {
    if (gameOver == true) {
      sessionStorage.setItem("scriptExecuted", false);
    }
    location.reload(true);
  });
}

/****************************************************************************************** */
/*  Function Name  :  showFinalResult

    Description    :  Create a new Hurray page on victory

    Param          :  null

    return         :  void

/****************************************************************************************** */

function showFinalResult() {
  gameOver = true;
  downloadCurrentScore();

  document.body.innerHTML = `
  <div class = "top-container">
  <img src="images/cup.png" id="cup">
  <div class = "star-1">
    <img src="images/star.png"  id="star-1">
  </div>
    <div class = "star-2">
    <img src="images/star.png"  id="star-2">
  </div>
 <div class = "star-3">
    <img src="images/star.png"  id="star-3">
  </div>

  <div class="star-4">
    <img src="images/star.png"  id="star-4">
  </div>
<div class="star-5">
    <img src="images/star.png"  id="star-5">
  </div>
  <div class="star-6">
    <img src="images/star.png"  id="star-6">
  </div>
<div class ="flicker-container">
  <img src="images/star.png" class="flicker-1" id="star-7">
  <img src="images/star.png" class="flicker-1" id="star-8">
  <img src="images/star.png" class="flicker-2" id="star-9">
  <img src="images/star.png" class="flicker-2" id="star-10">
  <img src="images/star.png" class="flicker-3" id="star-11">
  <img src="images/star.png" class="flicker-3" id="star-12">
  </div>
  </div>
  <button class="play-again">PLAY AGAIN</button>
  <!-- Rules popup -->
    <button class="rules-button" id="rules-button">RULES</button>
    <div class="rules-container">
      <div class="rules">
        <h1>Game Rules</h1>
        <ul>
          <li>
            Rock beats scissors, scissors beat paper, and paper beats rock.
          </li>
          <li>
            Agree ahead of time whether you’ll count off “rock, paper, scissors,
            shoot” or just “rock, paper, scissors.”
          </li>
          <li>
            Use rock, paper, scissors to settle minor decisions or simply play
            to pass the time
          </li>
          <li>
            If both players lay down the same hand, each player lays down
            another hand
          </li>
        </ul>
      </div>
      <button class="close-button" id="close-button">X</button>
    </div>

    <div class = "win-text-1">HURRAY!!</div>
    <div class = "win-text-2">YOU WON THE GAME</div>
  `;

  setEventListeners();

  let flickers1 = document.querySelectorAll(".flicker-1");

  let isScaled1 = true;

  setInterval(() => {
    flickers1.forEach((flicker) => {
      if (isScaled1) {
        flicker.style.opacity = 1;
      } else {
        flicker.style.opacity = 0;
      }
    });

    isScaled1 = !isScaled1;
  }, 300);

  let flickers2 = document.querySelectorAll(".flicker-2");
  let isScaled2 = false;
  setInterval(() => {
    flickers2.forEach((flicker) => {
      if (isScaled2) {
        flicker.style.opacity = 1;
      } else {
        flicker.style.opacity = 0;
      }
    });

    isScaled2 = !isScaled2;
  }, 300);

  let flickers3 = document.querySelectorAll(".flicker-3");
  let isScaled3 = false;
  setInterval(() => {
    flickers3.forEach((flicker) => {
      if (isScaled3) {
        flicker.style.opacity = 1;
      } else {
        flicker.style.opacity = 0;
      }
    });

    isScaled3 = !isScaled3;
  }, 150);

  if (yourCurrentScore < pcCurrentScore) {
    let topContainer = document.querySelector(".top-container"); // Select the div with the class 'top-container'
    let winText1 = document.querySelector(".win-text-1");
    let winText2 = document.querySelector(".win-text-2");

    if (topContainer) {
      // Check if the element exists
      topContainer.remove(); // Remove the element from the DOM
    }

    winText1.textContent = "ALAS !!";
    winText1.style.top = "350px";
    winText1.style.fontSize = "100px";
    winText2.textContent = "YOU LOST THE GAME";
    winText2.style.top = "500px";
   
  }

  if (yourCurrentScore == pcCurrentScore) {
    let topContainer = document.querySelector(".top-container"); // Select the div with the class 'top-container'
    let winText1 = document.querySelector(".win-text-1");
    let winText2 = document.querySelector(".win-text-2");

    if (topContainer) {
      // Check if the element exists
      topContainer.remove(); // Remove the element from the DOM
    }

    winText1.textContent = "ITS A BORING DRAW !!";
    winText1.style.top = "350px";
    winText1.style.fontSize = "100px";
    winText2.textContent = "";
  }

  let playAgain=document.querySelector('.play-again');

  playAgain.style.transform='translateY(600px)';
}

/****************************************************************************************** */
/*  Function Name  :  <function name>

    Description    :  

    Param          :  null

    return         :  void

/****************************************************************************************** */
function makeResponsive() {
  if (window.innerWidth < 1100 && currentPage==2) {
    document.querySelectorAll(".middle").forEach((element) => element.remove());

    let newContainer = document.createElement("div");

    if(winner=="you"){
    newContainer.innerHTML = `
    <div class="middle">
                    <div class="you-win">YOU WIN</div>
                    <div class="against-pc">AGAINST PC</div>
                    <button class="play-again">PLAY AGAIN</button>
    </div>
    `;
    }
    if(winner=="pc"){
      newContainer.innerHTML = `
      <div class="middle">
                      <div class="you-win">YOU LOST</div>
                      <div class="against-pc">AGAINST PC</div>
                      <button class="play-again">PLAY AGAIN</button>
      </div>
      `;
      }
      if(winner=="draw"){
        newContainer.innerHTML = `
        <div class="middle">
                        <div class="you-win">TIE UP</div>
                        <div class="against-pc"></div>
                        <button class="play-again">PLAY AGAIN</button>
        </div>
        `;
        }
    document.body.appendChild(newContainer);

  }
}

/**######################################################################################## */
//SECTION : GLOBAL EVENT LISTENERS
/**######################################################################################## */

// Adding click event listeners for hand signs
signLeft.addEventListener("click", leftHandler);
signRight.addEventListener("click", rightHandler);
signBottom.addEventListener("click", bottomHandler);

/**######################################################################################## */
// SECTION : Main Code
/**######################################################################################## */

if (sessionStorage.getItem("scriptExecuted") === null) {
  sessionStorage.setItem("scriptExecuted", false);
}

if (sessionStorage.getItem("scriptExecuted") == "false") {
  let computerScore = document.querySelector("#computer-score");
  let yourScore = document.querySelector("#your-score");

  sessionStorage.setItem("pcScore", 0);
  sessionStorage.setItem("yourScore", 0);
  sessionStorage.setItem("scriptExecuted", true);

  computerScore.textContent = 0;
  yourScore.textContent = 0;
} else {
  let computerScore = document.querySelector("#computer-score");
  let yourScore = document.querySelector("#your-score");

  computerScore.textContent = parseInt(sessionStorage.getItem("pcScore"));
  yourScore.textContent = parseInt(sessionStorage.getItem("yourScore"));
}

setEventListeners();


