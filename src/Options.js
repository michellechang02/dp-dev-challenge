import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import Data from './data.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Options({option}) {
    
    const [arr, setArr] = useState([])
    const[submitted, setSubmitted] = useState(false)
    const[track, setTrack] = useState(true)
    const[ans, setAns] = useState('')
    let counter = 0
    const finishedQs = []
    for (let z = 0; z < Object.keys(Data.questions).length; z++) {
        arr.push(-1)
    }
    
    

    function handleChange(e, id) {
        let copy = arr
        copy[id] = e.value
        setArr(copy)
        if(!finishedQs.includes(id)) {
            finishedQs.push(id)
            setTrack(finishedQs.length < Object.keys(Data.questions).length)
        }
       
    }

    function createSelection(options, id) {
        const here =[]
        for (let i = 65; i < 65 + Object.keys(options).length; i++) {
            here.push({value: (i - 65), label: options[String.fromCharCode(i)]})
        }
        return(
            <div>
                 <Select options={here} onChange={(e) => handleChange(e, id)}/> 
                
            </div>
        ) 
        
    }

    const allDone = finishedQs.length === Object.keys(Data.questions).length;

    function handleSubmit(e) {
       e.preventDefault();
      setSubmitted(true)
      const resArr = Object.values(Data.results)
        setAns(resArr.at(findMode(arr)))
    }
    function findMode(arr) {
        var map = {};
        for (var i = 0; i < arr.length; i++) {
            if (map[arr[i]] === undefined && arr[i] !== -1) {
                map[arr[i]] = 0;
            }
            if (arr[i] !== -1) map[arr[i]] += 1;
        }
        var greatestFreq = 0;
        var mode;
        for (var prop in map) {
            if (map[prop] > greatestFreq) {
                greatestFreq = map[prop];
                mode = prop;
            }
        }
        return mode;
    }

    
  return (
    <div>
        {!submitted && <form onSubmit={e => handleSubmit(e)}>
        {Data.questions.map((item, id) => (
            <div style={{width: "50%", margin: "auto"}}>
                <h6>❗ {item.prompt}</h6>
            {createSelection(item.options, id)}
            <br/>
            </div>
            
        ))}
      {(track) ? <Button variant="dark" disabled>
        Show me my results 📈</Button> : <Button variant="dark" type="submit" > 
        Show me my results 📈</Button>}
    </form> }

            {submitted && 
            <div style={{width: "50%", margin:"auto"}}> 
                <h3>Result! 📉</h3>
                <p> {ans}</p>


                <Button variant="dark" onClick={() => window.location.reload(false)}>Retake Quiz 😖</Button>

            </div>
            }
        <br/>
    </div>
  )
}

export default Options