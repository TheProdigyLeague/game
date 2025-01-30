// Game State
let gameState = {
    playerX: 0, // Initial player position
    currentScene: "startMenu",
};

// DOM Elements
const gameContainer = document.getElementById("game-container");
const background = document.getElementById("background");
const player = document.getElementById("player");
const horizontalPlane = document.getElementById("horizontal-plane");
const textOutput = document.getElementById("text-output");
const mainMenuContainer = document.getElementById("main-menu-container");
const mainMenuBackground = document.getElementById("main-menu-background");
const mainMenuText = document.getElementById("main-menu-text");
const mainMenuAudio = document.getElementById("main-menu-audio");

// Start Menu
function showStartMenu() {
    textOutput.innerHTML = `
        <p>Welcome to the Adventure!</p>
        <p> > Start Game</p>
        <p> > Exit Game</p>
    `;

    // Listen for player input
    document.addEventListener("keydown", handleStartMenuInput);
}

function handleStartMenuInput(event) {
    if (event.key === "Enter") {
        const input = prompt("Enter your choice:");
        if (input && input.toLowerCase() === "start game") {
            mainMenuAudio.play(); // Play the main menu audio
            startGame();
        } else if (input && input.toLowerCase() === "exit game") {
            console.log("Exiting game...");
            // You could add more exit logic here if needed
            textOutput.innerHTML = "<p>Thanks for playing!</p>";
        }
    }
}

// Start Game
function startGame() {
    gameState.currentScene = "gameplay";
    document.removeEventListener("keydown", handleStartMenuInput); // Remove start menu listener
    loadAssets();
    console.log("Game started!");
    showGameScene();
}

// Load Assets (Console Output)
function loadAssets() {
    console.log("Loading background.img.png...");
    console.log("Loading character/assets/player.png...");
    console.log("Loading horizontal.plane.png...");
}

// Show Game Scene
function showGameScene() {
    textOutput.style.display = "none"; // Hide the start menu
    gameContainer.style.display = "block"; // Show the game scene
    textOutput.innerHTML = "<p>You are at the beginning of your journey.</p>";
    // Position the player and plane
    player.style.position = "absolute";
    player.style.left = gameState.playerX + "px";
    player.style.bottom = "0px"; // Adjust as needed

    horizontalPlane.style.position = "absolute";
    horizontalPlane.style.left = "0px";
    horizontalPlane.style.bottom = "0px"; // Adjust as needed

    // Listen for movement input
    document.addEventListener("keydown", handleMovementInput);
}

// Handle Movement Input
function handleMovementInput(event) {
    if (gameState.currentScene === "gameplay") {
        if (event.key === "ArrowRight") {
            gameState.playerX += 10; // Move right
            player.style.left = gameState.playerX + "px";
            console.log("Moved right!");
        } else if (event.key === "ArrowLeft") {
            gameState.playerX -= 10; // Move left
            player.style.left = gameState.playerX + "px";
            console.log("Moved left!");
        }
    }
}

// Initialize the game
showStartMenu();
function showStartMenu() {
            gameContainer.style.display = "none"; // Hide the game scene
            mainMenuContainer.style.display = "block"; // Show the main menu
            mainMenuText.innerHTML = `
                <p>Welcome to the Adventure!</p>
                <p class="menu-option"> > Start Game</p>
                <p class="menu-option"> > Exit Game</p>
            `;
            // Listen for player input
            document.addEventListener("keydown", handleStartMenuInput);
        }
