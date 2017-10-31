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
    this.running = false;
    //set the state
    this.state = {
      sound1: new Audio(soundImport1),
      sound2: new Audio(soundImport2),
      sound3: new Audio(soundImport3),
      sound4: new Audio(soundImport4),
      intervalId:undefined
    };
    // this.listenUp(); //keypress implementation for future
  }

  //keypress implementation for future
  // listenUp() {
  //   //handle key presses
  //   document.addEventListener("keydown", (evt)=>{
  //     if (evt.key === 'q'){
  //       this.state.sound1.play();
  //     }
  //     else if (evt.key === 'o'){
  //       this.state.sound2.play();
  //     }
  //     else if (evt.key === 's'){
  //       this.state.sound3.play();
  //     }
  //     else if (evt.key === 'k'){
  //       this.state.sound4.play();
  //     }
  //   });
  // }

  

  playSequence(){
    this.running = true;
    // generate array of random moves
    let movesArr = [];
    for( var moves = 0 ; moves<5 ; moves++ ){
      let value = Math.floor(Math.random() * 4);
      movesArr.push(value);
    }
    console.log(movesArr);
    let count = 0;
    let intervalId = setInterval( ()=> { 
      console.log(movesArr[count]);
      //play sound according to element value
      if     ( movesArr[count] === 0 ){ 
        this.state.sound1.play();
        //add class to change rendered style and remove it before next interval call is fired
        document.querySelector('.Btn1').className='gameBtn light1';
        setTimeout(()=>{ document.querySelector('.light1').className='gameBtn Btn1' }, 900);
      }
      else if( movesArr[count] === 1 ){ 
        this.state.sound2.play();
        document.querySelector('.Btn2').className='gameBtn light2';
        setTimeout(()=>{ document.querySelector('.light2').className='gameBtn Btn2' }, 900);
      }
      else if( movesArr[count] === 2 ){ 
        this.state.sound3.fastSeek(0.1);
        this.state.sound3.play();
        document.querySelector('.Btn3').className='gameBtn light3';
        setTimeout(()=>{ document.querySelector('.light3').className='gameBtn Btn3' }, 900);
      }
      else{ 
        this.state.sound4.play();
        document.querySelector('.Btn4').className='gameBtn light4';
        setTimeout(()=>{ document.querySelector('.light4').className='gameBtn Btn4' }, 900);
      }
      
      // increase index counter, stop interval if passing last element
      count++;
      if( count === movesArr.length ){
        clearInterval(intervalId);
      }
    //fire every second
    }, 1000);
    //save the id to app state to kill the counter if needed.
    this.setState({intervalId: intervalId});

  }

  render() {
    return (
      <div className="App">

        {/* play buttons */}
        <div className='row'>
          <button className='gameBtn Btn1'
            onMouseDown={()=>{ 
              this.state.sound1.fastSeek(0);
              this.state.sound1.play();
            }}
          >Q</button>
          <button className='gameBtn Btn2'
            onMouseDown={()=>{ 
              this.state.sound2.fastSeek(0);
              this.state.sound2.play();
            }}
          >O</button>
        </div>
        <div className='row'>
          <button className='gameBtn Btn3'
            onMouseDown={()=>{ 
              this.state.sound3.fastSeek(0.1);
              this.state.sound3.play();
            }}
          >S</button>
          <button className='gameBtn Btn4'
            onMouseDown={()=>{ 
              this.state.sound4.fastSeek(0.1);
              this.state.sound4.play();
            }}
          >K</button>
        </div>
        {/* machine buttons */}
        <div className='row'>
          <button className='machineBtn'
            onClick={()=>{ 
              if (this.running){
                clearInterval(this.state.intervalId);
              }
              this.playSequence(); 
              }}
          >re/start</button>
        </div>

      </div>
    );
  }
}

export default App;
