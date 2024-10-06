function StartScreen({questionsLength,dispatch}){
    return(
        <div className="start">
            <h2>Welcome! to React Quiz</h2>
            <h3>{questionsLength} questions to test your mastery</h3>
            <button className="btn btn-ui" onClick={()=> dispatch({type:"start"})}>Start Quiz</button>
        </div>
    )
}
export default StartScreen ;