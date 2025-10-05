import { useEffect } from "react";

function Timer({dispatch, timer}) {

    const mins = Math.floor(timer/60);
    const secs = timer % 60;

    useEffect(function(){
        const timerId = setInterval(() => {
            dispatch({type: 'tick'})
        },1000)

        return () => clearInterval(timerId)
    },[dispatch])

    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}:{secs < 10 && '0'}{secs}
        </div>
    )
}

export default Timer;