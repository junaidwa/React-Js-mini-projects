import React,{useState} from 'react';
import './App.css';
import { Children } from 'react';

function App() {
  return (
    <div >
   <TipCalculator />
    </div>
  );
}

function TipCalculator(){
  const [tip,setTip]=useState(' ')
  const [percentage1,setpercentage1]=useState(0)
  const [percentage2, setpercentage2]=useState(0)
  const totaltip = tip * percentage1 *percentage2 /2*100; 


  function handlereset(){
    setTip('');
    setpercentage1(0);
    setpercentage2(0)
  }

 
  return(
    <div>
      <Tipinput  bill={tip} onsettip={setTip}/>
      <Selectpercentage  percen={percentage1} onsetpercen={setpercentage1}>Select Own Feedback </Selectpercentage>
      <Selectpercentage  percen={percentage2} onsetpercen={setpercentage2}>Select Freiend Feedback </Selectpercentage>
      <Output  bill={tip} total={totaltip}  />
      <Button onreset={handlereset} />


    </div>
  )
}
function Tipinput({bill,onsettip}){
  return(
    <div>
      <label>How was your bill?</label>
      <input type='text' placeholder='Enter Bill' value={bill}  onChange={(e) => onsettip(Number(e.target.value))}/>

    </div>
  )
}
function Selectpercentage({children,percen,onsetpercen}){
  return (
    <div>
      <label>{children}</label>
      <select value={percen} onChange={(e) => onsetpercen(Number(e.target.value))}>
        <option value='0'>Dissatisfied (0%)</option>
        <option value='5'>Noraml (5%)</option>
        <option value='10'>It was Oky (10%)</option>
        <option value='15'>It was Good (15%)</option>
        <option value='20'>Absolutely Amazing (20%)</option>
      </select>

    </div>
  )
}
function Output({bill,total}){
  return (
  
 <h3>
  Toal pay {bill}( {total} + B)
 </h3>
   
  )
}
function Button({onreset}){
  return (
    <div>
      <button  onClick={onreset}>Reset</button>

    </div>
  )
}

export default App;
