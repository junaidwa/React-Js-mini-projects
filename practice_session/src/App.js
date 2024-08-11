import { useState } from "react";
import "./App.css";

function App() {
  const content = [
    {
      title: "First title",
      summary:
        "This is my first summary of my first title and also made some functionaliy in this project.No .1 is we add hide and show details of this summary when we click on button and also we like and dislike this tiltle and summmay by react on heart icon and also give one and also three heart icon "
    },
    {
      title: "Second title",
      summary:
        "This is my second summary of my second title and also made some functionaliy in this project.No .1 is we add hide and show details of this summary when we click on button and also we like and dislike this tiltle and summmay by react on heart icon and also give one and also three heart icon "
    },
    {
      title: "Third title",
      summary:
        "This is my third summary of my third title and also made some functionaliy in this project.No .1 is we add hide and show details of this summary when we click on button and also we like and dislike this tiltle and summmay by react on heart icon and also give one and also three heart icon "
    },
    {
      title: "Fourth title",
      summary:
        "This is my fourth summary of my fourth title and also made some functionaliy in this project.No .1 is we add hide and show details of this summary when we click on button and also we like and dislike this tiltle and summmay by react on heart icon and also give one and also three heart icon "
    }
  ];
  const [tabupdate, settabupdate] = useState(0);
  const [numhearts,setnumhearts]= useState(0)
  return (
    <div className="main">
      <div className="tabs">
        <button className="tab tab1" onClick={() => settabupdate(0)}>
          Tab 1
        </button>
        <button className="tab tab2" onClick={() => settabupdate(1)}>
          Tab 2
        </button>
        <button className="tab tab3" onClick={() => settabupdate(2)}>
          Tab 3
        </button>
        <button className="tab tab4" onClick={() => settabupdate(3)}>
          Tab 4
        </button>
      </div>
      <div className="contentbox">
        <div className="firstcontentbox">
          <h1 className="heading">{content[tabupdate].title}</h1>
          <br></br>
          <br></br>
          <p className="paragraph">{content[tabupdate].summary}</p>

          <div className="middlecontent">
            <button>Hide Details</button>

            <div className="heart">
              <span className="heart">💓</span>
            <br></br>
              <button className="one" onClick={()=> setnumhearts(numhearts +1)}>+</button>
              <br></br>
              <button className="three" onClick={()=> setnumhearts(numhearts+ 3)}>+++</button> 
              <br></br>
              <span className="Numberhearts">{numhearts}</span>
              <br></br>
            </div>
          </div>
          <div className="last">
            <button className="simpleundo">Undo</button>
            <button className="undodouble">Undo in 2s</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
