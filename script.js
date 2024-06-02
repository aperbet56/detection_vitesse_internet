// Récupération des différents éléments
const bitSpeed = document.querySelector("#bits");
const kbSpeed = document.querySelector("#kbs");
const mbSpeed = document.querySelector("#mbs");
const info = document.querySelector("#info");

// Creéation des variables
let startTime, endTime;
let imageSize = "";
let image = new Image();
let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// Stockage d'une image aléatoire depuis le site unsplash.com
let imageApi = "https://source.unsplash.com/random?topic=nature";

// Au chargement de l'image
image.onload = async () => {
  endTime = new Date().getTime();

  // Taille de l'image
  await fetch(imageApi).then((response) => {
    imageSize = response.headers.get("content-length");
    // Appel de la fonction calculeSpeed
    calculateSpeed();
  });
};

// Déclaration de la fonction calculateSpeed qui va permettre de calculer la vitesse
const calculateSpeed = () => {
  // Temps en secondes
  let timeDuration = (endTime - startTime) / 1000;
  // Total bits
  let loadedBits = imageSize * 8;
  let speedInBts = loadedBits / timeDuration;
  let speedInKbs = speedInBts / 1024;
  let speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBts;
  totalKbSpeed += speedInKbs;
  totalMbSpeed += speedInMbs;

  testCompleted++;

  // Si tous les tests sont terminés (nous obtenons 5 images puis calculons la moyenne)
  if (testCompleted === numTests) {
    let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
    let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
    let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

    // Affichage des vitesses moyennes
    bitSpeed.innerHTML += `${averageSpeedInBps}`;
    kbSpeed.innerHTML += `${averageSpeedInKbps}`;
    mbSpeed.innerHTML += `${averageSpeedInMbps}`;
    info.textContent = "Test Complet effectué !";
  } else {
    // Exécution du prochain test
    startTime = new Date().getTime();
    image.src = imageApi;
  }
};

// Déclaration de la fonction asynchrone init qui va permettre de commencer les tests
const init = async () => {
  info.textContent = "Test en cours...";
  startTime = new Date().getTime();
  image.src = imageApi;
};

// Exécution des tests lors du chargement de la fenêtre
window.onload = () => {
  for (let i = 0; i < numTests; i++) {
    // Appel de la fonction init
    init();
  }
};
