import { useRef } from "react";
import axios from "axios"
import { addquestionURL } from "../urls";
import { headers } from "../actions/auth";
export default function Start({ setUsername,setdata,setQuestionNumber }) {
  const inputRef = useRef();

  const handleClick = async () => {
    
    const res= await axios.post(addquestionURL,JSON.stringify(),headers)
    inputRef.current.value && setUsername(inputRef.current.value);
    setdata(res.data)
    setQuestionNumber(1)
  };

  return (
    <div className="start">
      <input
        className="startInput"
        placeholder="enter your name"
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
