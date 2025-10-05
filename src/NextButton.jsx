function NextButton({dispatch, answer, index, questionCount}) {

    if (answer === null) return null;

    if(index < questionCount - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'nextQuestion'})}>
            Next
        </button>
    )


    if(index === questionCount - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: 'finished'})}>
            Finish
        </button>
    )
}

export default NextButton;