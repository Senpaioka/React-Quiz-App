function Progress({index, questionCount, points, maxPoint, answer}) {

    return (
        <header className="progress">
            <progress max={questionCount} value={index + Number(answer !== null)}></progress>
            <p>Question <strong>{index + 1}</strong>/{questionCount}</p>
            <p><strong>{points}</strong>/{maxPoint}</p>
        </header>
    )
}

export default Progress;