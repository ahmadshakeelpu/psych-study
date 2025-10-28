import React, {useState} from 'react'
import { createParticipant, saveScales, screening, chat, complete } from '../api'
import ChatBox from './ChatBox'

export default function SurveyFlow(){
  const [step, setStep] = useState(0);
  const [participantId, setParticipantId] = useState(null);
  const [demographic, setDemographic] = useState({});
  const [attari, setAttari] = useState({});
  const [tai, setTai] = useState({});
  const [screeningText, setScreeningText] = useState('');
  const [baselineUse, setBaselineUse] = useState(50);
  const [condition, setCondition] = useState(null);

  async function handleStart(){
    const res = await createParticipant({ consent_at: new Date().toISOString(), demographic });
    setParticipantId(res.participant_id);
    setStep(1);
  }

  async function handleSaveScalesAndScreen(){
    await saveScales({ participant_id: participantId, attari, tai });
    const r = await screening({ participant_id: participantId, screening_text: screeningText, baseline_use: baselineUse });
    if (r.excluded){ alert('You indicated no concerns — excluded from study'); return; }
    setCondition(r.condition);
    setStep(2);
  }

  async function handleComplete(postUse, postChange){
    await complete({ participant_id: participantId, post_use: postUse, post_change: postChange });
    setStep(3);
  }

  return (
    <div className="container">
      {step===0 && (
        <div>
          <h1>Welcome</h1>
          <p>Consent text...</p>
          <button onClick={handleStart}>Start</button>
        </div>
      )}

      {step===1 && (
        <div>
          <h2>Scales</h2>
          <p>Simple inputs for ATTARI & TAI (for demo we use minimal UI)</p>
          <label>Screening: concerns? (type 'no' to be excluded)</label>
          <input value={screeningText} onChange={e=>setScreeningText(e.target.value)} />
          <label>Baseline slider</label>
          <input type="range" min="0" max="100" value={baselineUse} onChange={e=>setBaselineUse(e.target.value)} />
          <button onClick={handleSaveScalesAndScreen}>Proceed to chat</button>
        </div>
      )}

      {step===2 && participantId && (
        <ChatBox participantId={participantId} condition={condition} onComplete={handleComplete} />
      )}

      {step===3 && (
        <div>
          <h2>Thank you!</h2>
          <p>Your responses have been saved.</p>
        </div>
      )}
    </div>
  )
}
