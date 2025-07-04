

// Global variables
let currentCharacter = null;
let guessedCharacterFacts = null;



// Randomize a character
async function randomizeCharacter() {
  
  const res = await fetch("marvelDataBase.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  
  const randomIdx = Math.floor(Math.random() * (lines.length - 1)) + 1; // Skip header
  const randomizedRow = lines[randomIdx].split(",");

  currentCharacter = {
    name: randomizedRow[0],
    gender: randomizedRow[1],
    domain: randomizedRow[2]
  };

  document.getElementById("result").innerHTML = "<p>Done randomizing</p>";

}


// Show the randomized character name
function showCharacterName() {

  if (currentCharacter) {
    document.getElementById("result").innerHTML = 
      `<p><strong>Name:</strong> ${currentCharacter.name}</p>`;
  } else {
    document.getElementById("result").innerHTML = 
      `<p>No character has been randomized yet.</p>`;
  }
}


async function searchData() {

    const input = document.getElementById("searchInput").value.toLowerCase();
    const res = await fetch("marvelDataBase.csv");
    const text = await res.text();
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
  
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");
      if (row[0].toLowerCase() === input) {

        document.getElementById("genderResult").innerHTML = `<p><strong>${headers[1]}:</strong> ${row[1]}</p>`;
        document.getElementById("domainResult").innerHTML = `<p><strong>${headers[2]}:</strong> ${row[2]}</p>`;
        
        // Show rectangles
        document.querySelector(".rectangle:nth-of-type(1)").style.display = "flex";
        document.querySelector(".rectangle:nth-of-type(2)").style.display = "flex";
  
        return;
      }
    }
  
    document.getElementById("result").innerHTML = "No match found.";
  
}


// Find the guessed character and its facts
async function guessedCharacter() {
  
  const res = await fetch("marvelDataBase.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  

  const input = document.getElementById("searchInput").value.toLowerCase();

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    const name = row[0].toLowerCase();

    if (name == input) {
      guessedCharacterFacts = {
        guessedName: row[0],
        guessedGender: row[1],
        guessedDomain: row[2]
      
      };
      console.log("Guessed Character Facts:", guessedCharacterFacts);
      return;
    }
  }
}


// Compares the randomized and guessed names and prints if it is correct or wrong
function compareGuess() {

  const input = document.getElementById("searchInput").value.toLowerCase();
  const currentCharacterName = currentCharacter.name.toLowerCase();

  if (!currentCharacterName) {
    document.getElementById("guessedResult").innerHTML = 
      `<p>No character has been randomized yet.</p>`;
    return;
  }
  
  if (currentCharacterName == input) {
    document.getElementById("guessedResult").innerHTML = 
      `<p>Correct!</p>`;
  } else {
    document.getElementById("guessedResult").innerHTML = 
      `<p>Wrong, try again!</p>`;
  }
}


// Compares the facts from the randomized and guessed character and print of its correct or wrong guessed
function compareFacts() {
  if (!guessedCharacterFacts) {
      document.getElementById("searchInput").innerHTML = "<p>No guessed character found.</p>";
      return;
  } 

  if (!currentCharacter) {
      document.getElementById("guessedResult").innerHTML = "<p>No randomized character found.</p>";
      return;
  }

  const guessedGender = guessedCharacterFacts.guessedGender.toLowerCase();
  const currentGender = currentCharacter.gender.toLowerCase();
  const guessedDomain = guessedCharacterFacts.guessedDomain.toLowerCase();
  const currentDomain = currentCharacter.domain.toLowerCase();

  let message = "";

  message += (currentGender === guessedGender)
      ? "<p>Correct Gender!</p>"
      : "<p>Wrong Gender</p>";

  message += (currentDomain === guessedDomain)
      ? "<p>Correct Domain!</p>"
      : "<p>Wrong Domain</p>";

  document.getElementById("guessedResult").innerHTML = message;
}


// Ensures that the guessedCharacterFacts list is filled before running the comparison of facts
async function setGuessedCharacterThenCompare() {
  await guessedCharacter(); // Ensures guessedCharacterFacts gets populated
  compareFacts();           // Now run the comparison
}




