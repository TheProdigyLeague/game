// Game State
let gameState = {
    playerX: 0, // Initial player position
    currentScene: "startMenu",
    playerSpeed: 6, // Adjust as needed
    gameWidth: 800,
    merchantX: 660,
    merchantMessageShown: false,
    playerGold: 5,
};

/** DOM Elements
TODO: add HTML5 - canvas for mobile game
**/

const gameContainer = document.getElementById("game-container");
const background = document.getElementById("background");
const player = document.getElementById("player");
const horizontalPlane = document.getElementById("horizontal-plane");
const merchant = document.getElementById("merchant");
const textOutput = document.getElementById("text-output"); // old version
const mainMenuContainer = document.getElementById("main-menu-container");
const mainMenuBackground = document.getElementById("main-menu-background"); // old version
const mainMenuText = document.getElementById("main-menu-text"); // old version
const mainMenuAudio = document.getElementById("main-menu-audio");
const mainMenuVideo = document.getElementById("main-menu-video");
const goldDisplay = document.getElementById("gold-display");
const goldDisplayMain = document.createElement("div");
goldDisplayMain.id = "gold-display-main";
goldDisplayMain.style.position = "absolute";
goldDisplayMain.style.top = "10px";
goldDisplayMain.style.left = "10px";
goldDisplayMain.style.color = "gold";
goldDisplayMain.style.zIndex = "100";
goldDisplayMain.innerHTML = `<img src="assets/gold.coin.png" alt="Gold Coin" style="width: 15px; height: 20px; vertical-align: middle;"> Gold: ${gameState.playerGold}`;
gameContainer.appendChild(goldDisplayMain);
const clickableText = document.createElement("a");
        clickableText.href = "#";
        clickableText.textContent = "Shop at this merchant.";
        clickableText.style.cursor = "pointer";

let typedText = "";
// Start Menu
function showStartMenu() {
    gameContainer.style.display = "none"; // Hide the game scene
    mainMenuContainer.style.display = "block"; // Show the main menu
    // Add event listeners to menu options
}
// Listen for key presses on the entire document
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const inputText = typedText.trim().toLowerCase();
        if (inputText === 'start game') {
            startGame(); // Start the game if "start game" was typed
        } else {
            // Show the prompt dialog
            const dialogInput = prompt("Please type 'Start Game'");
            if (dialogInput !== null && dialogInput.trim().toLowerCase() === 'start game') {
                startGame(); // Start the game if "Start Game" was typed in the dialog
            }
        }
        // Reset typed text after Enter
        typedText = "";
    } else if (event.key.length === 1) {
        // Append typed characters to the string
        typedText += event.key;
    }
});
// Start Game
function startGame() {
    gameState.currentScene = "gameplay";
    mainMenuAudio.play(); // Pause the main menu audio
    mainMenuAudio.currentTime = 0; // Reset the audio to the beginning
    mainMenuAudio.muted = false;
    mainMenuVideo.pause();
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
// Function to handle merchant clicks (now triggered by the clickable text)
function handleMerchantClick() {
    // Open the merchant interface
    openMerchantInterface();
}

// Function to open the merchant interface (example with a simple dialog)
function openMerchantInterface() {
    // Create a simple dialog (you can replace this with a more complex UI)
    const merchantDialog = document.createElement("div");
    merchantDialog.id = "merchant-dialog";
    merchantDialog.style.position = "absolute";
    merchantDialog.style.top = "50%";
    merchantDialog.style.left = "50%";
    merchantDialog.style.transform = "translate(-50%, -50%)";
    merchantDialog.style.backgroundColor = "white";
    merchantDialog.style.border = "1px solid black";
    merchantDialog.style.padding = "20px";
    merchantDialog.style.zIndex = "100"; // Ensure it's on top
    merchantDialog.innerHTML = `
        <h3>Merchant Shop</h3>
        <p>Welcome to my shop! What would you like to buy?</p>
        <div id="merchant-wares">
            <!-- Merchant wares will be displayed here -->
        </div>
        <button id="close-merchant">Close</button>
    `;

    // Add the dialog to the game container
    gameContainer.appendChild(merchantDialog);

    // Add a close button event listener
    const closeButton = document.getElementById("close-merchant");
    closeButton.addEventListener("click", () => {
        gameContainer.removeChild(merchantDialog);
    });
    // Display the merchant's wares
        displayMerchantWares();
    }

// Function to display the merchant's wares
function displayMerchantWares() {
    const merchantWaresContainer = document.getElementById("merchant-wares");
    merchantWaresContainer.innerHTML = ""; // Clear any existing wares

    // Example wares (replace with your actual data)
    const wares = [
        { name: "Potion", price: 5 },
        { name: "Dagger", price: 10 },
        { name: "Map", price: 25 },
    ];

    // Create and add elements for each ware
        wares.forEach((ware) => {
            const wareElement = document.createElement("div");
            wareElement.innerHTML = `${ware.name} - Gold: ${ware.price}`;

            // Create a buy button
            const buyButton = document.createElement("button");
            buyButton.textContent = "Buy";
            buyButton.addEventListener("click", () => {
                handlePurchase(ware);
            });

            wareElement.appendChild(buyButton);
            merchantWaresContainer.appendChild(wareElement);
        });
    }
// Function to handle the purchase of an item
function handlePurchase(item) {
    if (gameState.playerGold >= item.price) {
        // Player can afford the item
        gameState.playerGold -= item.price;
        textOutput.innerHTML = `<p>You buy the ${item.name}.</p>`;
        // Update the gold display
        updateGoldDisplay();
    } else {
        // Player cannot afford the item
        textOutput.innerHTML = "<p>You cannot afford this item.</p>";
    }
}

// Function to update the gold display
function updateGoldDisplay() {
    // Update the gold display in the main game scene
    goldDisplayMain.innerHTML = `<img src="assets/gold.coin.png" alt="Gold Coin" style="width: 15px; height: 20px; vertical-align: middle;"> Gold: ${gameState.playerGold}`;
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
         // merchant UI revisited
                if (newPlayerX + playerWidth >= gameState.merchantX && !gameState.merchantMessageShown) {
                    // Player is near the merchant and the message hasn't been shown yet
                    // Create a clickable link
                    const clickableText = document.createElement("a");
                    clickableText.href = "#"; // Use "#" as a placeholder for now
                    clickableText.textContent = "Shop at this merchant.";
                    clickableText.style.cursor = "pointer"; // Make it look clickable

                    // Add a click event listener to the link
                    clickableText.addEventListener("click", (event) => {
                        event.preventDefault(); // Prevent the default link behavior
                        handleMerchantClick(); // Open the merchant interface
                    });

                    // Clear the textOutput and append the clickable link
                    textOutput.innerHTML = "";
                    textOutput.appendChild(clickableText);
                    gameState.merchantMessageShown = true; // Set the flag to true
                            } else if (newPlayerX + playerWidth < gameState.merchantX && gameState.merchantMessageShown) {
                                // Player has moved away from the merchant
                                textOutput.innerHTML = "<p>You are at the beginning of your journey.</p>";
                                gameState.merchantMessageShown = false; // Reset the flag
                            }


        // Update the player's position only if it has changed
        if (newPlayerX !== gameState.playerX) {
            gameState.playerX = newPlayerX;
            player.style.left = gameState.playerX + "px";
        }
    }
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