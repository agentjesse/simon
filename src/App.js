import React, { Component } from 'react';
import './App.css';
import soundImport1 from './simonSound1.mp3';//try putting these directly into the state src for less code? at end.
import soundImport2 from './simonSound2.mp3';
import soundImport3 from './simonSound3.mp3';
import soundImport4 from './simonSound4.mp3';

class App extends Component {
  //constructor function
  constructor(props) {
    //make a call to super
    super(props);
    //local variables
    this.running = false;//controls if inputs will be accepted during playing of pattern
    this.playerMoves = []; //moves input from player
    this.movesArr = []; //moves chosen by pc
    this.playerIsAt = 0; //index of how much of the pattern the player has successfully repeated
    this.intervalId = undefined; //store id here....in react state it triggers the interval function twice after win

    //set the state
    this.state = {
      sound0: new Audio(soundImport1),
      sound1: new Audio(soundImport2),
      sound2: new Audio(soundImport3),
      sound3: new Audio(soundImport4)
    };
  }
  //resetting function for all game arrays, then firing of new sequence
  freshStart(){
    if (this.running){
      clearInterval(this.intervalId);
    }
    this.playerMoves = [];
    this.movesArr = [];
    this.playerIsAt = 0;
    this.makeSequence(); 
  }

  //check if inputs pass
  doesPatternMatch(){ 
    //get a current index from array of player moves to compare with provided array moves 
    let currentStep = this.playerIsAt;
    //grab part from array to compare to
    let partOfArr = this.movesArr.slice(0,currentStep + 1);
    // console.log(currentStep,partOfArr.length);

    //check if input matches with fast array comparison via string conversion
    if ( this.playerMoves.toString() === partOfArr.toString() ){
      console.log('choices so far match given moves');
      //if current moves array matches then increase players position in array
      this.playerIsAt++;
      this.playerMoves = [];
      this.playMoves();
      //check for win
      if( currentStep+1 === this.movesArr.length ){
        alert('You Win!');
        // debugger
        this.won = true;
        this.freshStart();
      }
    }
    else{
      alert('listen and try again');
      // console.log('incorrect choice');
      //reset inputs
      this.playerMoves = [];
      //play moves again
      this.playMoves();
    }
  }

  //put choice into array
  pushMove(num){
    //play sound, fix lag
    if( num === 2 || num === 3){
      this.state['sound' + num].fastSeek(0.1);
      this.state['sound' + num].play();
    } else{
      this.state['sound' + num].fastSeek(0);
      this.state['sound' + num].play();
    }
    // debugger
    //push move into component array
    this.playerMoves.push(num);
    console.log(this.playerMoves);
    // check state if reached input
    if( this.playerMoves.length === this.playerIsAt+1 ){
      this.doesPatternMatch();
    }
    
  }

  makeSequence(){
    // generate array of 20 random moves, 4 for development
    for( var moves = 0 ; moves<7 ; moves++ )
      this.movesArr.push( Math.floor(Math.random() * 4) );
    console.log(this.movesArr);
    //play the moves to the player
    // debugger
    this.playMoves();
  }

  playMoves(){
    //set control variable
    // debugger
    this.running = true;
    let count = 0;
    let intervalId = setInterval( ()=> { 
      // debugger
      //play sound according to element value
      if     ( this.movesArr[count] === 0 ){ 
        this.state.sound0.play();
        //add class to change rendered style and remove it before next interval call is fired
        document.querySelector('.Btn1').className='gameBtn light1';
        setTimeout(()=>{ document.querySelector('.light1').className='gameBtn Btn1' }, 900);
      }
      else if( this.movesArr[count] === 1 ){ 
        this.state.sound1.play();
        document.querySelector('.Btn2').className='gameBtn light2';
        setTimeout(()=>{ document.querySelector('.light2').className='gameBtn Btn2' }, 900);
      }
      else if( this.movesArr[count] === 2 ){ 
        this.state.sound2.fastSeek(0.1);
        this.state.sound2.play();
        document.querySelector('.Btn3').className='gameBtn light3';
        setTimeout(()=>{ document.querySelector('.light3').className='gameBtn Btn3' }, 900);
      }
      else{ 
        this.state.sound3.fastSeek(0.1);
        this.state.sound3.play();
        document.querySelector('.Btn4').className='gameBtn light4';
        setTimeout(()=>{ document.querySelector('.light4').className='gameBtn Btn4' }, 900);
      }

      //check if played up to progress, to stop firing interval function
      if( count === this.playerIsAt ){
        //toggle control variable
        this.running = false;
        clearInterval(intervalId);
      }
      // if there are still steps to play, the increase index counter for next setInterval fire to use.
      count++;
    //fire every second
    }, 1000);
    //save the id to app state to kill the counter if needed.
    this.intervalId = intervalId;
  }

  render() {
    return (
      <div className="App">

        {/* play buttons */}
        <div className='row'>
          <button className='gameBtn Btn1'
            onClick={()=>{ if(!this.running) this.pushMove(0) }}
          ></button>
          <button className='gameBtn Btn2'
            onClick={()=>{ if(!this.running) this.pushMove(1) }}
          ></button>
        </div>
        <div className='row'>
          <button className='gameBtn Btn3'
            onClick={()=>{ if(!this.running) this.pushMove(2) }}
          ></button>
          <button className='gameBtn Btn4'
            onClick={()=>{ if(!this.running) this.pushMove(3) }}
          ></button>
        </div>

        {/* machine buttons */}
        <div className='row'>
          <button className='machineBtn'
            onClick={()=>{ this.freshStart() }}
          >re/start</button>
        </div>

      </div>
    );
  }
}

export default App;