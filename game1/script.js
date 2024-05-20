let scoreStr = localStorage.getItem('Score');
let score;
resetScore(scoreStr);

let userName = prompt("Enter your name");

function resetScore(scoreStr) {
    localStorage.removeItem('Score');
    score = {
        user: 0,
        comp: 0,
        turns: 0
    };
    document.getElementById('result').innerText = 'Choose Stone, Paper or Scissors';
    document.getElementById('user-win').innerText = 0;
    document.getElementById('comp-win').innerText = 0;
}


function resetGame() {
    localStorage.clear();
    resetScore();
}


function computerChoice() {
    const choices = ['stone', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'It\'s a tie!';
    } 
    else if ((player === 'stone' && computer === 'scissors') ||
               (player === 'paper' && computer === 'stone') ||
               (player === 'scissors' && computer === 'paper')) {
           score.user++;   
           score.turns++;
           return `${userName} win!`;
    } 
    else {
        score.comp++;
        score.turns++; 
        return 'Computer win!';
    }
}

function check(){
    let flag = prompt("So, Do you want to continue?(Say Yes/No)");
    if(flag === "Yes" || flag === "yes"){
        location.reload();
    }
    else{
        document.getElementById("container").innerText = "Game Over";
    }
}

function playerChoice(userChoice) {
    const computer = computerChoice();
    const result = determineWinner(userChoice, computer);
    document.getElementById('result').innerText = `${userName} chose ${userChoice}, Computer chose ${computer}, ${result}`;
    console.log(score);

    // Update the score display
    if (score.user == 1) {
        document.getElementById('user-win').innerText = '⭐';
    }
    if (score.user == 2) {
        document.getElementById('user-win').innerText = '⭐ ⭐';
    }
    if (score.user == 3) {
        document.getElementById('user-win').innerText = '⭐ ⭐ ⭐';
    }
    if (score.comp == 1) {
        document.getElementById('comp-win').innerText = '⭐';
    }
    if (score.comp == 2) {
        document.getElementById('comp-win').innerText = '⭐ ⭐';
    }
    if (score.comp == 3) {
        document.getElementById('comp-win').innerText = '⭐ ⭐ ⭐';
    }

    // Check for a win condition
    if (score.user == 3 || score.comp == 3) {
        document.getElementById('container').innerText = `${result}`;
        setTimeout(resetScore, 2000); // Optionally delay the reset
        setTimeout(check, 2000);
    }

    // Save the updated score to localStorage
    localStorage.setItem('Score', JSON.stringify(score));
}



