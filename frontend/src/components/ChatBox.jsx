import React, {useState} from 'react'
import { chat } from '../api'

export default function ChatBox({ participantId, condition, onComplete }){
  const [round, setRound] = useState(1);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  async function send(){
    if (!input.trim()) return;
    const user_message = input;
    setMessages(prev=>prev.concat({role:'user', text:user_message}));
    setInput('');
    const res = await chat({ participant_id: participantId, round, user_message });
    setMessages(prev=>prev.concat({role:'bot', text: res.reply}));
    if (round >= 3) {
      onComplete( Math.floor(Math.random()*100), 'I feel different now' );
    } else {
      setRound(r=>r+1);
    }
  }

  return (
    <div>
      <h3>Chat (condition: {condition}) — Round {round} of 3</h3>
      <div className="chat-box">
        {messages.map((m,i)=>(<div key={i} className={m.role}>{m.role}: {m.text}</div>))}
      </div>
      <textarea value={input} onChange={e=>setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  )
}
