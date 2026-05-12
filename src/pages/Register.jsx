import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Btn, Input, Select } from '../components/UI';

export default function Register({ onDone, onBack }) {
  const { T, setUser, theme } = useApp();
  const [step,    setStep]    = useState(1); // 1=role, 2=info, 3=done
  const [role,    setRole]    = useState('user');
  const [form,    setForm]    = useState({ name:'', phone:'', email:'', password:'', sport:'Futbol' });
  const [loading, setLoading] = useState(false);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name:form.name, phone:form.phone, email:form.email, role });
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px 40px',maxWidth:480,margin:'0 auto' }}>
      <button onClick={onBack} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',fontFamily:'inherit',marginBottom:24 }}>←</button>

      {step===1 && (
        <>
          <div style={{ fontSize:24,fontWeight:900,color:T.text,marginBottom:6 }}>Ro'yxatdan o'tish</div>
          <div style={{ color:T.sub,fontSize:14,marginBottom:28 }}>Siz kim bo'lib ro'yxatdan o'tyapsiz?</div>
          {[
            { id:'user',  icon:'🏃', title:'Foydalanuvchi',  sub:'Maydon band qiluvchi'     },
            { id:'owner', icon:'🏟️',title:'Maydon egasi',    sub:'O\'z maydonimni qo\'shaman'},
          ].map(r=>(
            <div key={r.id} onClick={()=>setRole(r.id)} style={{ background:role===r.id?T.accent+'18':T.card, border:`2px solid ${role===r.id?T.accent:T.border}`, borderRadius:18, padding:'18px 20px', cursor:'pointer', marginBottom:12, display:'flex', alignItems:'center', gap:14 }}>
              <span style={{ fontSize:28 }}>{r.icon}</span>
              <div>
                <div style={{ fontWeight:800,fontSize:16,color:T.text }}>{r.title}</div>
                <div style={{ color:T.sub,fontSize:12 }}>{r.sub}</div>
              </div>
            </div>
          ))}
          <Btn full style={{ marginTop:16 }} onClick={()=>setStep(2)}>Davom etish →</Btn>
        </>
      )}

      {step===2 && (
        <>
          <div style={{ fontSize:22,fontWeight:900,color:T.text,marginBottom:4 }}>Ma'lumotlarni kiriting</div>
          <div style={{ color:T.sub,fontSize:13,marginBottom:24 }}>{role==='user'?'Foydalanuvchi':'Maydon egasi'} sifatida</div>
          <div style={{ display:'flex',flexDirection:'column',gap:12,marginBottom:20 }}>
            <Input placeholder="To'liq ismingiz" value={form.name} onChange={e=>set('name',e.target.value)}/>
            <Input placeholder="Telefon: +998 90 123 45 67" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
            <Input placeholder="Email" type="email" value={form.email} onChange={e=>set('email',e.target.value)}/>
            <Input placeholder="Parol (kamida 8 belgi)" type="password" value={form.password} onChange={e=>set('password',e.target.value)}/>
            {role==='user' && (
              <Select value={form.sport} onChange={e=>set('sport',e.target.value)}>
                {['Futbol','Tennis','Basketbol','Voleybol','Xokkey'].map(s=><option key={s}>{s}</option>)}
              </Select>
            )}
          </div>
          <Btn full onClick={handleSubmit} disabled={!form.name||!form.phone||loading}>
            {loading?'Yuklanmoqda...':'Ro\'yxatdan o\'tish'}
          </Btn>
          <div style={{ textAlign:'center',marginTop:14,color:T.sub,fontSize:12 }}>
            Allaqachon hisobingiz bormi? <span style={{ color:T.accent,cursor:'pointer' }} onClick={onBack}>Kirish</span>
          </div>
        </>
      )}

      {step===3 && (
        <div style={{ textAlign:'center',paddingTop:60 }}>
          <div style={{ fontSize:70,marginBottom:20 }}>🎉</div>
          <div style={{ fontSize:24,fontWeight:900,color:T.text,marginBottom:8 }}>Xush kelibsiz, {form.name}!</div>
          <div style={{ color:T.sub,fontSize:14,marginBottom:32 }}>Hisobingiz muvaffaqiyatli yaratildi</div>
          <Btn full onClick={()=>onDone(role)}>Boshlash →</Btn>
        </div>
      )}
    </div>
  );
}
