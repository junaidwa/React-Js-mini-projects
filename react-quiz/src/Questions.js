import Progress from "./Progress";
function Questions({ question, dispatch, answer, points,questionsLength,index,maxPoints}) {
  // console.log(question);
  let hasAnswer = answer!==null;
  return (
    <div>
 <Progress points={points}  question={question} questionsLength={questionsLength} index={index} maxPoints={maxPoints} answer={answer} />

      <h4>{question.question}</h4>
  
      <div className="option">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer?  index === question.correctOption ? "correct" : "wrong"
             : ""} `}
            key={option}
            disabled={answer!==null}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
export default Questions;
