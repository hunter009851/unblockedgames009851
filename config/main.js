// config/main.js
var sitename = "This is school work trust";
var subtext = "v1.2"; 

import "./custom.js";

let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game"); 

    const gameImage = document.createElement("img");
    gameImage.src = game.image; 
    gameImage.alt = game.name;
    
    // CHANGE: Opens the game in the modal instead of redirecting
    gameImage.onclick = () => {
      openGame(game.url);
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

// Function to open the modal
function openGame(url) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  
  iframe.src = url;
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Stop background scrolling
}

// Function to close the modal
function closeGame() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameFrame");
  
  modal.style.display = "none";
  iframe.src = ""; // Stop the game from running in background
  document.body.style.overflow = "auto"; // Restore scrolling
}

fetch("config/games.json")      
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load games.json. Check if the file exists.");
    }
    return response.json();
  })
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));

document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;
document.getElementById("subtitle").innerHTML = `${subtext}`;   
