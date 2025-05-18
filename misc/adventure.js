let currentRoom = "start";
let inventory = [];

function startGame() {
  while (currentRoom !== "end") {
    if (currentRoom === "start") {
      console.log("You wake up in a dark room. There's a door to the north.");
      currentRoom = prompt("What do you do? (go north)");
    } else if (currentRoom === "northRoom") {
      console.log("You enter a dimly lit room. A faint light shines from a crack in the wall. A dusty old chest sits in the corner.");
      const action = prompt("What do you do? (examine chest, go back)");

      if (action === "examine chest") {
        console.log("You open the chest and find a rusty key.");
        inventory.push("rusty key");
        console.log("You now have a rusty key in your inventory.");
      } else if (action === "go back") {
        currentRoom = "start";
      } else {
        console.log("Invalid action. Please try again.");
      }
    } else if (currentRoom === "lockedRoom") {
      if (inventory.includes("rusty key")) {
        console.log("You use the key to unlock the door.");
        // ... (add logic for what happens inside the locked room)
        currentRoom = "end";
      } else {
        console.log("The door is locked. You need a key.");
      }
    } else {
      console.log("Invalid room.");
    }
  }

  console.log("Game over.");
}

startGame();
