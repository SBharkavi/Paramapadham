'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const sc0 = document.querySelector('#score--0');
const sc1 = document.querySelector('#score--1');
const roll = document.querySelector('.btn--roll');
const dice1 = document.querySelector('#dice--0');
const dice2 = document.querySelector('#dice--1');
const newgame = document.querySelector('.btn--new');
var msg = new SpeechSynthesisUtterance();

const StartBTN = document.querySelector('.btn--start');
const EditName = document.querySelector('.btn--name');
const PlayBTN = document.querySelector('.btn--play')
// const BackBTN = document.getElementById('#btn-back')
// // name variable
let nameP1 = "Player 1";
let nameP2 = "Player 1";



//sound
const rollSound=new Audio('images/roll-dice.mp3');
rollSound.playbackRate=3;
const winning=new Audio('images/win.mp3');
const snakeSound=new Audio('images/snake-sound.mp3');
snakeSound.playbackRate=2;
const ladderUp=new Audio('images/ladder-sound.mp3');
ladderUp.playbackRate=6;



let activePlayer, unactivePlayer, playing,currentpos,steps,target,die1,die2,score;


// play function 

const init = function () {
    dice1.classList.add('hidden');
    dice2.classList.add('hidden');
    sc0.textContent = 0;
    sc1.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');

    playing = true;
    activePlayer = 0;

}
init();

// random dice
const randomDice = function() {
    return Math.trunc(Math.random() * 4);
}

// roll dice
const rollDice =function(){
    die1 = randomDice()
    dice1.classList.remove('hidden');
    dice1.src = `images/dice-${die1}.jpeg`;
    die2 = randomDice()
    dice2.classList.remove('hidden');
    dice2.src = `images/dice-${die2}.jpeg`;
}



roll.addEventListener('click', function () {
    rollSound.play()
    if (playing) {
        rollDice()
        unactivePlayer = activePlayer === 0 ? 1 : 0;
        const otherscore = document.getElementById(`score--${unactivePlayer}`).textContent;
        score = document.getElementById(`score--${activePlayer}`).textContent;
        steps = die1 + die2;//3+2       
        currentpos = Number(score);//5
        target = currentpos + steps;//10
        switch (target) {
            case 2: target = 38; ladderUp.play(),textTospeechLadder(); break;
            case 7: target = 14; ladderUp.play(),textTospeechLadder(); break;
            case 8: target = 31; ladderUp.play(),textTospeechLadder(); break;
            case 15:target = 26; ladderUp.play(),textTospeechLadder(); break;
            case 27:target = 84; ladderUp.play(),textTospeechLadder(); break;
            case 21:target = 42; ladderUp.play(),textTospeechLadder(); break;
            case 36:target = 44; ladderUp.play(),textTospeechLadder(); break;
            case 51:target = 67; ladderUp.play(),textTospeechLadder(); break;
            case 71:target = 91; ladderUp.play(),textTospeechLadder(); break;
            case 78:target = 98; ladderUp.play(),textTospeechLadder(); break;
            case 87:target = 94; ladderUp.play(),textTospeechLadder(); break;
            case 16:target = 6;  snakeSound.play(),textTospeechSnake(); break;
            case 46:target = 25; snakeSound.play(),textTospeechSnake(); break;
            case 49:target = 11; snakeSound.play(),textTospeechSnake(); break;
            case 62:target = 19; snakeSound.play(),textTospeechSnake(); break;
            case 64:target = 60; snakeSound.play(),textTospeechSnake(); break;
            case 74:target = 53; snakeSound.play(),textTospeechSnake(); break;
            case 89:target = 68; snakeSound.play(),textTospeechSnake(); break;
            case 92:target = 88; snakeSound.play(),textTospeechSnake(); break;
            case 95:target = 75; snakeSound.play(),textTospeechSnake(); break;
            case 99:target = 80; snakeSound.play(),textTospeechSnake(); break;
            default: break;
        }

        movecoin(`b${target}`,`coin--${activePlayer}`); // movecoin(`b10`,coin--0)

        if (target != otherscore) {

            if (target >= 100) {
                // Finish the game
                target = 100;
                playing = false;
                dice1.classList.add('hidden');
                dice2.classList.add('hidden');
                winner()
            }
            document.getElementById(`score--${activePlayer}`).textContent = target;
            activePlayer = activePlayer === 0 ? 1 : 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }
        else
            document.getElementById(`score--${unactivePlayer}`).textContent = 0;

    }
});

// text to speech 
let textTospeechLadder = function(){
    msg.text = "congrats!you are enter a ladder"
    window.speechSynthesis.speak(msg);
}

let textTospeechSnake = function(){
    msg.text = "Oppsss!you are stepped a snake"
    window.speechSynthesis.speak(msg);
}


// winner function
const winner = function(){
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    winning.play()
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    msg.text = "congratulations you are the winner";
    window.speechSynthesis.speak(msg);

}


// change name 

function editNames() {
    nameP1 = prompt("Change Player1 Name")
    nameP2 = prompt("Change Player2 Name")

    if (player1.length < 1 || player2.length < 1) {
        alert('please enter valid name');
        return;
    }
    document.querySelector("p.Player1").innerHTML = player1;

    document.querySelector("p.Player2").innerHTML = player2;
}


const movecoin = function(targetpos,presentCoin){
    console.log(document.getElementById(`b${target}`),(document.getElementById(`coin--${activePlayer}`)))
    document.getElementById(targetpos).appendChild(document.getElementById(presentCoin))
    
}


newgame.addEventListener('click',()=>{
    document.getElementById('color_box').appendChild(document.getElementById(`coin--0`))
    document.getElementById('color_box').appendChild(document.getElementById(`coin--1`))
    init()
});



