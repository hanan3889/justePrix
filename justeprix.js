//Générer un chiffre en aléatoire
//L'utilisateur fera des propositions
//Continuer tant qu'il n'a pas la bonne proposition
import { confetti } from "../lib/confetti.js";

let numberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const reboursDiv = document.getElementById("compteARebours");
const GamePropalDiv = document.getElementById("GamePropalDiv");
let TempsRestant = 0;
let compteurInterval = null;

document.getElementById("beginGame").addEventListener("click", function () {
  launchGame();
});

document
  .getElementById("userPropalButton")
  .addEventListener("click", function () {
    checkPropal();
  });

document
  .getElementById("userPropalInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkPropal();
    }
  });

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkPropal() {
  let numberPropal = document.getElementById("userPropalInput").value;
  console.log(numberToFind);
  if (numberToFind > numberPropal) {
    //C'est plus )
    resultDiv.innerHTML = "C'est plus ! ";
    let audio = new Audio("/justePrix/audios/plus.mp3");
    audio.play();
  } else if (numberToFind < numberPropal) {
    //C'est moins
    resultDiv.innerHTML = "C'est moins !";
    let audio = new Audio("/justePrix/audios/moins.mp3");
    audio.play();
  } else if (numberToFind == numberPropal) {
    //C'est gagné
    resultDiv.innerHTML = "C'est gagné !";

    endGame(true);
  }
}

function launchGame() {
  confetti.stopAnimationConfetti();
  //Lancer la partie
  //Récuperer un chiffre aléatoire
  numberToFind = getRandomInt(1000);
  console.log(numberToFind);
  TempsRestant = 30;
  GamePropalDiv.style.display = "block";
  if (compteurInterval != null) {
    clearInterval(compteurInterval);
  }
  compteurInterval = setInterval(() => {
    reboursDiv.innerText = TempsRestant;
    TempsRestant--;

    if (TempsRestant >= 20) {
      reboursDiv.classList.remove("warning");
      reboursDiv.classList.remove("danger");
      reboursDiv.classList.add("cool");
    } else if (TempsRestant > 10) {
      reboursDiv.classList.add("warning");
      reboursDiv.classList.remove("cool");
      reboursDiv.classList.remove("danger");
    } else if (TempsRestant >= 0) {
      reboursDiv.classList.add("danger");
      reboursDiv.classList.remove("cool");
      reboursDiv.classList.remove("warning");
    } else if (TempsRestant < 0) {
      clearInterval(compteurInterval);
      endGame(false);
      //Partie terminée
    }
  }, 1000);
}

function endGame(gagne) {
  if (gagne) {
    confetti.launchAnimationConfetti();
    let audio = new Audio("/justePrix/audios/Bip bip.mp3");
    audio.play();
    setTimeout(() => {
      confetti.stopAnimationConfetti();
    }, 5000);
    //Terminer la partie
  } else {
    alert("Perdu !");
  }
  GamePropalDiv.style.display = "none";
  clearInterval(compteurInterval);
}
