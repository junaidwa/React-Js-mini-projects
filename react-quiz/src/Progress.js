function Progress({points,questionsLength,index,maxPoints,answer,question}){
    return(
        <header className="progress">
  <progress  max={maxPoints} value={ index === question.correctOption ? points+question.points  : points  }   />
        <p><strong>{index}</strong>/{questionsLength}</p>
        <p><strong>{points}</strong>/{maxPoints}</p>
        </header>
    )
}
export default Progress;