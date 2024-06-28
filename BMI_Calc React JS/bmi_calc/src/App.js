import React, { useState } from "react";
import "./App.css";
import images1 from "./asset/healthy.png";
import images2 from "./asset/overweight.png";
import images3 from "./asset/underweight.png";

function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');
  const [isrc, setIsrc] = useState('');

  function reload() {
    window.location.reload();
  }

  function calcBmi(e) {
    e.preventDefault();
    if (weight === 0 || height === 0) {
      alert("Please fill both input fields");
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      if (bmi < 18.5) {
        setMessage("You are underweight");
        setIsrc(images3);
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setMessage("You have a healthy weight");
        setIsrc(images1);
      } else if (bmi >= 25 && bmi < 29.9) {
        setMessage("You are overweight");
        setIsrc(images2);
      } else {
        setMessage("You are obese");
        setIsrc(images2);
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={calcBmi}>
          <div className="center">
            <h3>BMI Calculator</h3>
          </div>
          <div className="inputs">
            <label>Weight</label>
            <input
              type="text"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            ></input>
          </div>
          <div className="inputs">
            <label>Height</label>
            <input
              type="text"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            ></input>
          </div>
          <div className="submit-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={reload}>Reload</button>
          </div>
          <div className="center">
            <h3>Your BMI is {bmi}</h3>
            <p>{message}</p>
          </div>
          <div className="image-container">
            {isrc && <img src={isrc} alt="BMI category" />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
