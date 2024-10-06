function FinshQuestion({maxPoints,points,highScore,dispatch}){
    const Percentage = (points /maxPoints )*100;
    return(
        <div>
            <p className="result">
               You Scored <strong>{points}</strong> out of {maxPoints} ({`${Math.ceil(Percentage)}%`})
               {/* Now we want to Print HighScore here */}
            </p>
            <p className="highscore">(HighScore : {highScore})</p>
            <button
        className=" btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz
      </button>

        </div>
    )
}
export default FinshQuestion;