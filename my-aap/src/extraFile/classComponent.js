import React, { Component } from "react"; // Import the React library and the Component class from the 'react' package

// Define the Timer class, which extends the React Component class
class Timer extends Component {
  // Constructor method to initialize the state and bind the timer ID
  constructor(props) {
    super(props); // Call the parent class's constructor with the props parameter
    this.state = {
      timer: 0, // Initialize the timer value in the state to 0
      isRunning: false, // Initialize the isRunning flag in the state to false
    };
    this.timerID = null; // Initialize the timerID to null
  }

  // Method to start the timer
  startTimer = () => {
    if (!this.state.isRunning) {
      // Check if the timer is not already running
      this.setState({ isRunning: true }); // Set the isRunning state to true
      this.timerID = setInterval(() => {
        // Start a new interval timer
        this.setState((prevState) => ({
          timer: prevState.timer + 1, // Increment the timer value in the state by 1 every second
        }));
      }, 1000); // Set the interval to 1000 milliseconds (1 second)
    }
  };

  // Method to stop the timer
  stopTimer = () => {
    if (this.state.isRunning) {
      // Check if the timer is running
      this.setState({ isRunning: false }); // Set the isRunning state to false
      clearInterval(this.timerID); // Clear the interval timer
    }
  };

  // Lifecycle method to clear the interval timer when the component is unmounted
  componentWillUnmount() {
    clearInterval(this.timerID); // Clear the interval timer
  }

  // Render method to display the component
  render() {
    return (
      <div className="timer-div">
        {" "}
        {/* Container div with a class name for styling */}
        <h1 className="text-red-400">Timer: {this.state.timer}</h1>{" "}
        {/* Display the current timer value */}
        <button onClick={this.startTimer}>Start Timer</button>{" "}
        {/* Button to start the timer */}
        <button onClick={this.stopTimer}>Stop Timer</button>{" "}
        {/* Button to stop the timer */}
      </div>
    );
  }
}

export default Timer; // Export the Timer component as the default export
