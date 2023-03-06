const qwerty = document.getElementById('qwerty');

const phrase = document.getElementById('phrase');

const btnReset = document.querySelector('.btn__reset');

const headlineText = document.querySelector('#overlay .title');

const overlay = document.getElementById('overlay');

const gamePhrases = ["RIDE OR DIE", "TIME IS MONEY", "NOW IS ALL", "AS WITHIN SO WITHOUT", "YOU MATTER"];


let missed = 0;



// This Function Hides the Overlay at the Start of the Game or Displays it again once you decide to reset it at the end.



// Hides the overlay and starts the game

btnReset.addEventListener('click', function(){
    overlay.style.display = 'none';
});


// This is a reusable function that you provide an array as an input and it will turn it each item of the array into new array of characters 

function getRandomPhraseAsArray(arr){

    // Creates a random number between 0 and upto the arrays length (based on it's index)

    let randomNumber = Math.floor(Math.random() * arr.length);

    // Selects a random item in the array and stores it in the random Array variable

    let randomArray = arr[randomNumber];

    // Splits the characters of the selected item and saves it in a new array

    let splittedArrayItem = randomArray.split('');
  
    // Returns the splitted array of characters

    return splittedArrayItem;
}




// Displays the splitted array of characters in list items inside a ul elements

function addPhraseToDisplay(arr){

    let selectedArray = getRandomPhraseAsArray(gamePhrases);

    for (let i = 0; i < selectedArray.length; i++){
        document.querySelector('#phrase ul').innerHTML += `<li>${selectedArray[i]}</li>`;
        if(selectedArray[i] !== " "){
            document.querySelectorAll('#phrase ul li')[i].className = 'letter';
        } else {
            document.querySelectorAll('#phrase ul li')[i].className = 'space';
        }
        
    }

}

// Removes the splitted array of characters in list items inside a ul elements

function removePhraseFromDisplay(arr){


    for (let i = 0; i < selectedArray.length; i++){
        document.querySelector('#phrase ul').innerHTML -= `<li>${selectedArray[i]}</li>`;
        
    }

}

addPhraseToDisplay(gamePhrases);


function checkLetter(button){
    const letters = document.querySelectorAll('.letter');
    let chosenLetter = null;
    for (let i = 0; i < letters.length; i++){
        if (button.textContent === letters[i].textContent.toLowerCase() ){
            letters[i].classList.add('show');
            chosenLetter = letters[i].textContent;
        } 
    }
    return chosenLetter;
}

qwerty.addEventListener('click', (e) => {

    let letterFound = null;

    if(e.target.tagName === 'BUTTON'){
        let buttonPressed = e.target;
        buttonPressed.classList.add('chosen');
        letterFound = checkLetter(buttonPressed);

        if (letterFound === null){
            const hearts = document.querySelectorAll('.tries img');
            missed++;
        
            hearts[missed - 1].src = 'images/lostHeart.png';
            buttonPressed.disabled = true;
        }

        checkWin();
    }

    
})



function checkWin(){
    const letters = document.querySelectorAll('.letter');
    const shown = document.querySelectorAll('.show');

    if (shown.length === letters.length){
        overlay.classList.add('win');
        headlineText.textContent = 'You Won!';
        overlay.style.display = 'flex';

        // Restarts the game

        btnReset.textContent = 'Restart the Game';
        for (let i = 0; i < letters.length; i++){
            letters[i].classList.remove('show');
    } 

        const buttons = document.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++){
            buttons[i].classList.remove('chosen')
        }

        const hearts = document.querySelectorAll('.tries img');

        for (let i = 0; i < hearts.length; i++){
            hearts[i].src = 'images/liveHeart.png';
        }
        
        const lis = document.querySelectorAll('#phrase ul li');

        for (let i = 0; i < lis.length; i++){
            lis[i].remove();
        }

        addPhraseToDisplay(gamePhrases);
    }

    if (missed > 4) {
        overlay.classList.add('lose');
        headlineText.textContent = 'You Lost!';
        overlay.style.display = 'flex';

        // Restarts the game
        btnReset.textContent = 'Restart the Game';
        for (let i = 0; i < letters.length; i++){
            letters[i].classList.remove('show');
    } 

        const buttons = document.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++){
            buttons[i].classList.remove('chosen')
        }

        const hearts = document.querySelectorAll('.tries img');

        for (let i = 0; i < hearts.length; i++){
            hearts[i].src = 'images/liveHeart.png';
        }
        
        const lis = document.querySelectorAll('#phrase ul li');

        for (let i = 0; i < lis.length; i++){
            lis[i].remove();
        }

        addPhraseToDisplay(gamePhrases);


    }

    
}