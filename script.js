/*Rules button functionality   */

let closeButton = document.getElementById("close-button");
let rules = document.querySelector(".rules");
let rulesButton = document.getElementById("rules-button");
let rulesContainer = document.querySelector(".rules-container");
let signLeft = document.querySelector(".hand-sign-1");
let signRight = document.querySelector(".hand-sign-2");
let signBottom = document.querySelector(".hand-sign-3");

let url=["images/scissor.png","images/paper.png","images/stone.png"]

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
    signBottom.style.borderColor = "#0074b6";
    document.querySelector(".hand-sign-3 img").src = "images/scissor.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }
  if (sign == "paper") {
    signBottom.style.borderColor = "#bd00ff";
    document.querySelector(".hand-sign-3 img").src = "images/paper.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }

  if (sign == "stone") {
    signBottom.style.borderColor = "#ffa943";
    document.querySelector(".hand-sign-3 img").src = "images/stone.png";
    document.querySelector(".hand-sign-1 img").src = "";
    document.querySelector(".hand-sign-2 img").src = "";
  }


  setTimeout(() => {
    signLeft.style.transition = "0s";
    signLeft.style.transform = "scale(0)";
    signBottom.style.transform = "translateX(-250px) translateY(-135px)";
    signRight.style.transform = "translateX(150px) translateY(100px)";
    signRight.style.width = "140px";
    signRight.style.height = "140px";
    signBottom.style.width = "140px";
    signBottom.style.height = "140px";

  
  }, 500); // Adjust the delay to match your transition duration (0.5s)

  setTimeout(()=>{
    document.querySelector('.halo').style.display='flex';
  },1100);
  


signLeft.removeEventListener("click",leftHandler);
signRight.removeEventListener("click",rightHandler);
signBottom.removeEventListener("click",bottomHandler);

pcSelectionAnimation();

}

function leftHandler(){
  clickAnimation("scissor");
}
function rightHandler(){
  clickAnimation("paper");
}
function bottomHandler(){
  clickAnimation("stone");
}

signLeft.addEventListener("click", leftHandler);
signRight.addEventListener("click", rightHandler);
signBottom.addEventListener("click", bottomHandler);

function pcSelectionAnimation() {
  let img=document.querySelector('.hand-sign-2 img');
  let text=document.querySelector('.loading-text');

  setTimeout(()=>{
    
    img.style.width='100px';
    img.style.height='100px';
    setInterval(() => {
      text.style.color='white';
    }, 150);
    img.src="images/loading.png";
    
    img.style.transition='transform 3s linear';
  img.style.transform='rotate(1800deg)';
 
  },1200);
  img.addEventListener('transitionend', () => {
    pcSelection();
  });
}

function pcSelection(){
  let imgChoice=getRandomNumber();
  let img=document.querySelector('.hand-sign-2 img');
  img.src=`${url[imgChoice]}`;
  if(imgChoice==0){
    img.style.width='42px';
    img.style.height='57px';
  }
  if(imgChoice==1){
    img.style.width='72px';
    img.style.height='72px';
  }
  if(imgChoice==2){
    img.style.width='80px';
    img.style.height='59px';
  }

}

function getRandomNumber(){
  let randomNumber=Math.ceil(Math.random()*3);
  return randomNumber-1;
}