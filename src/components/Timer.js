import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber,selectedAnswer,changequestion}) {
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      if(!selectedAnswer){
        setTimer((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut,selectedAnswer]);

  useEffect(() => {
    setTimer(45);
  }, [questionNumber,changequestion]);
  return timer;
}
