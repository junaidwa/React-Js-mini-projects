
import { useEffect } from "react";

function Timer({dispatch,SecondRemaining}){
    const mins = Math.floor(SecondRemaining /60);
    const seconds = SecondRemaining %60;
    useEffect(function(){
      let id =  setInterval(function(){
            dispatch({type:"Tick"})

        },1000)
        return ()=>clearInterval(id);  //clean up functioni //last video of this section 
    },[dispatch])
    return(
        <div className="timer">{mins <10 && "0"}{mins}:{seconds <10 && "10"}{seconds}</div>
    )
}
export default Timer;