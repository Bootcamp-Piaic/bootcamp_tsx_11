import { shuffleArray } from "./utilities";

export const fetchQuestions = async (totalquestions: number, difficulty: Difficulty) => {

    const url=`https://opentdb.com/api.php?amount=${totalquestions}&difficulty=${difficulty}&type=multiple`
    const data=await (await fetch(url)).json();
    console.log("data is =",data)
    return data.results.map((question:Question)=>( // mapping to all results 
        {
            ...question, // dont touch to questions
            // but adding a NEW object of type 'answers' below with all answers
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer])
        }
        
    ))
}
export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}
export type Question={
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    type:string
}
export type QuestionState= Question & {answers :string[]}