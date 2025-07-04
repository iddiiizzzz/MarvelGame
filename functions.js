

// Global variables
let currentCharacter = null;
let guessedCharacterFacts = null;
let correctFacts = new Set();
let falseFactsMap = {}; 
let filteredDataSet = [];



async function choosePhase () {
  // const res = await fetch("marvelDataBase.csv");
  const res = await fetch("testData.csv");
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");
  const dataRows = lines.slice(1);

  
  const selectedPhases = [];

  if (document.getElementById("Phase1").checked) selectedPhases.push("1");
  if (document.getElementById("Phase2").checked) selectedPhases.push("2");
  if (document.getElementById("Phase3").checked) selectedPhases.push("3");
  if (document.getElementById("Phase4").checked) selectedPhases.push("4");
  if (document.getElementById("Xmen").checked) selectedPhases.push("X-men");



  filteredDataSet = dataRows.filter(row => {
    const columns = row.split(",");
    const characterPhase = columns[4]; // Assuming phase is in column index 4
    return selectedPhases.includes(characterPhase);
  });

  updateCharacterSuggestions(); // Update search suggestions


  console.log("Filtered Characters:", filteredDataSet);

}



async function randomizeCharacter() {
  

  if (filteredDataSet.length === 0) {
    alert("No characters available. Please select a phase first.");
    return;
  }

  const randomIdx = Math.floor(Math.random() * (filteredDataSet.length));
  const randomizedRow = filteredDataSet[randomIdx].split(",");


  // const res = await fetch("marvelDataBase.csv");
  // const res = await fetch("testData.csv");
  // const text = await res.text();
  // const lines = text.trim().split("\n");
  // const headers = lines[0].split(",");

  // const randomIdx = Math.floor(Math.random() * (lines.length - 1)) + 1;
  // const randomizedRow = lines[randomIdx].split(",");
  
  

  currentCharacter = {
    name: randomizedRow[0],
    gender: randomizedRow[1],
    being: randomizedRow[2],
    heroStatus: randomizedRow[3],
    phase: randomizedRow[4],
    powerOrigin: randomizedRow[5],
    birthYear: randomizedRow[6],
    colour: randomizedRow[7],
    quote: randomizedRow[9],
    movie: randomizedRow[10]
  };

  document.getElementById("result").innerHTML = "<p>Done randomizing</p>";
  console.log("Randomized Character:", currentCharacter);

  guessedCharacterFacts = null;
  correctFacts.clear();
  falseFactsMap = {};
  document.getElementById("falseGuessesList").innerHTML = "";
  closestBornAfter = null;
  closestBornBefore = null;




  // Clear the displayed results
  document.getElementById("result").innerHTML = "<p>Done randomizing</p>";
  document.getElementById("searchInput").value = ""; // Clear input field

  document.getElementById("correctGuessesList").innerHTML = ""; // Clear correct guesses list

  // Hide previous result boxes
  document.querySelectorAll(".rectangleCorrect").forEach(el => el.style.display = "none");
  document.querySelectorAll(".rectangleWrong").forEach(el => el.style.display = "none");
}




function showCharacterName() {

  if (currentCharacter) {
    document.getElementById("result").innerHTML = 
      `<p><strong>Name:</strong> ${currentCharacter.name}</p>`;
  } else {
    document.getElementById("result").innerHTML = 
      `<p>No character has been randomized yet.</p>`;
  }
}

function showQuote() {

  document.getElementById("result").innerHTML = 
      `<p>Work in progress...</p>`;


  // if (currentCharacter) {
  //   document.getElementById("result").innerHTML = 
  //     `<p><strong>Quote:</strong> ${currentCharacter.quote}</p>`;
  // } else {
  //   document.getElementById("result").innerHTML = 
  //     `<p>No character has been randomized yet.</p>`;
  // }
}

function showMovie() {

  document.getElementById("result").innerHTML = 
      `<p>Work in progress...</p>`;

  // if (currentCharacter) {
  //   document.getElementById("result").innerHTML = 
  //     `<p><strong>Movie:</strong> ${currentCharacter.movie}</p>`;
  // } else {
  //   document.getElementById("result").innerHTML = 
  //     `<p>No character has been randomized yet.</p>`;
  // }
}


function updateCharacterSuggestions() {
  const dataList = document.getElementById("characterSuggestions");
  dataList.innerHTML = ""; // Clear old suggestions

  filteredDataSet.forEach(row => {
    const columns = row.split(",");
    const name = columns[0]; 
    const option = document.createElement("option");
    option.value = name;
    dataList.appendChild(option);
  });

  console.log("Updated suggestions:", filteredDataSet.map(row => row.split(",")[0]));
}



window.onload = function () {
  choosePhase();
  

  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchData(); // Your search function
    }
  });
};



async function searchData() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  // const res = await fetch("marvelDataBase.csv");
  const res = await fetch("testData.csv");
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
      guessedColour: row[7],
      guessedImage: row[8]
      };

      console.log("Guessed Character Facts:", guessedCharacterFacts);

      // Hide previous results before displaying new ones
      document.querySelectorAll(".rectangleCorrect").forEach(el => el.style.display = "none");
      document.querySelectorAll(".rectangleWrong").forEach(el => el.style.display = "none");

      // Name
      if (currentCharacter && currentCharacter.name === guessedCharacterFacts.guessedName) {
          document.getElementById("correctNameResult").innerHTML = `<p><strong>${headers[0]}:</strong> ${guessedCharacterFacts.guessedName}</p>`;
          document.querySelectorAll(".rectangleCorrect")[0].style.display = "flex"; 
          document.getElementById("guessedName").innerText = guessedCharacterFacts.guessedName; // Insert character name
          document.getElementById("guessedImage").src = guessedCharacterFacts.guessedImage;
          document.getElementById("congratsPopup").style.display = "block";

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
          saveFalseFact(headers[1], guessedCharacterFacts.guessedGender)
       }

      // Being
      if (currentCharacter && currentCharacter.being === guessedCharacterFacts.guessedBeing) {
          document.getElementById("correctBeingResult").innerHTML = `<p><strong>${headers[2]}:</strong> ${guessedCharacterFacts.guessedBeing}</p>`;
          document.querySelectorAll(".rectangleCorrect")[2].style.display = "flex"; 
          saveCorrectFact(headers[2], guessedCharacterFacts.guessedBeing);
        } else {
          document.getElementById("wrongBeingResult").innerHTML = `<p><strong>${headers[2]}:</strong> ${guessedCharacterFacts.guessedBeing}</p>`; 
          document.querySelectorAll(".rectangleWrong")[2].style.display = "flex";
          saveFalseFact(headers[2], guessedCharacterFacts.guessedBeing)
      }

          

      // Hero Status
      if (currentCharacter && currentCharacter.heroStatus === guessedCharacterFacts.guessedHeroStatus) {
        document.getElementById("correctHeroStatusResult").innerHTML = `<p><strong>${headers[3]}:</strong> ${guessedCharacterFacts.guessedHeroStatus}</p>`;
        document.querySelectorAll(".rectangleCorrect")[3].style.display = "flex"; 
        saveCorrectFact(headers[3], guessedCharacterFacts.guessedHeroStatus);
      } else {
        document.getElementById("wrongHeroStatusResult").innerHTML = `<p><strong>${headers[3]}:</strong> ${guessedCharacterFacts.guessedHeroStatus}</p>`; 
        document.querySelectorAll(".rectangleWrong")[3].style.display = "flex";
        saveFalseFact(headers[3], guessedCharacterFacts.guessedHeroStatus)
      }

      // Phase
      if (currentCharacter && currentCharacter.phase === guessedCharacterFacts.guessedPhase) {
        document.getElementById("correctPhaseResult").innerHTML = `<p><strong>${headers[4]}:</strong> ${guessedCharacterFacts.guessedPhase}</p>`;
        document.querySelectorAll(".rectangleCorrect")[4].style.display = "flex"; 
        saveCorrectFact(headers[4], guessedCharacterFacts.guessedPhase);
      } else {
        document.getElementById("wrongPhaseResult").innerHTML = `<p><strong>${headers[4]}:</strong> ${guessedCharacterFacts.guessedPhase}</p>`; 
        document.querySelectorAll(".rectangleWrong")[4].style.display = "flex";
        saveFalseFact(headers[4], guessedCharacterFacts.guessedPhase)
      }


      // Power Origin
      if (currentCharacter && currentCharacter.powerOrigin === guessedCharacterFacts.guessedPowerOrigin) {
        document.getElementById("correctPowerOriginResult").innerHTML = `<p><strong>${headers[5]}:</strong> ${guessedCharacterFacts.guessedPowerOrigin}</p>`;
        document.querySelectorAll(".rectangleCorrect")[5].style.display = "flex"; 
        saveCorrectFact(headers[5], guessedCharacterFacts.guessedPowerOrigin);
      } else {
        document.getElementById("wrongPowerOriginResult").innerHTML = `<p><strong>${headers[5]}:</strong> ${guessedCharacterFacts.guessedPowerOrigin}</p>`; 
        document.querySelectorAll(".rectangleWrong")[5].style.display = "flex";
        saveFalseFact(headers[5], guessedCharacterFacts.guessedPowerOrigin)
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
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> Born before ${guessedCharacterFacts.guessedBirthYear}</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      } else if (parseInt(currentCharacter.birthYear) > parseInt(guessedCharacterFacts.guessedBirthYear)) {
        document.getElementById("wrongBirthYearResult").innerHTML = `<p><strong>${headers[6]}:</strong> Born after ${guessedCharacterFacts.guessedBirthYear}</p>`; 
        document.querySelectorAll(".rectangleWrong")[6].style.display = "flex";
      }



      // Colour
      if (currentCharacter && currentCharacter.colour === guessedCharacterFacts.guessedColour) {
        document.getElementById("correctColourResult").innerHTML = `<p><strong>${headers[7]}:</strong> ${guessedCharacterFacts.guessedColour}</p>`;
        document.querySelectorAll(".rectangleCorrect")[7].style.display = "flex"; 
        saveCorrectFact(headers[7], guessedCharacterFacts.guessedColour);
      } else {
        document.getElementById("wrongColourResult").innerHTML = `<p><strong>${headers[7]}:</strong> ${guessedCharacterFacts.guessedColour}</p>`; 
        document.querySelectorAll(".rectangleWrong")[7].style.display = "flex";
        saveFalseFact(headers[7], guessedCharacterFacts.guessedColour)
      }



      
      if (!isNaN(parseInt(guessedCharacterFacts.guessedBirthYear))) {
        updateClosestBirthYears(guessedCharacterFacts.guessedBirthYear, currentCharacter.birthYear);
        displayClosestBirthYears();
      }
      
      foundCharacter = true;
      break;
    }
  }

  if (!foundCharacter) {
    document.getElementById("result").innerHTML = "No match found.";
  }
  document.getElementById("searchInput").value = "";
}




function saveCorrectFact(label, value) {
  const entry = `${label}: ${value}`;

  if (!correctFacts.has(entry)) {
    correctFacts.add(entry);
    const li = document.createElement("li");
    li.innerHTML = `<strong>${label}:</strong> ${value}`;
    li.style.textAlign = "left";

    document.getElementById("correctGuessesList").appendChild(li);
  }
}

function saveFalseFact(label, value) {
  if (!falseFactsMap[label]) {
    falseFactsMap[label] = new Set();
  }

  if (!falseFactsMap[label].has(value)) {
    falseFactsMap[label].add(value);
    updateFalseGuessesList();
  }
}


function updateFalseGuessesList() {
  const list = document.getElementById("falseGuessesList");
  list.innerHTML = ""; // Clear previous entries

  // Loop through categories
  for (const category in falseFactsMap) {
    const values = Array.from(falseFactsMap[category]).join(", "); // Convert Set to string

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = `<strong>${category}:</strong> ${values}`;
    li.style.textAlign = "left";
    list.appendChild(li);
  }
}




let closestBornAfter = null;
let closestBornBefore = null;

function updateClosestBirthYears(guessedYear, actualYear) {
  const guessedNum = parseInt(guessedYear);
  const actualNum = parseInt(actualYear);

  if (guessedNum !== "Unknown" && actualNum !== "Unknown") {
    if (guessedNum < actualNum) {
      if (closestBornAfter === null || guessedNum > closestBornAfter) { // born after
        closestBornAfter = guessedNum;
      }
    } else if (guessedNum > actualNum) {
      if (closestBornBefore === null || guessedNum < closestBornBefore) {
        closestBornBefore = guessedNum;
      }
    }
  }
}


function displayClosestBirthYears() {
  const list = document.getElementById("correctGuessesList");

  // Remove previous closest before/after entries to avoid duplicates
  document.getElementById("closestBornAfterItem")?.remove();
  document.getElementById("closestBornBeforeItem")?.remove();

  // Add closest before if available
  if (closestBornAfter) {
    const liBefore = document.createElement("li");
    liBefore.id = "closestBornAfterItem";
    liBefore.innerHTML = `<strong>Born after:</strong> ${closestBornAfter}`;
    liBefore.style.textAlign = "left";
    list.appendChild(liBefore);
  }

  // Add closest after if available
  if (closestBornBefore) {
    const liAfter = document.createElement("li");
    liAfter.id = "closestBornBeforeItem";
    liAfter.innerHTML = `<strong>Born before:</strong> ${closestBornBefore}`;
    liAfter.style.textAlign = "left";

    list.appendChild(liAfter);
  }
}



function closePopup() {
  document.getElementById("congratsPopup").style.display = "none";
}


