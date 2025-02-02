// Game State
let gameState = {
    playerX: 0, // Initial player position
    currentScene: "startMenu",
    playerSpeed: 5, // Adjust as needed
    gameWidth: 800,
    merchantX: 660,
    merchantMessageShown: false,
    playerGold: 0,
    isShopOpen: false, // New state to track if the shop is open
};

/** DOM Elements
TODO: add HTML5 - canvas for mobile game
**/

const gameContainer = document.getElementById("game-container");
const background = document.getElementById("background");
const player = document.getElementById("player");
const horizontalPlane = document.getElementById("horizontal-plane");
const merchant = document.getElementById("merchant");
const textOutput = document.getElementById("text-output");
const mainMenuContainer = document.getElementById("main-menu-container");
const mainMenuBackground = document.getElementById("main-menu-background");
const mainMenuText = document.getElementById("main-menu-text");
const mainMenuAudio = document.getElementById("main-menu-audio");

// Start Menu
function showStartMenu() {
    gameContainer.style.display = "none"; // Hide the game scene
    mainMenuContainer.style.display = "block"; // Show the main menu
    mainMenuText.innerHTML = `
        <p>Welcome to the Adventure!</p>
        <p class="menu-option" id="start-game-option"> > Start Game</p>
        <p class="menu-option" id="exit-game-option"> > Exit Game</p>
    `;
    // Add event listeners to menu options
    document.getElementById("start-game-option").addEventListener("click", startGame);
    document.getElementById("exit-game-option").addEventListener("click", exitGame);
}

// Start Game
function startGame() {
    gameState.currentScene = "gameplay";
    mainMenuAudio.play(); // Play the main menu audio
    loadAssets();
    console.log("Game started!");
    showGameScene();
}

// Exit Game
function exitGame() {
    console.log("Exiting game...");
    mainMenuText.innerHTML = "<p>Thanks for playing!</p>";
    // You could add more exit logic here if needed
}

// Load Assets (Console Output)
function loadAssets() {
    console.log("Loading background.img.png...");
    console.log("Loading character/assets/player.png...");
    console.log("Loading horizontal.plane.png...");
    console.log("Loading merchant.png...");
    console.log("Loading gold.coin.png...")
}

// Show Game Scene
function showGameScene() {
    mainMenuContainer.style.display = "none"; // Hide the main menu
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

// --- 2 & 4. Boundary Checks ---
// Handle Movement Input
function handleMovementInput(event) {
    if (gameState.currentScene === "gameplay") {
        let newPlayerX = gameState.playerX; // Start with the current position
        const playerWidth = player.offsetWidth;
        if (event.key === "ArrowRight") {
            newPlayerX += gameState.playerSpeed;
            console.log("Moved Right");
        } else if (event.key === "ArrowLeft") {
            newPlayerX -= gameState.playerSpeed;
            console.log("Moved Left");
        }

        // Update the player's position only if it has changed and introduce boundary checks
        if (newPlayerX + playerWidth > gameState.gameWidth) {
            newPlayerX = gameState.gameWidth - playerWidth;
            console.log("Hit Boundary");
        }

        // Prevent moving off the left edge
        if (newPlayerX < 0) {
            newPlayerX = 0;
            console.log("Prevent Movement off Left Boundary");
        }
        // Prevent moving off the right edge
        console.log("New Player X Position:", newPlayerX);
        if (newPlayerX >= 750) {
            newPlayerX = 750;
            console.log("Prevent Movement off Right Boundary")
        }
        // merchant UI
        if (newPlayerX + playerWidth >= gameState.merchantX && !gameState.merchantMessageShown) {
            // Player is near the merchant and the message hasn't been shown yet
            textOutput.innerHTML = "<p id='shop-option'>Shop at this merchant.</p>";
            gameState.merchantMessageShown = true; // Set the flag to true
            document.getElementById("shop-option").addEventListener("click", openShop); // Add event listener to the shop option
        } else if (newPlayerX + playerWidth < gameState.merchantX && gameState.merchantMessageShown) {
            // Player has moved away from the merchant
            textOutput.innerHTML = "<p>You are at the beginning of your journey.</p>";
            gameState.merchantMessageShown = false; // Reset the flag
            // Remove the event listener when the player moves away
            const shopOption = document.getElementById("shop-option");
            if (shopOption) {
                shopOption.removeEventListener("click", openShop);
            }
        }

        // Update the player's position only if it has changed
        if (newPlayerX !== gameState.playerX) {
            gameState.playerX = newPlayerX;
            player.style.left = gameState.playerX + "px";
        }
    }
}

// Open Shop
function openShop() {
    if (!gameState.isShopOpen) {
        gameState.isShopOpen = true;
        showShopMenu();
    }
}

// Show Shop Menu
function showShopMenu() {
    textOutput.innerHTML = `
        <p>Merchant's Wares:</p>
        <p>1. Dagger - 5g</p>
        <p>2. Potion - 10g</p>
        <p>3. Map - 20g</p>
        <p id="close-shop-option"> > Close Shop</p>
    `;
    // Add event listener to close the shop
    document.getElementById("close-shop-option").addEventListener("click", closeShop);
}

// Close Shop
function closeShop() {
    gameState.isShopOpen = false;
    textOutput.innerHTML = "<p id='shop-option'>Shop at this merchant.</p>";
    document.getElementById("shop-option").addEventListener("click", openShop);
}

// Initialize the game
showStartMenu();

// TODO: Fix this to port mobile
/* canvas.addEventListener('touchstart', (event) => {
    console.log("touchstart event triggered");
    event.preventDefault(); // Prevent default touch behavior
    if (!gameStarted) {
        console.log("gameStarted is false, calling startGame()");
        startGame();
    } else {
        console.log("gameStarted is true, not calling startGame()");
    }
});
*/