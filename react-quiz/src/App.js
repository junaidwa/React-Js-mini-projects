import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import "./App.css";
import Questions from "./Questions";
import NextButton from "./NextButton";
import FinshQuestion from "./FinishQuestion";
// import Footer from './Footer';
import Timer from './Timer';
// import Progress from "./Progress";  //This file is used in inside the question.
import { useEffect, useReducer } from "react";
const intialstate = {
  questions: [],
  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  SecondRemaining:null
};
const SEC_PR_MIN =30;

function reducer(state, action) {
  switch (action.type) {
    case "DataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "DataFailed":
      return {
        ...state,
        status: "error"
      };
    case "start":
      return {
        ...state,
        status: "active",
        SecondRemaining: state.questions.length * SEC_PR_MIN
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null //There will be answer show before clicking on anyone option button.
      };
    case "newAnswer":
      const nextQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        status: "active",
        points:
          action.payload === nextQuestion.correctOption
            ? state.points + nextQuestion.points
            : state.points
      };
    case "finish":
      return {
        ...state,
        status: "Finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore
      };

    case "Restart":
      return {
        ...intialstate,
        questions: state.questions,
        status: "ready"
      };
      case "Tick":
        return {
          ...state,
          SecondRemaining:state.SecondRemaining-1,
          status: state.SecondRemaining === 0 ? "Finished" :state.status
        
        }
    default:
      throw new Error("Unknow Action");
  }
}
function App() {
  const [{ questions, status, index, answer, points, highScore ,SecondRemaining}, dispatch] =
    useReducer(reducer, intialstate);
  // const {questions, status, index, answer,points}= state;
  const questionsLength = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DataReceived", payload: data }))
      .catch(() => dispatch({ type: "DataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsLength={questionsLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            {/* <Progress points={points} questionsLength={questionsLength} index={index} maxPoints={maxPoints} answer={answer} /> */}
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
              questionsLength={questionsLength}
              index={index}
              maxPoints={maxPoints}
            />
            {/* <Footer> */}
              < Timer dispatch={dispatch} SecondRemaining={SecondRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              questionsLength={questionsLength}
              index={index}
            />
            {/* </Footer> */}
          </>
        )}
        {status === "Finished" && (
          <FinshQuestion
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
