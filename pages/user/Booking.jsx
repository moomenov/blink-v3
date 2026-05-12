import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, BackBtn } from '../../components/UI';
import { TIME_SLOTS, TAKEN_SLOTS, DAYS_UZ, MONTHS_UZ, fp } from '../../data/constants';

export default function Booking({ arena, nav }) {
  const { T } = useApp();
  const [selDate,  setSelDate]  = useState(0);
  const [selSlots, setSelSlots] = useState([]);
  const today = new Date();
  const total = selSlots.length * (arena?.price || 150000);
  const toggle = (s) => setSelSlots(p => p.includes(s) ? p.filter(x=>x!==s) : [...p,s]);

  return (
    <div style={{ paddingBottom:110, background:T.bg, minHeight:'100vh', color:T.text }}>
      <div style={{ padding:'52px 20px 14px', display:'flex', alignItems:'center', gap:12 }}>
        <BackBtn onClick={()=>nav('arena')}/>
        <div>
          <div style={{ fontSize:18,fontWeight:900 }}>Bron qilish</div>
          <div style={{ color:T.sub,fontSize:11 }}>{arena?.name}</div>
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        {/* Date */}
        <div style={{ fontWeight:700,fontSize:14,margin:'10px 0 10px' }}>Sanani tanlang</div>
        <div style={{ display:'flex',gap:8,overflowX:'auto',paddingBottom:6 }}>
          {[...Array(7)].map((_,i)=>{
            const d=new Date(today); d.setDate(today.getDate()+i);
            const act=selDate===i;
            return (
              <div key={i} onClick={()=>setSelDate(i)} style={{ flexShrink:0,width:50,background:act?T.accent:T.card,border:`1.5px solid ${act?T.accent:T.border}`,borderRadius:13,padding:'8px 0',textAlign:'center',cursor:'pointer' }}>
                <div style={{ fontSize:9,color:act?'#0a1000':T.sub,fontWeight:600 }}>{DAYS_UZ[d.getDay()]}</div>
                <div style={{ fontSize:17,fontWeight:900,color:act?'#0a1000':T.text }}>{d.getDate()}</div>
                <div style={{ fontSize:9,color:act?'#3a5000':T.sub }}>{MONTHS_UZ[d.getMonth()]}</div>
              </div>
            );
          })}
        </div>

        {/* Time slots */}
        <div style={{ fontWeight:700,fontSize:14,margin:'16px 0 10px' }}>Vaqtni tanlang</div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:7 }}>
          {TIME_SLOTS.map(s=>{
            const taken=TAKEN_SLOTS.includes(s), active=selSlots.includes(s);
            return (
              <button key={s} onClick={()=>!taken&&toggle(s)} style={{ background:taken?T.input:active?T.accent:T.card,color:taken?T.sub:active?'#0a1000':T.text,border:`1px solid ${taken?T.border:active?T.accent:T.border}`,borderRadius:10,padding:'9px 0',fontSize:12,fontWeight:700,cursor:taken?'not-allowed':'pointer',fontFamily:'inherit',opacity:taken?0.4:1 }}>
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ display:'flex',gap:16,margin:'12px 0',fontSize:11,color:T.sub }}>
          <span><span style={{ color:T.accent }}>■</span> Tanlangan</span>
          <span style={{ opacity:.4 }}>■ Band</span>
          <span>■ Bo'sh</span>
        </div>

        {/* Info box */}
        <div style={{ background:T.card,borderRadius:14,padding:'12px 14px',border:`1px solid ${T.border}`,marginTop:8 }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:6,color:T.accent }}>ℹ️ To'lov haqida</div>
          <div style={{ color:T.sub,fontSize:12,lineHeight:1.7 }}>
            • Siz maydonni band qilasiz va to'liq summani to'laysiz<br/>
            • O'yindan avval jamoa a'zolari o'zaro kelishadilar<br/>
            • Kelajakda: Click/Payme orqali split to'lov imkoniyati
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:T.navBg,borderTop:`1px solid ${T.border}`,padding:'14px 20px 28px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
        <div>
          <div style={{ color:T.sub,fontSize:11 }}>{selSlots.length} soat tanlangan</div>
          <div style={{ fontSize:20,fontWeight:900,color:T.accent }}>{fp(total)}</div>
        </div>
        <Btn onClick={()=>selSlots.length>0&&nav('payment')} disabled={selSlots.length===0}>Davom →</Btn>
      </div>
    </div>
  );
}
