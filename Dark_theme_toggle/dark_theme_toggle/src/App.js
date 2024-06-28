import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import moon from './asset/moon.png';
import sun from './asset/contrast.png';

function App() {
  const [imge, setimge] = useState(moon); // Initialize with moon image

  function Toggleimg() {
    setimge((previmg) => {
      const newImg = previmg === moon ? sun : moon;
      document.getElementsByTagName("body")[0].style.backgroundColor = newImg === moon ? "yellow" : "red";
      return newImg;
    });
  }

  return (
    <div className="App">
      <div className='images'>
        <img src={imge} alt='Image_icon' onClick={Toggleimg} />
      </div>
    </div>
  );
}

export default App;
