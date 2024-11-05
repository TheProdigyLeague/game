function numberGuessingGame() {
    const maxGuesses = 5;
    let guessesTaken = 0;
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    while (guessesTaken < maxGuesses) {
        const guess = parseInt(prompt("A number between 1 and 100"));
        guessesTaken++;
        
    if (guess === randomNumber) {
        alert(`Congratulations!!! You won!! In ${guessesTaken} tries`);
        return;
    } else if (guess < randomNumber) {
        alert("You lose!! Try Again???");
    } else {
        alert("You lose! Try Again?");
    }
    }
    
    alert(`Game Over...${randomNumber}`);
}

numberGuessingGame();
