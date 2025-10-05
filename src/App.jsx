import { useEffect, useReducer } from "react";
import DateCounter from "./components/DateCounter";
import Header from "./Header";
import Question from "./Question";
import Loader from './Loader';
import Error from './Error';
import StartPage from './StartPage';
import Task from './Task';
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedPage from "./FinishedPage";
import Timer from './Timer';



const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconds: null
}

function reducer(state, action){
  switch(action.type){
    case 'dataReceived': 
    return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: "error"}
    case 'start':
      return {...state, status: 'active', seconds: state.questions.length * 30}
    case 'newAnswer': {
      const question = state.questions.at(state.index);
      return {...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points}
    }
    case 'nextQuestion':
      return {...state, index: state.index + 1, answer: null}
    case 'finished':
      return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore}
    case 'reset':
      return {...initialState, questions: state.questions, status: 'ready'}
    case 'tick':
      return {...state, seconds: state.seconds - 1, status: state.seconds === 0 ? 'finished' : state.status}

      default: throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index, answer, points, highscore, seconds} = state

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(function() {
    fetch('question.json').then(response => response.json())
    .then(data => dispatch({type: 'dataReceived', payload: data.questions}))
    .catch(err => dispatch({type: 'dataFailed', payload: err}))
  }, []);

  return(
    <>
      <DateCounter></DateCounter>

      <div className="app">
        <Header></Header>
        
        <Question>
          { status === 'loading' && <Loader></Loader> }
          { status === 'error' && <Error></Error> }
          { status === 'ready' && <StartPage questionCount={numOfQuestions} dispatch={dispatch}></StartPage> }
          { status === 'active' && (
            <>
            <Progress index={index} questionCount={numOfQuestions} points={points} maxPoint={totalPoints} answer={answer}></Progress>
            <Task question={questions[index]} dispatch={dispatch} answer={answer}></Task> 
            <footer>
            <Timer dispatch={dispatch} timer={seconds}></Timer>
            <NextButton dispatch={dispatch} answer={answer} index={index} questionCount={numOfQuestions}></NextButton>
            </footer>
            </>
          )}

          { status === 'finished' && <FinishedPage points={points} maxPoint={totalPoints} highscore={highscore} dispatch={dispatch}></FinishedPage>}
        </Question>
      </div>
    </>
  )
}

export default App;