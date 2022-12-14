import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import { addquestionURL,supportquestionURL } from "./urls";
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
  const [fifty,setFifty]=useState(false)
  const [changequestion,setChangequestion]=useState(false)
  const [choicehiden,setChoicehiden]=useState([])
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
    setSelectedAnswer(null);
    setSucces(false)
    setFifty(false)
    setChangequestion(false)
    setQuestionNumber(1)
    setQuestion(res.data)
  };
  const setdata=(data)=>{
    setQuestion(prev=>{return{...prev,...data}})
  }
  const setsuport= async (e,support_type)=>{
    const form={question_id:question.question.id,questionuserid:question.questionuserid,support_type:support_type}
    const res = await  axios.post(`${supportquestionURL}/${question.id}`,JSON.stringify(form),headers)
    if(support_type=='1'){
      setFifty(true)
      setChoicehiden(res.data.choice_hiden)
    }
    else{
      setChangequestion(true)
      setdata(res.data)
    }
  }
  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} setQuestionNumber={data=>setQuestionNumber(data)} setdata={data=>setdata(data)} />
      ) : (
        <>
          <div className="main">
            <div className="support-question">
              <button className="btn-support" disabled={fifty} onClick={(e)=>{if(!fifty){setsuport(e,'1')}}}>
                <svg width="24px" height="24px"  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M4530.1,5007.9C3375.4,4889,2341.7,4400,1530.4,3588.6C751.6,2809.9,287.5,1860.5,124.4,723.1c-32.6-226.3-32.6-982,0-1208.3c163-1137.4,629.1-2086.8,1405.9-2865.5c776.8-776.8,1730-1244.8,2865.5-1405.9c226.3-32.6,982-32.6,1208.3,0c939.8,134.3,1779.9,491,2474.2,1053c987.8,797.9,1611.1,1916.1,1797.2,3218.4c32.6,226.3,32.6,982,0,1208.3c-161.1,1135.5-629.1,2088.7-1405.9,2865.5c-759.5,759.5-1687.8,1223.7-2779.2,1392.5C5448.8,5017.5,4775.6,5034.8,4530.1,5007.9z M5642.5,4676.1C6638,4528.5,7552.8,4070,8252.9,3368.1c725-728.8,1170-1636,1313.8-2673.7c15.4-101.7,26.9-354.8,26.9-575.4c0-414.3-21.1-613.8-97.8-978.2c-107.4-506.4-368.3-1122-656-1553.6c-749.9-1123.9-1912.2-1849-3264.4-2035c-235.9-34.5-914.9-34.5-1150.8,0c-725,99.7-1390.5,349.1-1975.5,740.4C1344.3-2969,619.3-1800.9,431.3-456.4c-32.6,237.8-32.6,934.1,1.9,1160.4c220.6,1509.5,1076,2752.3,2380.2,3462c558.1,303,1083.7,458.4,1841.3,544.7C4794.8,4726,5458.4,4703,5642.5,4676.1z"/><path d="M4604.9,1900.8c-113.2-26.9-274.3-130.4-345.2-222.5c-76.7-101.7-136.2-255.1-163-427.7c-11.5-84.4-17.3-433.5-13.4-962.8c5.8-809.4,7.7-834.3,49.9-955.2c124.7-351,381.7-519.8,755.7-492.9c328,21.1,544.7,205.2,640.6,542.8c28.8,95.9,34.5,230.2,42.2,897.6c7.7,828.6-3.8,1024.2-74.8,1212.2c-76.7,205.2-222.5,343.3-422,398.9C4959.7,1923.8,4731.5,1927.6,4604.9,1900.8z M4954,1547.9c47.9-19.2,76.7-49.9,103.6-109.3c36.5-78.6,38.4-132.3,38.4-1056.8c0-1039.6,0-1051.1-95.9-1135.4c-32.6-30.7-69-38.4-172.6-38.4c-103.6,0-140,7.7-172.6,38.4c-95.9,84.4-95.9,95.9-95.9,1135.4c0,924.5,1.9,978.2,38.4,1056.8C4654.8,1565.1,4802.4,1611.2,4954,1547.9z"/><path d="M2353.2,1125.9V349.1h163h161.1l86.3,84.4c97.8,97.8,186.1,124.7,301.1,90.2c57.5-17.3,84.4-40.3,118.9-103.6c40.3-76.7,42.2-99.7,42.2-540.9c0-433.5-1.9-466.1-42.2-552.4c-63.3-136.2-193.7-182.2-343.3-118.9c-105.5,44.1-141.9,143.8-141.9,408.5v214.8h-180.3c-115.1,0-186-7.7-195.6-21.1c-7.7-11.5-17.3-118.9-23-235.9c-13.4-299.2,19.2-400.8,164.9-548.5c147.7-145.8,251.3-182.2,521.7-182.2c180.3,0,212.9,5.8,316.5,53.7c153.4,71,241.7,163,320.3,328l63.3,136.2V-92c0,617.6-13.4,698.1-138.1,843.9C3444.5,872.7,3350.5,913,3168.3,913c-164.9,1.9-297.3-42.2-387.4-126.6l-44.1-40.3v366.3v368.3l456.5,3.8l454.6,5.7l5.8,207.1l5.8,205.2h-654.1h-652.1V1125.9z"/><path d="M6304.2,1885.5c-157.3-32.6-251.3-120.8-299.2-282c-38.4-128.5-51.8-383.6-28.8-562c40.3-305,172.6-446.9,422-446.9c320.3,0,456.5,220.6,437.3,713.5c-9.6,270.4-40.3,377.9-132.3,473.8C6616.9,1870.1,6446.2,1914.2,6304.2,1885.5z M6507.5,1632.3c32.6-36.4,36.5-72.9,36.5-391.3s-3.8-354.8-36.5-391.3c-44.1-47.9-147.7-53.7-191.8-11.5c-49.9,49.9-69,163-69,402.8c0,239.8,19.2,352.9,69,402.8C6359.9,1686,6463.4,1680.2,6507.5,1632.3z"/><path d="M7207.6,1793.4c-9.6-40.3-149.6-562-306.9-1158.5c-159.2-598.4-289.6-1091.3-289.6-1099c0-5.8,53.7-11.5,120.8-11.5h120.8l303.1,1147c166.8,629.1,308.8,1156.6,312.6,1170c7.7,17.3-23,23-117,23h-124.7L7207.6,1793.4z"/><path d="M7506.8,780.7c-191.8-67.1-281.9-268.5-281.9-623.3c0-352.9,103.6-581.1,289.6-632.9c247.4-71,456.5,32.6,548.6,270.4c47.9,124.7,47.9,602.3,0,740.4C7986.3,755.8,7738.9,865.1,7506.8,780.7z M7756.2,552.5l53.7-46l5.7-291.5c3.8-161.1,1.9-320.3-5.7-358.7c-24.9-136.2-151.5-184.1-241.7-90.2c-44.1,46-46,61.4-51.8,351c-7.7,331.8,11.5,427.7,95.9,462.2C7679.4,606.1,7698.6,602.3,7756.2,552.5z"/></g></g>
                </svg>
              </button>
              <button className="btn-support" disabled={changequestion} onClick={(e)=>{if(!changequestion){setsuport(e,'2')}}}>
                <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                  <g><path d="M133,500.9c0,71.3,17.6,142.5,55.6,207.5l95.3-78.4l62.3,348.3L10,855.3l102.9-84.6C61.2,691,31.1,596,31.1,500.9c0-219.3,138.1-414.3,341.2-479.3l45,81.2C246.7,159.8,133,322.2,133,500.9z"/><path d="M716.2,370L653.8,21.7L990,144.7l-102.8,84.6c51.7,79.6,81.7,174.6,81.7,269.7c0,219.3-138.1,414.3-341.2,479.3l-45-81.2C753.3,840.3,867,677.8,867,499.1c0-71.3-17.6-142.5-55.6-207.5L716.2,370z"/></g>
                </svg>
              </button>
              
            </div>
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
                    choicehiden={choicehiden}
                    setChoicehiden={data=>setChoicehiden(data)}
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
