import React, { useState } from "react";
import "./App.css";

const message = [
  {
    title: "Where are your and what is the name of your father ?",
    text: "I am Muhammad Junaid from Miawali muabat mustafa sy phly asdfasdfasfasdfasfasfasfasfasdfasdf mein kuch ni tha kuch ni kram ki is infa sy phly mein kuch ni tha kuch ni tha"
  },
  {
    title: "Where are your and what is your name and what is your father name ?",
    text: "I am Muhammad Junaid from Miawali muabatasdfasfasdfasdfasfasfasf mustafa sy phly mein kuch ni tha kuch ni kram ki is infa sy phly mein kuch ni tha kuch ni tha"
  },
  {
    title: "Where are your. Please give the univeristy name where your are studying ?",
    text: "I am Muhammad Junaid from Miawali muabat mustafa sy phly mein kuchasd;klfjas;dfljkas;fldkjs;lfadkj;asfdjlk ni tha kuch ni kram ki is infa sy phly mein kuch ni tha kuch ni tha"
  }
];

function App() {
  return (
    <div className="App">
      <Accordian data={message} />
    </div>
  );
}
function Accordian({ data }) {
  return (
    <div className="accordian">
      {data.map((el, i) => (
        <AccordianItem title={el.title} text={el.text} key={el.title} num={i} />
      ))}
    </div>
  );
}
function AccordianItem({ num, title, text }) {
  const [isopen ,setisopen] =useState(false);
  function openbox(){
    setisopen((isopen)=> !isopen);
  }
  return (
    <div className="item {iso}" onClick={openbox}>
      <div className="header">
        <p className="number">{num < 9? `0${num+1}` : `${num+1}`}</p>
        <p className="title">{title}</p>
        <p className="icon">{isopen ? '-' : '+ '}</p>
      </div>
      {
        isopen &&
      <div className="content-box" >{text} </div>
      }

    </div>
  );
}

export default App;
