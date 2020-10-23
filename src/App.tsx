import React, { useState } from 'react';
import { Difficulty, fetchQuestions, QuestionState } from './API';
import { QuestionCard } from './components/QuestionCard';
import {GlobalStyle,Wrapper} from './App.styles'

type AnswerObject = { // this is to create a new data type of object
  question: string; // question
  answer: string; // selected by user answer
  correct: boolean; // boolean to check answer true or false
  correctAnswer: string; // correct answer of that question
}

const TOTAL_QUESTIONS=5; // the questions we fetch

function App() {
  
  const [totalQuestions, settotalQuestions] = useState(TOTAL_QUESTIONS)
  const [loading, setloading] = useState(false)
  const [questions, setquestions] = useState<QuestionState[]>([])
  const [number, setnumber] = useState(0)
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([])
  const [score, setscore] = useState(0)
  const [gameOver, setgameOver] = useState(true)

  const startQuiz = async () => {
    settotalQuestions(TOTAL_QUESTIONS)
    setloading(true)
    setgameOver(false)
    setquestions(await fetchQuestions(totalQuestions, Difficulty.EASY)) // fetching the question 
    //and passing total questions and difficulty
    setscore(0)
    setuserAnswers([])
    setnumber(0)
    setloading(false)
    console.log("main ",await fetchQuestions(totalQuestions, Difficulty.EASY))

  }
  const nextQuestion = async () => {
    
    const nextQuestion = number+1;
    if(nextQuestion===totalQuestions){
      setgameOver(true)
    }else{
      setnumber(nextQuestion)
    }
   }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const res= e.currentTarget.value;
      const check = questions[number].correct_answer=== res;
      if(check){
        setscore(prev => prev + 1)
      }
      const AnswerObject={
        question:questions[number].question,
        answer:res, // which user select
        correct:check, // bool to check wither true or false
        correctAnswer:questions[number].correct_answer // correct answer
      }
      setuserAnswers(prev => [...prev,AnswerObject])
    }
   }

  

  return (
    <>
    <GlobalStyle />
    <Wrapper>
   
      <h1> Quiz App by Owys</h1>
      <div>&nbsp;</div>
      {
        gameOver || userAnswers.length === totalQuestions ? (<button className='start' onClick={startQuiz}>
          Start Quiz
        </button>) : null
      }


      {
        !gameOver ? (<p className='score'>
          Score : {score}  /  {totalQuestions}</p>) : null
      }
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      {
        loading ? (<p>Loading</p>) : null
      }
      {!loading && !gameOver ? (<QuestionCard
        questionNumber={number + 1}
        totalQuestions={totalQuestions}
        question={questions[number].question}
        answers={questions[number].answers} // that attribute which we added in API file using map
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      ></QuestionCard>) : null}
      {
        !gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? (<button className='next' onClick={nextQuestion}>
          Next Question
        </button>) : null
      }
    </Wrapper>
</>
  );
}

export default App;
