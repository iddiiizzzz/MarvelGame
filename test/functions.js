
// script.js
// async mean you can use await inside the function, like fetch.
async function searchData() {


    const input = document.getElementById("searchInput").value.toLowerCase(); // Read the input from html file
    const res = await fetch("ages.csv"); // Get the database file, the await pauses execution until the file is fetched
    const text = await res.text(); // Converts the fetched response to plain text. await pauses execution until text is ready
    const lines = text.trim().split("\n"); // Removes whitespace and splits into an array of lines with \n
    const headers = lines[0].split(","); // Splits header into array using commas, like ["Name", "Age"]
  
    for (let i = 1; i < lines.length; i++) { // Starts loop on second line, skips header
      const row = lines[i].split(","); // splits current row into comma separated array
      if (row[0].toLowerCase() === input) { // Checks for matches from the input to the file
        document.getElementById("result").innerHTML = 
          `<p><strong>${headers[1]}:</strong> ${row[1]}</p>`; // If match, it updates result with the corresponding string
        return; // Stops function when a match is found
      }
    }
  
    document.getElementById("result").innerHTML = "No match found."; // Prints if no match is found
  }
  