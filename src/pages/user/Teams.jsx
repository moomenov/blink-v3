import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, Input, Select, BackBtn } from '../../components/UI';
import { TEAMS, PLAYERS, SPORTS, CHAT_MESSAGES, SPORT_EMOJI, SPORT_COLOR, LEVEL_COLORS } from '../../data/constants';

// ── Team Detail ──────────────────────────────────────────
export function TeamDetail({ team, nav }) {
  const { T } = useApp();
  const [tab,  setTab]  = useState('info');
  const [msg,  setMsg]  = useState('');
  const [msgs, setMsgs] = useState(CHAT_MESSAGES);
  const bottomRef = useRef(null);
  useEffect(() => { if(tab==='chat') bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [tab, msgs]);
  if (!team) return null;

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMsgs(p=>[...p, { id:Date.now(), user:'Siz', text:msg, time:new Date().toLocaleTimeString('uz',{hour:'2-digit',minute:'2-digit'}), mine:true }]);
    setMsg('');
  };

  return (
    <div style={{ paddingBottom:tab==='chat'?80:20, background:T.bg, minHeight:'100vh', color:T.text }}>
      <div style={{ background:'linear-gradient(135deg,#0a1a00,#1a2800)', padding:'52px 20px 20px', position:'relative' }}>
        <div style={{ position:'absolute',top:52,left:18 }}><BackBtn onClick={()=>nav('teams')}/></div>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:42,marginBottom:6 }}>{SPORT_EMOJI[team.sport]||'🏟️'}</div>
          <div style={{ fontSize:22,fontWeight:900,color:'#f0f0f0' }}>{team.badge} {team.name}</div>
          <div style={{ color:'#666',fontSize:13,marginTop:2 }}>{team.sport} · Rahbar: {team.leader}</div>
          <div style={{ display:'flex',gap:14,justifyContent:'center',marginTop:16 }}>
            {[{ v:team.rating,l:'Reyting',c:'#C8FF00' },{ v:team.wins,l:"G'alaba",c:'#4ECDC4' },{ v:team.losses,l:"Mag'lubiyat",c:'#ff4444' },{ v:team.members,l:"A'zo",c:'#A78BFA' }].map(s=>(
              <div key={s.l} style={{ textAlign:'center' }}>
                <div style={{ color:s.c,fontWeight:900,fontSize:22 }}>{s.v}</div>
                <div style={{ color:'#555',fontSize:10 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        <div style={{ display:'flex',gap:8,margin:'16px 0' }}>
          {['info','members','chat'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1,background:tab===t?T.accent:T.card,color:tab===t?'#0a1000':T.sub,border:`1px solid ${tab===t?T.accent:T.border}`,borderRadius:10,padding:'9px 0',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>
              {t==='info'?"Ma'lumot":t==='members'?"A'zolar":'💬 Chat'}
            </button>
          ))}
        </div>

        {tab==='info' && (
          <>
            <Card style={{ marginBottom:12 }}>
              <div style={{ fontWeight:700,fontSize:13,marginBottom:8,color:T.accent }}>Jamoa haqida</div>
              <div style={{ color:T.sub,fontSize:13,lineHeight:1.6 }}>Professional darajadagi {team.sport} jamoasi. Toshkent bo'ylab turnirlarda qatnashamiz.</div>
            </Card>
            <Card style={{ marginBottom:12 }}>
              <div style={{ fontWeight:700,fontSize:13,marginBottom:10 }}>So'nggi o'yinlar</div>
              {[{ opp:'Almaz FC',res:"G'alaba",score:'3-1',date:'12 May' },{ opp:'Storm Team',res:"Mag'lubiyat",score:'1-2',date:'8 May' },{ opp:'Speed Kings',res:"G'alaba",score:'2-0',date:'3 May' }].map((m,i)=>(
                <div key={i} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8 }}>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600,color:T.text }}>{m.opp}</div>
                    <div style={{ fontSize:10,color:T.sub }}>{m.date}</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:14,fontWeight:800,color:m.res==="G'alaba"?'#C8FF00':'#ff4444' }}>{m.score}</div>
                    <div style={{ fontSize:10,color:m.res==="G'alaba"?'#C8FF00':'#ff4444' }}>{m.res}</div>
                  </div>
                </div>
              ))}
            </Card>
            {team.members<team.max && <Btn full>Jamoaga qo'shilish</Btn>}
          </>
        )}

        {tab==='members' && PLAYERS.filter(p=>p.team===team.name).map(p=>(
          <Card key={p.id} style={{ marginBottom:10,display:'flex',alignItems:'center',gap:12 }}>
            <div style={{ width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#1a3300,#0f2000)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:'#f0f0f0',fontWeight:700,border:'2px solid #C8FF0020' }}>{p.name[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{p.name} {p.name===team.leader?'👑':''}</div>
              <div style={{ color:T.sub,fontSize:11 }}>{p.sport} · {p.level}</div>
            </div>
            <div style={{ color:T.accent,fontWeight:900,fontSize:15 }}>{p.rating}</div>
          </Card>
        ))}

        {tab==='chat' && (
          <div style={{ paddingBottom:70 }}>
            {msgs.map(m=>(
              <div key={m.id} style={{ display:'flex',flexDirection:'column',alignItems:m.mine?'flex-end':'flex-start',marginBottom:12 }}>
                {!m.mine && <div style={{ fontSize:10,color:T.sub,marginBottom:3,marginLeft:4 }}>{m.user}</div>}
                <div style={{ background:m.mine?`linear-gradient(135deg,${T.accent},${T.accent}cc)`:T.card,color:m.mine?'#0a1000':T.text,borderRadius:m.mine?'14px 14px 4px 14px':'14px 14px 14px 4px',padding:'10px 14px',maxWidth:'80%',fontSize:13,lineHeight:1.5 }}>
                  {m.text}
                </div>
                <div style={{ fontSize:9,color:T.sub,marginTop:3 }}>{m.time}</div>
              </div>
            ))}
            <div ref={bottomRef}/>
          </div>
        )}
      </div>

      {tab==='chat' && (
        <div style={{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:T.navBg,borderTop:`1px solid ${T.border}`,padding:'10px 16px 24px',display:'flex',gap:10 }}>
          <Input placeholder="Xabar yozing..." value={msg} onChange={e=>setMsg(e.target.value)} style={{ flex:1 }}/>
          <Btn sm onClick={sendMsg}>→</Btn>
        </div>
      )}
    </div>
  );
}

// ── Teams List ───────────────────────────────────────────
export default function Teams({ nav, setTeam }) {
  const { T } = useApp();
  const [tab,       setTab]       = useState('teams');
  const [showCreate,setShowCreate] = useState(false);
  const [newTeam,   setNewTeam]   = useState({ name:'', sport:'Futbol' });

  return (
    <div style={{ paddingBottom:90,background:T.bg,minHeight:'100vh',color:T.text }}>
      <div style={{ padding:'52px 20px 14px' }}>
        <div style={{ fontSize:20,fontWeight:900,marginBottom:2 }}>Jamoalar ⚡</div>
        <div style={{ color:T.sub,fontSize:12,marginBottom:14 }}>Jamoa tuz yoki qo'shil, reyting oshir</div>
        <div style={{ display:'flex',gap:8 }}>
          {['teams','players','rating'].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{ flex:1,background:tab===t?T.accent:T.card,color:tab===t?'#0a1000':T.sub,border:`1px solid ${tab===t?T.accent:T.border}`,borderRadius:10,padding:'9px 0',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit' }}>
              {t==='teams'?'Jamoalar':t==='players'?"O'yinchilar":'Reyting'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        {tab==='teams' && (
          <>
            <Btn full style={{ marginBottom:14 }} onClick={()=>setShowCreate(!showCreate)}>+ Yangi jamoa tuzish</Btn>
            {showCreate && (
              <Card style={{ marginBottom:14,border:`1px solid ${T.accent}30` }}>
                <div style={{ fontWeight:700,fontSize:14,marginBottom:12,color:T.accent }}>Yangi jamoa</div>
                <Input placeholder="Jamoa nomi..." value={newTeam.name} onChange={e=>setNewTeam({...newTeam,name:e.target.value})} style={{ marginBottom:10 }}/>
                <Select value={newTeam.sport} onChange={e=>setNewTeam({...newTeam,sport:e.target.value})} style={{ marginBottom:12 }}>
                  {SPORTS.map(s=><option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
                </Select>
                <div style={{ display:'flex',gap:8 }}>
                  <Btn sm onClick={()=>setShowCreate(false)} disabled={!newTeam.name}>Yaratish</Btn>
                  <Btn sm sec onClick={()=>setShowCreate(false)}>Bekor</Btn>
                </div>
              </Card>
            )}
            {TEAMS.map(t=>(
              <Card key={t.id} style={{ marginBottom:12,cursor:'pointer' }} onClick={()=>{ setTeam(t); nav('team_detail'); }}>
                <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:12 }}>
                  <div style={{ width:48,height:48,borderRadius:14,background:'linear-gradient(135deg,#1a3300,#0f2000)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22 }}>{SPORT_EMOJI[t.sport]||'🏟️'}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:15,color:T.text }}>{t.badge} {t.name}</div>
                    <div style={{ color:T.sub,fontSize:12 }}>{t.sport} · {t.members}/{t.max} a'zo</div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ color:T.accent,fontWeight:900,fontSize:16 }}>{t.rating}</div>
                    <div style={{ color:T.sub,fontSize:10 }}>reyting</div>
                  </div>
                </div>
                <div style={{ display:'flex',gap:8,justifyContent:'space-between',alignItems:'center' }}>
                  <div style={{ display:'flex',gap:7 }}>
                    <Badge color="#C8FF00">W:{t.wins}</Badge>
                    <Badge color="#ff4444">L:{t.losses}</Badge>
                  </div>
                  {t.members<t.max
                    ? <Btn sm onClick={e=>e.stopPropagation()}>Qo'shilish</Btn>
                    : <span style={{ color:T.sub,fontSize:11 }}>To'lgan</span>
                  }
                </div>
              </Card>
            ))}
          </>
        )}

        {tab==='players' && PLAYERS.map(p=>(
          <Card key={p.id} style={{ marginBottom:10,display:'flex',alignItems:'center',gap:12 }}>
            <div style={{ position:'relative' }}>
              <div style={{ width:46,height:46,borderRadius:'50%',background:'linear-gradient(135deg,#1a3300,#0f2000)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,color:'#f0f0f0',fontWeight:700,border:'2px solid #C8FF0015' }}>{p.name[0]}</div>
              {p.online&&<div style={{ position:'absolute',bottom:1,right:1,width:11,height:11,background:T.accent,borderRadius:'50%',border:`2px solid ${T.card}` }}/>}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:14,marginBottom:3,color:T.text }}>{p.name}</div>
              <div style={{ display:'flex',gap:5 }}>
                <Badge color={SPORT_COLOR[p.sport]||T.accent}>{p.sport}</Badge>
                <Badge color={LEVEL_COLORS[p.level]||T.accent}>{p.level}</Badge>
              </div>
              {p.team&&<div style={{ fontSize:10,color:T.sub,marginTop:3 }}>🏅 {p.team}</div>}
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ color:T.accent,fontWeight:900,fontSize:15 }}>{p.rating}</div>
              <div style={{ color:T.sub,fontSize:10 }}>ball</div>
            </div>
          </Card>
        ))}

        {tab==='rating' && (
          <>
            <div style={{ fontWeight:700,fontSize:12,color:T.sub,marginBottom:10,letterSpacing:1 }}>JAMOALAR</div>
            {[...TEAMS].sort((a,b)=>b.rating-a.rating).map((t,i)=>(
              <Card key={t.id} style={{ marginBottom:8,display:'flex',alignItems:'center',gap:12 }}>
                <div style={{ width:32,height:32,borderRadius:'50%',background:i===0?'linear-gradient(135deg,#FFD700,#FFA500)':i===1?'linear-gradient(135deg,#aaa,#888)':i===2?'linear-gradient(135deg,#CD7F32,#8B4513)':T.input,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:i<3?'#0a1000':T.sub,flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{t.badge} {t.name}</div>
                  <div style={{ color:T.sub,fontSize:11 }}>{t.sport} · {t.wins}W/{t.losses}L</div>
                </div>
                <div style={{ color:T.accent,fontWeight:900,fontSize:16 }}>{t.rating}</div>
              </Card>
            ))}
            <div style={{ fontWeight:700,fontSize:12,color:T.sub,margin:'16px 0 10px',letterSpacing:1 }}>O'YINCHILAR</div>
            {[...PLAYERS].sort((a,b)=>b.rating-a.rating).map((p,i)=>(
              <Card key={p.id} style={{ marginBottom:8,display:'flex',alignItems:'center',gap:12 }}>
                <div style={{ width:32,height:32,borderRadius:'50%',background:i===0?'linear-gradient(135deg,#FFD700,#FFA500)':i===1?'linear-gradient(135deg,#aaa,#888)':i===2?'linear-gradient(135deg,#CD7F32,#8B4513)':T.input,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:i<3?'#0a1000':T.sub,flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{p.name}</div>
                  <div style={{ color:T.sub,fontSize:11 }}>{p.sport} · {p.level}</div>
                </div>
                <div style={{ color:T.accent,fontWeight:900,fontSize:16 }}>{p.rating}</div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
