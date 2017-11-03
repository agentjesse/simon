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
    this.btnLock = true; // block before starting game
    this.running = false;//controls if inputs will be accepted during playing of pattern
    this.difficultySteps = 20;
    this.strict = false; //control strict mode
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
    // debugger //adding this debugger allows time for the promise to fulfill. figure out how to replicate this wait period, maybe try throttling call to here.
    //check if current player moves match up with provided
    if( this.playerMoves.toString() === this.movesArr.slice(0,this.playerMoves.length).toString() ){
      console.log('choices so far match given moves');
      //same amount of matching steps as difficulty? win!! and restart
      if( this.playerMoves.length === this.difficultySteps ){
        alert('You Win!');
        this.freshStart();
      } 
      //if current player moves are greater than the greatest progression into the pattern, reset moves and play incremented pattern
      else if( this.playerMoves.length > this.playerIsAt ){
        this.playerMoves = [];
        this.playerIsAt++;
        this.playMoves();
      }
      //if current moves do not yet reach the max progression(playerIsAt),wait for more input from next button choice. At the end of this function a return will happen automatically, no need to specify to return.
    }
    //mismatching input? handle strict or regular repeat try
    else{
      if(this.strict){
        alert('mismatch on strict, new pattern starting...');
        //reset everything
        this.freshStart();
      }
      else{
        alert('listen again');
         //reset inputs
         this.playerMoves = [];
         //replay moves
         this.playMoves();
       }
    }
  }

  //put choice into array
  pushMove(num){
    //play sound, fix lag
    if( num === 2 || num === 3){
      // this.state['sound' + num].fastSeek(0.1);
      this.state['sound' + num].play();
    } else{
      // this.state['sound' + num].fastSeek(0);
      this.state['sound' + num].play();
    }
    //machine not initialized yet? stop
    if( this.btnLock )
      return;
    //push move into component array
    this.playerMoves.push(num);
    console.log(this.playerMoves);
    //call checking function, throttle calling it right away to let promise from asynchronous play() resolve.
    setTimeout(()=>{ this.doesPatternMatch() },200);
  }

  makeSequence(){
    // generate array of random moves
    for( var moves = 0 ; moves<this.difficultySteps ; moves++ )
      this.movesArr.push( Math.floor(Math.random() * 4) );
    console.log(this.movesArr);
    //play the moves to the player
    this.playMoves();
  }

  playMoves(){
    //re render for counter
    this.forceUpdate();
    //set control variable
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
        // this.state.sound2.fastSeek(0.1);
        this.state.sound2.play();
        document.querySelector('.Btn3').className='gameBtn light3';
        setTimeout(()=>{ document.querySelector('.light3').className='gameBtn Btn3' }, 900);
      }
      else{ 
        // this.state.sound3.fastSeek(0.1);
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

        <div className='row'>
          <div className='holder'>
            {/* play buttons */}
            <div className='row first'>
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
                onClick={()=>{
                  this.btnLock = false;
                  this.freshStart();
                }}
              >start<br/>/<br/>restart</button>
              <button className='machineBtn strict'
                onClick={()=>{ 
                  this.strict = !this.strict;
                  this.btnLock = false;
                  this.freshStart();
                  if(this.strict){
                    document.querySelector('.strict').className='machineBtn strict strictLight';
                  } else{
                    document.querySelector('.strict').className='machineBtn strict';
                  }
                }}
              >strict<br/>mode</button>
              <span className='counter'>steps<br/>{this.playerIsAt+1}</span>
            </div>

          </div>
        </div>

        

      </div>
    );
  }
}

export default App;