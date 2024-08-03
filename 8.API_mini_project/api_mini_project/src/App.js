import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState("");
  const [message, setMessage] = useState(0);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  async function fetchInitialData() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setData(data.slip.advice);
  }

  async function getData() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setData(data.slip.advice);
    setMessage((c) => c + 1);
    setIsButtonClicked(true);
  }

  useEffect(() => {
    fetchInitialData(); // Fetch initial advice
  }, []);

  return (
    <div className="App">
      <h1>{data}</h1>
      <button onClick={getData}>Click me</button>
      {isButtonClicked && <p>You have read {message} number of advice</p>}
    </div>
  );
}

export default App;

