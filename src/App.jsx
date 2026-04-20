
import React, {useMemo, useState, useEffect} from 'react';
const chapters=["Vital Signs","Eyes","Ears","Respiratory","Cardiovascular","Peripheral Vascular","Abdomen/GU","Musculoskeletal","Neurological"];
const bank=[]; chapters.forEach(ch=>{for(let i=1;i<=30;i++){bank.push({section:ch,q:`${ch}: Practice Question ${i}`,choices:["Option A","Option B","Option C","Option D"],a:0,rat:"Review core concepts from your study guide."})}});
export default function App(){
  const [mode,setMode]=useState(null),[idx,setIdx]=useState(0),[answers,setAnswers]=useState([]),[time,setTime]=useState(0);
  useEffect(()=>{if(!mode)return; const t=setInterval(()=>setTime(v=>v+1),1000); return ()=>clearInterval(t)},[mode]);
  const reset=(m)=>{setMode(m);setIdx(0);setAnswers([]);setTime(0);}
  const questions=useMemo(()=>!mode?[]:mode==="Mixed Final"?[...bank].sort(()=>Math.random()-0.5).slice(0,75):bank.filter(x=>x.section===mode).slice(0,25),[mode]);
  if(!mode) return <div className="wrap"><div className="card"><div className="title">Nursing Health Assessment Final Prep</div><p className="small">Choose a section</p>{chapters.map(c=><button key={c} onClick={()=>reset(c)}>{c}</button>)}<button onClick={()=>reset("Mixed Final")}>Mixed 75 Question Final</button></div></div>;
  if(idx>=questions.length){const correct=answers.filter(Boolean).length; return <div className="wrap"><div className="card"><div className="title">Results</div><p>Right: {correct}</p><p>Wrong: {answers.length-correct}</p><p>Score: {Math.round(correct/answers.length*100)}%</p><p>Time: {Math.floor(time/60)}m {time%60}s</p><button onClick={()=>setMode(null)}>Home</button></div></div>}
  const q=questions[idx], selected=answers[idx]!==undefined;
  return <div className="wrap"><div className="card"><h2>{mode}</h2><p>{idx+1}. {q.q}</p><div className="progress"><div className="bar" style={{width:`${idx/questions.length*100}%`}}></div></div>{q.choices.map((c,i)=><button key={i} disabled={selected} onClick={()=>{const arr=[...answers]; arr[idx]=i===q.a; setAnswers(arr)}}>{String.fromCharCode(65+i)}. {c}</button>)}{selected&&<div><p><b>Correct Answer: A</b></p><p>Rationale: {q.rat}</p><button onClick={()=>setIdx(idx+1)}>Next</button></div>}</div></div>
}
