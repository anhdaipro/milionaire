import { useEffect, useState } from "react";

export default function Timer({ setTimeOut, questionNumber }) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, setTimeOut]);

  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);
  return timer;
}
