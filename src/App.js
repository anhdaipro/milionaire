import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { addquestionURL } from "./urls";
import { headers } from "./actions/auth";
import axios from "axios"
import { formatter } from "./constants";
function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState(0);
  const [question,setQuestion]=useState({})
  const [success,setSucces]=useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: 100},
        { id: 2, amount: 200 },
        { id: 3, amount: 300},
        { id: 4, amount: 400 },
        { id: 5, amount: 500 },
        { id: 6, amount: 600 },
        { id: 7, amount: 700 },
        { id: 8, amount: 800 },
        { id: 9, amount: 900 },
        { id: 10, amount:1000 },
        { id: 11, amount: 1100 },
        { id: 12, amount: 1200 },
        { id: 13, amount: 1300 },
        { id: 14, amount: 1400 },
        { id: 15, amount: 1500 },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  const playagain = async () => {
    const res= await axios.post(addquestionURL,JSON.stringify(),headers)
    setTimeOut(null)
    setEarned(0)
    setSucces(false)
    setQuestionNumber(1)
    setQuestion(res.data)
  };
  const setdata=(data)=>{
    setQuestion(prev=>{return{...prev,...data}})
  }
  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} setQuestionNumber={data=>setQuestionNumber(data)} setdata={data=>setdata(data)} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <div>
              <h1 className="endText">You earned: ${earned}</h1>
              {success && (<div>Chúc mừng bạn đã chiến thắng trò chơi</div>)}
              <button onClick={playagain} className="playaginButton">Chơi lại</button>
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      selectedAnswer={selectedAnswer}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    question={question}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                    setSucess={data=>setSucces(data)}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={data=>setSelectedAnswer(data)}
                    setdata={data=>setdata(data)}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">${formatter.format(m.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
