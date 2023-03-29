'use strict';

const pnamefield0=document.getElementById('pname0');
const pnamefield1=document.getElementById('pname1');

const playerName0El=document.querySelector('#p0-name');
const playerName1El=document.querySelector('#p1-name');

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
const PlayBTN = document.querySelector('.btn--play')
const replayBtn=document.querySelector('.btn--again');



//sound
const rollSound=new Audio('images/roll-dice.mp3');
rollSound.playbackRate=3;
const winning=new Audio('images/win.mp3');
const snakeSound=new Audio('images/snake-sound.mp3');
snakeSound.playbackRate=2;
const ladderUp=new Audio('images/ladder-sound.mp3');
ladderUp.playbackRate=6;



let activePlayer, inactivePlayer, playing,currentpos,steps,target,die1,die2,score,player0,player1,playerNames;


// play function 

const init = function () {
    
    dice1.classList.add('hidden');
    dice2.classList.add('hidden');
    inactivePlayer = 1
    playerNames=[];
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
        inactivePlayer = activePlayer === 0 ? 1 : 0;
        const otherscore = document.getElementById(`score--${inactivePlayer}`).textContent;
        score = document.getElementById(`score--${activePlayer}`).textContent;
        //steps = die1 + die2;//3+2
        steps = 100//3+2       
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
            document.getElementById(`score--${inactivePlayer}`).textContent = 0;

    }
});

// text to speech 
let textTospeechLadder = function(){
    msg.text = `congrats ${playerNames[activePlayer]}!you are enter a ladder`;
    window.speechSynthesis.speak(msg);
}

let textTospeechSnake = function(){
    msg.text = `Oppsss! ${playerNames[activePlayer]} you are stepped a snake`
    window.speechSynthesis.speak(msg);
}


// winner function

//winner 
const winnerOverlay= document.querySelector('#winner-overlay');
const winnerModal= document.querySelector('#winner-modal');

const winner = function(){
 //   let currentWinner = document.querySelector(`#p${activePlayer}-name`).textContent
    document.querySelector('#winner-name').textContent=playerNames[activePlayer] ;
    winnerOverlay.classList.remove('hidden');
    winnerModal.classList.remove('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    winning.play()
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    msg.text = `congratulations ${playerNames[activePlayer]} you are the winner` ;
    window.speechSynthesis.speak(msg);


}


// change name 

const PlayGame =()=>{
    //1. Store player names
    console.log(document.getElementsByClassName('name-field'));
    player0=document.querySelector('#pname0').value;
    player1=document.querySelector('#pname1').value;
    if(player0===''||player1===''){
        alert("Please, enter your name");
    }else if(!(((player0.length<=20))||!(player1.length<=20))){
        alert("You should fill the name maximum of 20 letters");
    }else{
        //2. Go to next page to play
        init();
        playerNames.push(player0,player1);
        console.log(playerNames)
        playerName0El.textContent=playerNames[activePlayer];
        playerName1El.textContent=playerNames[inactivePlayer];
        console.log(playerName0El.textContent,playerName1El.textContent,playerNames[inactivePlayer])
        document.getElementById('begin').style.visibility = "hidden";
        document.getElementById('play').classList.add("hidden");
        document.getElementById('main').classList.remove("hidden");
        document.getElementById('sub').classList.remove("hidden");

    }
 }

 PlayBTN.addEventListener('click',PlayGame)




const movecoin = function(targetpos,presentCoin){
    // console.log(document.getElementById(`b${target}`),(document.getElementById(`coin--${activePlayer}`)))
    document.getElementById(targetpos).appendChild(document.getElementById(presentCoin))
    
}





newgame.addEventListener('click',()=>{
    document.getElementById('coin').appendChild(document.getElementById(`coin--0`))
    document.getElementById('coin').appendChild(document.getElementById(`coin--1`))
    init()

});





StartBTN.addEventListener('click',()=>{
    document.getElementById('home').classList.add("hidden");
    document.getElementById('play').classList.remove("hidden");
});

replayBtn.addEventListener('click',()=>{
    document.querySelector('#winner-name').textContent=``;
    winnerModal.classList.add('hidden');
    winnerOverlay.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); 
    player0=document.querySelector('#pname0').value;
    player1=document.querySelector('#pname1').value;
    playerNames.push(player0,player1);
    document.getElementById('coin').appendChild(document.getElementById(`coin--0`))
    document.getElementById('coin').appendChild(document.getElementById(`coin--1`))
    init();

});






