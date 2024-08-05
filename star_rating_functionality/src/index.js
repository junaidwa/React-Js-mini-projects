import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


import reportWebVitals from './reportWebVitals';
import StarRating from './StarRating';

function Test(){
  const [exterrating,setexterrating]= useState(0);

  return (
    <div>
      <StarRating color='red' maxrating={9} size={23} Onsetexternalratting={setexterrating}/>
      <h1>The {exterrating} reviews of this moviie</h1>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <StarRating  maxrating={5} message={['Good','Baad','Ugly','Terrible','Amazing']} />
    <StarRating  maxrating={17} color='red' />
    <Test />
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
