import { useEffect, useState } from "react";

import axios from "axios"
import { answerURL } from "../urls";
import { headers } from "../actions/auth";
export default function Trivia({
  question,
  setTimeOut,
  setdata,
  setQuestionNumber,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
 
 

 


  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = async (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    const form={question_id:question.question.id,questionuserid:question.questionuserid,answer:a}
    const res=await axios.post(`${answerURL}/${question.id}`,JSON.stringify(form),headers)
    const  data=res.data
    
      if(data.correct){
        setClassName("answer correct");
        
      }
      else{
        
        setClassName("answer wrong")
      }
    
    delay(2000, () => {
      if(data.correct){
      setSelectedAnswer(null);
      setQuestionNumber(data.questionNumber);
      setdata(data)
      }
      else{
        setTimeOut(true);
      }
    })
    
    console.log(data)
    
  };
  return (
    <div className="trivia">
      <div className="question">{question.question?.question}</div>
      <div className="answers">
        {question.question?.choice.map((a) => (
          <div key={a}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(a)}
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
