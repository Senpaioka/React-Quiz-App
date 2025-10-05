function StartPage({questionCount, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{questionCount} Question to  test your React knowledge</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: "start"})}>Let's Start</button>
        </div>
    )
}


export default StartPage;