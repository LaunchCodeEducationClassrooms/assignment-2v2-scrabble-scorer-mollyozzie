// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let userInput = null;
   let boolean = false;
   while (boolean == false) {
     userInput = input.question("Let's play some scrabble! \nEnter a word to score: ");
     boolean = validateInput(userInput);
   }
   return userInput;
};

function validateInput(word) {
  word = word.toLowerCase();
  let charLength = 0;
  for (i=0; i < word.length; i++){
    for (item in newPointStructure){
      if (word[i] == item){
        charLength = charLength + 1;
      }
    }
  } if (charLength < word.length){
    return false;
  } else {
    return true;
  }
}

function simpleScore(word){
  word = word.toLowerCase();
  let wordScore = word.length;
  for (i=0; i < word.length; i++){
    if (word[i] == ' '){
      wordScore = wordScore - 1;
    }
  }
  return wordScore;
};

function vowelBonusScore(word){
  word = word.toLowerCase();
  let wordScore = 0;
  for (i = 0; i < word.length; i++) {
    if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
      wordScore = wordScore + 3;
    } else if (word[i] === ' '){
      wordScore = wordScore + 0;
    } else {
      wordScore = wordScore + 1;
    }
  } return wordScore;
};

function scrabbleScore(word){
  word = word.toLowerCase();
  let letterPoints = 0;
  for (i=0; i < word.length; i++){
    for (item in newPointStructure){
      if (item == word[i]){
        letterPoints = letterPoints + newPointStructure[item]
        // console.log(letterPoints + ' ' + newPointStructure[item]);
      }
    }
  } return letterPoints;
};

let simple = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore 
};

let bonus = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 points, consonants are 1 point.',
  scoringFunction: vowelBonusScore 
};

let scrabble = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simple, bonus, scrabble];

function scorerPrompt(arr) {
  let userInput = null;
  while (userInput != 0 && userInput !=1 && userInput !=2){
    userInput = input.question('Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: ')
  }
  return arr[userInput];
}

function transform(object) {
  let newObject = {};
  let value = null;
  let key = null;
  for (item in object){
    value = item;
    for (i=0; i < object[item].length; i++){
      key = object[item][i];
      key = key.toLowerCase();
      newObject[key] = Number(value);
    } 
  } //newObject[' '] = 0; 
  return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoreOption = scorerPrompt(scoringAlgorithms);
   let score = 0;
    score = scoreOption.scoringFunction(word);

  //  if (scoreOption.scoringFunction == 'simpleScore'){
  //     score = simpleScore(word)
  //  } else if (scoreOption.scoringFunction == 'vowelBonusScore'){
  //    score = vowelBonusScore(word)
  //  } else if (scoreOption.scoringFunction == 'scrabbleScore'){
  //    score = scrabbleScore(word)
  //  };
   
   console.log(`Score for "${word}": ${score}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

