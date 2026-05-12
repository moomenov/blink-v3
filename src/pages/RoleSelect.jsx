import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/UI';

export default function RoleSelect({ onSelect }) {
  const { T, theme } = useApp();
  const [hov, setHov]   = useState(null);
  const [anim, setAnim] = useState(false);
  useEffect(() => { setTimeout(() => setAnim(true), 80); }, []);

  return (
    <div style={{ minHeight:'100vh', background:T.bg, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 20px', overflow:'hidden', position:'relative' }}>
      {theme==='dark' && <>
        <div style={{ position:'absolute',top:-200,left:-200,width:500,height:500,borderRadius:'50%',background:'radial-gradient(#C8FF0010,transparent 70%)' }}/>
        <div style={{ position:'absolute',bottom:-100,right:-100,width:300,height:300,borderRadius:'50%',background:'radial-gradient(#C8FF0008,transparent 70%)' }}/>
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(#C8FF0006 1px,transparent 1px),linear-gradient(90deg,#C8FF0006 1px,transparent 1px)',backgroundSize:'44px 44px' }}/>
      </>}

      <div style={{ position:'relative',width:'100%',maxWidth:420,opacity:anim?1:0,transform:anim?'translateY(0)':'translateY(24px)',transition:'all 0.55s cubic-bezier(.4,0,.2,1)' }}>
        <div style={{ textAlign:'center',marginBottom:44 }}>
          <div style={{ fontSize:58,fontWeight:900,letterSpacing:-2,background:'linear-gradient(135deg,#C8FF00,#8FBF00)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',lineHeight:1 }}>BLINK</div>
          <div style={{ color:T.sub,fontSize:11,letterSpacing:4,marginTop:6,textTransform:'uppercase' }}>Sport Maydonlar</div>
        </div>

        <div style={{ color:T.sub,textAlign:'center',fontSize:14,marginBottom:24 }}>Davom etish uchun rolni tanlang</div>

        {[
          { id:'user',  icon:'🏃', title:'Foydalanuvchi', sub:'Maydon ijaraga oluvchi', color:T.accent,  features:['Bron qilish','Jamoa tuzish','Reyting','Chat'] },
          { id:'owner', icon:'🏟️',title:'Maydon egasi',  sub:'CRM Dashboard',         color:'#A78BFA', features:['Bronlar','Daromad','Analitika','Maydonlar']   },
        ].map(r => (
          <div key={r.id}
            onMouseEnter={()=>setHov(r.id)} onMouseLeave={()=>setHov(null)}
            onClick={()=>onSelect(r.id)}
            style={{
              background:hov===r.id?(r.id==='user'?T.card+'ee':T.card+'ee'):T.card,
              border:`2px solid ${hov===r.id?r.color:T.border}`,
              borderRadius:22,padding:'22px 20px',cursor:'pointer',marginBottom:14,
              transform:hov===r.id?'scale(1.015)':'scale(1)',
              boxShadow:hov===r.id?`0 0 40px ${r.color}18`:'none',
              transition:'all 0.22s',
            }}
          >
            <div style={{ display:'flex',alignItems:'center',gap:14,marginBottom:10 }}>
              <div style={{ width:52,height:52,borderRadius:14,background:r.color+'18',border:`1px solid ${r.color}25`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize:18,fontWeight:900,color:T.text }}>{r.title}</div>
                <div style={{ color:r.color,fontSize:12,fontWeight:600,marginTop:1 }}>{r.sub}</div>
              </div>
            </div>
            <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
              {r.features.map(f=><Badge key={f} color={r.color}>{f}</Badge>)}
            </div>
          </div>
        ))}

        <div style={{ textAlign:'center',color:T.sub,fontSize:12,marginTop:4 }}>
          Hisob yo'qmi? <span style={{ color:T.accent,cursor:'pointer' }} onClick={()=>onSelect('register')}>Ro'yxatdan o'ting →</span>
        </div>
      </div>
    </div>
  );
}
