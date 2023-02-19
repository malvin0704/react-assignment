import "./styles.css";
import React, { Component } from "react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      timer: null,
      display: "none"
    };
  }
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  handleIncIfOdd = () => {
    this.state.count % 2 === 1 &&
      this.setState({ count: this.state.count + 1 });
  };
  handleAsyncIncrement = () => {
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };
  timerStart = () => {
    this.state.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
    let startBtn = document.querySelector("#timer-start");
    let stopBtn = document.querySelector("#timer-stop");
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
  };
  timerStop = () => {
    clearInterval(this.state.timer);
    let startBtn = document.querySelector("#timer-start");
    let stopBtn = document.querySelector("#timer-stop");
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
  };

  render() {
    return (
      <div className="App">
        <p>The count is {this.state.count}</p>
        <button className="btn" onClick={this.handleIncrement}>
          Increment
        </button>
        <button className="btn" onClick={this.handleDecrement}>
          Decrement
        </button>
        <div>
          <button className="btn" onClick={this.handleIncIfOdd}>
            Increment-If-Odd
          </button>
          <button className="btn" onClick={this.handleAsyncIncrement}>
            Async-Increment
          </button>
        </div>
        <div>
          <button
            id="timer-start"
            className="timer-btn"
            onClick={this.timerStart}
          >
            Start
          </button>
          <button
            id="timer-stop"
            className="timer-btn"
            onClick={this.timerStop}
          >
            Stop
          </button>
        </div>
      </div>
    );
  }
}
