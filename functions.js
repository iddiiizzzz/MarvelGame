

// Global variables
let currentCharacter = null;
let guessedCharacterFacts = null;
let correctFacts = new Set();


// Randomize a character
async function randomizeCharacter() {
  
  const res = await fetch("marvelDataBase.csv");
  // const res = await fetch("testData.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  
  const randomIdx = Math.floor(Math.random() * (lines.length - 1)) + 1; // Skip header
  const randomizedRow = lines[randomIdx].split(",");

  currentCharacter = {
    name: randomizedRow[0],
    gender: randomizedRow[1],
    being: randomizedRow[2],
    heroStatus: randomizedRow[3],
    phase: randomizedRow[4],
    powerOrigin: randomizedRow[5],
    birthYear: randomizedRow[6],
    age: randomizedRow[7]
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


let characterNames = [];

async function loadCharacterNames() {
  const res = await fetch("marvelDataBase.csv");
  // const res = await fetch("testData.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    characterNames.push(row[0]); 
  }

  const dataList = document.getElementById("characterSuggestions");
  characterNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    dataList.appendChild(option);
  });
}

// Call this function once when the page loads
window.onload = function () {
  loadCharacterNames();

  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchData(); // Your search function
    }
  });
};



// Guess a charachter and this function finds the facts about it
async function searchData() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const res = await fetch("marvelDataBase.csv");
  // const res = await fetch("testData.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  let foundCharacter = false; // Track if a character is found

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(",");
    const name = row[0].toLowerCase();

    if (name === input) {
      guessedCharacterFacts = {
      guessedName: row[0],
      guessedGender: row[1], 
      guessedBeing: row[2],
      guessedHeroStatus: row[3],
      guessedPhase: row[4],
      guessedPowerOrigin: row[5],
      guessedBirthYear: row[6],
      guessedAge: row[7],
      };

      console.log("Guessed Character Facts:", guessedCharacterFacts);

      // Hide previous results before displaying new ones
      document.querySelectorAll(".rectangleCorrect").forEach(el => el.style.display = "none");
      document.querySelectorAll(".rectangleWrong").forEach(el => el.style.display = "none");

      // Name
      if (currentCharacter && currentCharacter.name === guessedCharacterFacts.guessedName) {
          document.getElementById("correctNameResult").innerHTML = `<p><strong>${headers[0]}:</strong> ${guessedCharacterFacts.guessedName}</p>`;
          document.querySelectorAll(".rectangleCorrect")[0].style.display = "flex"; 
      } else {
          document.getElementById("wrongNameResult").innerHTML = `<p><strong>${headers[0]}:</strong> ${guessedCharacterFacts.guessedName}</p>`; 
          document.querySelectorAll(".rectangleWrong")[0].style.display = "flex";
      }

      // Gender
      if (currentCharacter && currentCharacter.gender === guessedCharacterFacts.guessedGender) {
          document.getElementById("correctGenderResult").innerHTML = `<p><strong>${headers[1]}:</strong> ${guessedCharacterFacts.guessedGender}</p>`;
          document.querySelectorAll(".rectangleCorrect")[1].style.display = "flex"; 
          saveCorrectFact(headers[1], guessedCharacterFacts.guessedGender);
        } else {
          document.getElementById("wrongGenderResult").innerHTML = `<p><strong>${headers[1]}:</strong> ${guessedCharacterFacts.guessedGender}</p>`; 
          document.querySelectorAll(".rectangleWrong")[1].style.display = "flex";
      }

      // Being
      if (currentCharacter && currentCharacter.being === guessedCharacterFacts.guessedBeing) {
          document.getElementById("correctBeingResult").innerHTML = `<p><strong>${headers[2]}:</strong> ${guessedCharacterFacts.guessedBeing}</p>`;
          document.querySelectorAll(".rectangleCorrect")[2].style.display = "flex"; 
          saveCorrectFact(headers[2], guessedCharacterFacts.guessedBeing);
        } else {
          document.getElementById("wrongBeingResult").innerHTML = `<p><strong>${headers[2]}:</strong> ${guessedCharacterFacts.guessedBeing}</p>`; 
          document.querySelectorAll(".rectangleWrong")[2].style.display = "flex";
      }

          

      // Hero Status
      if (currentCharacter && currentCharacter.heroStatus === guessedCharacterFacts.guessedHeroStatus) {
        document.getElementById("correctHeroStatusResult").innerHTML = `<p><strong>${headers[3]}:</strong> ${guessedCharacterFacts.guessedHeroStatus}</p>`;
        document.querySelectorAll(".rectangleCorrect")[3].style.display = "flex"; 
        saveCorrectFact(headers[3], guessedCharacterFacts.guessedHeroStatus);
      } else {
        document.getElementById("wrongHeroStatusResult").innerHTML = `<p><strong>${headers[3]}:</strong> ${guessedCharacterFacts.guessedHeroStatus}</p>`; 
        document.querySelectorAll(".rectangleWrong")[3].style.display = "flex";
      }

      // Phase
      if (currentCharacter && currentCharacter.phase === guessedCharacterFacts.guessedPhase) {
        document.getElementById("correctPhaseResult").innerHTML = `<p><strong>${headers[4]}:</strong> ${guessedCharacterFacts.guessedPhase}</p>`;
        document.querySelectorAll(".rectangleCorrect")[4].style.display = "flex"; 
        saveCorrectFact(headers[4], guessedCharacterFacts.guessedPhase);
      } else {
        document.getElementById("wrongPhaseResult").innerHTML = `<p><strong>${headers[4]}:</strong> ${guessedCharacterFacts.guessedPhase}</p>`; 
        document.querySelectorAll(".rectangleWrong")[4].style.display = "flex";
      }


      // Power Origin
      if (currentCharacter && currentCharacter.powerOrigin === guessedCharacterFacts.guessedPowerOrigin) {
        document.getElementById("correctPowerOriginResult").innerHTML = `<p><strong>${headers[5]}:</strong> ${guessedCharacterFacts.guessedPowerOrigin}</p>`;
        document.querySelectorAll(".rectangleCorrect")[5].style.display = "flex"; 
        saveCorrectFact(headers[5], guessedCharacterFacts.guessedPowerOrigin);
      } else {
        document.getElementById("wrongPowerOriginResult").innerHTML = `<p><strong>${headers[5]}:</strong> ${guessedCharacterFacts.guessedPowerOrigin}</p>`; 
        document.querySelectorAll(".rectangleWrong")[5].style.display = "flex";
      }



      // Birth Year
      if (currentCharacter && currentCharacter.birthYear === "Unknown" && guessedCharacterFacts.guessedBirthYear === "Unknown") {
        document.getElementById("correctBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedBirthYear}</p>`;
        document.querySelectorAll(".rectangleCorrect")[6].style.display = "flex";
        saveCorrectFact(headers[6], guessedCharacterFacts.guessedBirthYear);

      } else if (currentCharacter.birthYear === "Unknown" && guessedCharacterFacts.guessedBirthYear !== "Unknown") {
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> ? ${guessedCharacterFacts.guessedBirthYear} ?</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";

      } else if (currentCharacter.birthYear !== "Unknown" && guessedCharacterFacts.guessedBirthYear === "Unknown") {
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedBirthYear}</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";

      } else if (currentCharacter.birthYear === guessedCharacterFacts.guessedBirthYear) {
        document.getElementById("correctBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedBirthYear}</p>`;
        document.querySelectorAll(".rectangleCorrect")[6].style.display = "flex"; 
        saveCorrectFact(headers[6], guessedCharacterFacts.guessedBirthYear);
      } else if (parseInt(currentCharacter.birthYear) < parseInt(guessedCharacterFacts.guessedBirthYear)) {
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> < ${guessedCharacterFacts.guessedBirthYear}</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      } else if (parseInt(currentCharacter.birthYear) > parseInt(guessedCharacterFacts.guessedBirthYear)) {
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> > ${guessedCharacterFacts.guessedBirthYear}</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      }


      // Age
      // if (currentCharacter && currentCharacter.age === guessedCharacterFacts.guessedAge) {
      //   document.getElementById("correctAgeResult").innerHTML = `<p><strong>${headers[7]}:</strong> ${guessedCharacterFacts.guessedAge}</p>`;
      //   document.querySelectorAll(".rectangleCorrect")[7].style.display = "flex"; 
      // } else if (currentCharacter.age < guessedCharacterFacts.guessedAge) {
      //   document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[7]}:</strong> < ${guessedCharacterFacts.guessedAge}</p>`; 
      //   document.querySelectorAll(".rectangleWrong")[7].style.display = "flex";
      // } else if (currentCharacter.age > guessedCharacterFacts.guessedAge) {
      //   document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[7]}:</strong> > ${guessedCharacterFacts.guessedAge}</p>`; 
      //   document.querySelectorAll(".rectangleWrong")[7].style.display = "flex";
      // } else if (currentCharacter.age === "Unknown") {
      //   document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[7]}:</strong> ? ${guessedCharacterFacts.guessedAge} ?</p>`; 
      //   document.querySelectorAll(".rectangleWrong")[7].style.display = "flex";
      // }



      // // Age
      // if (currentCharacter.age === "Unknown" || guessedCharacterFacts.guessedAge === "Unknown") {
      //   document.getElementById("correctAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedAge}</p>`;
      //   document.querySelectorAll(".rectangleCorrect")[6].style.display = "flex";

      //   if (currentCharacter.age === guessedCharacterFacts.guessedAge) {
      //     document.getElementById("correctAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedAge}</p>`;
      //     document.querySelectorAll(".rectangleCorrect")[6].style.display = "flex";
      //   } else {
      //     document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> ? ${guessedCharacterFacts.guessedAge} ?</p>`;
      //     document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      //   }
      // } else {
      //   const actualAge = parseInt(currentCharacter.age.trim());
      //   const guessedAge = parseInt(guessedCharacterFacts.guessedAge.trim());
        
      //   if (actualAge === guessedAge) {
      //     document.getElementById("correctAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> ${guessedCharacterFacts.guessedAge}</p>`;
      //     document.querySelectorAll(".rectangleCorrect")[6].style.display = "flex";
      //   } else if (actualAge < guessedAge) {
      //     document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> < ${guessedCharacterFacts.guessedAge}</p>`;
      //     document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      //   } else {
      //     document.getElementById("wrongAgeResult").innerHTML = `<p><strong>${headers[6]}:</strong> > ${guessedCharacterFacts.guessedAge}</p>`;
      //     document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      // }
    // }




      

      foundCharacter = true;
      break;
    }
  }

  if (!foundCharacter) {
    document.getElementById("result").innerHTML = "No match found.";
  }
}




function saveCorrectFact(label, value) {
  const entry = `${label}: ${value}`;

  if (!correctFacts.has(entry)) {
    correctFacts.add(entry);
    const li = document.createElement("li");
    li.textContent = entry;
    document.getElementById("correctGuessesList").appendChild(li);
  }
}
