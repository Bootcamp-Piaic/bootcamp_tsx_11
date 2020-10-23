import React, { useState } from 'react';
import { unescapeLeadingUnderscores } from 'typescript';
import { Difficulty, fetchQuestions, QuestionState } from './API';
import { QuestionCard } from './components/QuestionCard';
import {GlobalStyle,Wrapper} from './App.styles'

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
function App() {


  const [totalQuestions, settotalQuestions] = useState(5)
  const [loading, setloading] = useState(false)
  const [questions, setquestions] = useState<QuestionState[]>([])
  const [number, setnumber] = useState(0)
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([])
  const [score, setscore] = useState(0)
  const [gameOver, setgameOver] = useState(true)

  const startQuiz = async () => {
    setloading(true)
    setgameOver(false)
    setquestions(await fetchQuestions(totalQuestions, Difficulty.EASY))
    setscore(0)
    setuserAnswers([])
    setnumber(0)
    setloading(false)

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
        answer:res,
        correct:check,
        correctAnswer:questions[number].correct_answer
      }
      setuserAnswers(prev => [...prev,AnswerObject])
    }
   }

  console.log(fetchQuestions(totalQuestions, Difficulty.EASY))

  return (
    <>
    <GlobalStyle />
    <Wrapper>
   
      <h1> Quiz App by Owys</h1>
      {
        gameOver || userAnswers.length === totalQuestions ? (<button className='start' onClick={startQuiz}>
          Start Quiz
        </button>) : null
      }


      {
        !gameOver ? (<p className='score'>
          score : {score}</p>) : null
      }
      {
        loading ? (<p>Loading</p>) : null
      }
      {!loading && !gameOver ? (<QuestionCard
        questionNumber={number + 1}
        totalQuestions={totalQuestions}
        question={questions[number].question}
        answers={questions[number].answers}
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
