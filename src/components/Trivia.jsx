import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
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
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);
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
        correctAnswer();
        delay(1000, () => {
          if(data.success){
            setTimeOut(true);
          }
          else{
          setSelectedAnswer(null);
          correctAnswer();
          setQuestionNumber(data.questionNumber);
          setdata(data)
          }
        })
      }
      else{
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
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
