function getRandomInt(max){
  return Math.floor(Math.random()* max);
}

numberToFind = getRandomInt(10)

//On crée un nombre entro 0 & 10
console.log(numberToFind);

// 3 essaies pour deviner le chiffre
let numberPropal = prompt("Deviner un chiffre en 0 et 10");

if (numberPropal > numberToFind) {
  alert(`ce n'est pas la bonne réponse`);
  
} else (numberPropal == numberToFind) {
  alert(`c'est gagné !`)
}