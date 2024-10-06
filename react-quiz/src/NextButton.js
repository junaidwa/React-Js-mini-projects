function NextButton({ dispatch, answer,index,questionsLength }) {
  if (answer === null) return null;

  if( index <questionsLength-1){

      return (
      <button
        className=" btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  } 
  if( index === questionsLength-1){

      return (
      <button
        className=" btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  } 
}
export default NextButton;
