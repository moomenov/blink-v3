import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, Input, Divider, Modal, ThemeToggle } from '../../components/UI';
import { fp } from '../../data/constants';

export default function Profile({ onLogout }) {
  const { T, theme, cashback, paymentMethods, setPaymentMethods, notifications, markAllRead } = useApp();
  const [section, setSection] = useState(null); // null | 'payment' | 'notifications' | 'security' | 'language' | 'favorites' | 'edit'
  const [editForm, setEditForm] = useState({ name:'Jasur Toshmatov', phone:'+998 90 123 45 67', email:'jasur@gmail.com' });
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ type:'click', num:'' });
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passDone, setPassDone] = useState(false);
  const [lang, setLang] = useState("O'zbek");

  const myRatings = [
    { sport:'Futbol',    rating:1840, games:30, icon:'⚽', trend:'+120' },
    { sport:'Basketbol', rating:920,  games:12, icon:'🏀', trend:'+45'  },
    { sport:'Tennis',    rating:640,  games:8,  icon:'🎾', trend:'+20'  },
  ];

  if (section === 'edit') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:20 }}>Profilni tahrirlash</div>
      <div style={{ display:'flex',flexDirection:'column',gap:12,marginBottom:20 }}>
        <Input placeholder="Ism" value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})}/>
        <Input placeholder="Telefon" value={editForm.phone} onChange={e=>setEditForm({...editForm,phone:e.target.value})}/>
        <Input placeholder="Email" value={editForm.email} onChange={e=>setEditForm({...editForm,email:e.target.value})}/>
      </div>
      <Btn full onClick={()=>setSection(null)}>Saqlash ✓</Btn>
    </div>
  );

  if (section === 'payment') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:4 }}>To'lov usullari</div>
      <div style={{ color:T.sub,fontSize:13,marginBottom:20 }}>Saqlangan kartalar</div>
      {paymentMethods.map(m=>(
        <Card key={m.id} style={{ marginBottom:10,display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ fontSize:24 }}>{m.type==='click'?'💳':'💰'}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:14 }}>{m.name}</div>
            <div style={{ color:T.sub,fontSize:12 }}>{m.cardNum}</div>
          </div>
          {m.default && <Badge>Asosiy</Badge>}
          <button onClick={()=>setPaymentMethods(prev=>prev.filter(x=>x.id!==m.id))} style={{ background:'none',border:'none',color:'#ff6666',cursor:'pointer',fontSize:18,fontFamily:'inherit' }}>✕</button>
        </Card>
      ))}
      {showAddCard ? (
        <Card style={{ marginTop:14 }}>
          <div style={{ fontWeight:700,marginBottom:12 }}>Karta qo'shish</div>
          <div style={{ display:'flex',gap:8,marginBottom:12 }}>
            {['click','payme','uzcard','humo'].map(t=>(
              <button key={t} onClick={()=>setNewCard({...newCard,type:t})} style={{ flex:1,background:newCard.type===t?T.accent+'22':T.input,border:`1px solid ${newCard.type===t?T.accent:T.border}`,borderRadius:8,padding:'8px 0',fontSize:11,fontWeight:700,color:newCard.type===t?T.accent:T.sub,cursor:'pointer',fontFamily:'inherit',textTransform:'capitalize' }}>{t}</button>
            ))}
          </div>
          <Input placeholder="**** **** **** 0000" value={newCard.num} onChange={e=>setNewCard({...newCard,num:e.target.value})} style={{ marginBottom:12 }}/>
          <div style={{ display:'flex',gap:8 }}>
            <Btn sm onClick={()=>{ setPaymentMethods(prev=>[...prev,{ id:Date.now(),type:newCard.type,name:newCard.type.charAt(0).toUpperCase()+newCard.type.slice(1),cardNum:`**** ${newCard.num.slice(-4)||'0000'}`,default:false }]); setShowAddCard(false); setNewCard({type:'click',num:''}); }}>Qo'shish</Btn>
            <Btn sm sec onClick={()=>setShowAddCard(false)}>Bekor</Btn>
          </div>
        </Card>
      ) : (
        <Btn full sec style={{ marginTop:14 }} onClick={()=>setShowAddCard(true)}>+ Karta qo'shish</Btn>
      )}
    </div>
  );

  if (section === 'notifications') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
        <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',fontFamily:'inherit' }}>←</button>
        <div style={{ fontSize:20,fontWeight:900,flex:1 }}>Bildirishnomalar</div>
        <Btn sm sec onClick={markAllRead}>Hammasini o'qilgan deb belgilash</Btn>
      </div>
      {notifications.map(n=>(
        <Card key={n.id} style={{ marginBottom:10,borderLeft:`3px solid ${n.read?T.border:T.accent}` }}>
          <div style={{ fontWeight:n.read?500:700,fontSize:13,marginBottom:3,color:T.text }}>{n.text}</div>
          <div style={{ color:T.sub,fontSize:11 }}>{n.time}</div>
        </Card>
      ))}
    </div>
  );

  if (section === 'security') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:20 }}>Xavfsizlik</div>
      {passDone ? (
        <Card><div style={{ textAlign:'center',padding:'20px 0',color:T.accent,fontWeight:700 }}>✅ Parol muvaffaqiyatli o'zgartirildi!</div></Card>
      ) : (
        <Card>
          <div style={{ fontWeight:700,fontSize:14,marginBottom:14 }}>Parolni o'zgartirish</div>
          <Input placeholder="Eski parol" type="password" value={oldPass} onChange={e=>setOldPass(e.target.value)} style={{ marginBottom:10 }}/>
          <Input placeholder="Yangi parol" type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} style={{ marginBottom:14 }}/>
          <Btn full onClick={()=>{ if(oldPass&&newPass) setPassDone(true); }} disabled={!oldPass||!newPass}>Parolni o'zgartirish</Btn>
        </Card>
      )}
      <Card style={{ marginTop:14 }}>
        <div style={{ fontWeight:700,fontSize:14,marginBottom:10 }}>2FA — Ikki bosqichli tasdiqlash</div>
        <div style={{ color:T.sub,fontSize:13,marginBottom:12 }}>SMS orqali tasdiqlash kodi</div>
        <Btn sm>Yoqish</Btn>
      </Card>
    </div>
  );

  if (section === 'language') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:20 }}>Til sozlamalari</div>
      {["O'zbek","Русский","English"].map(l=>(
        <Card key={l} style={{ marginBottom:10,display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',border:`1.5px solid ${lang===l?T.accent:T.border}` }} onClick={()=>setLang(l)}>
          <span style={{ fontWeight:700,color:T.text }}>{l}</span>
          {lang===l && <span style={{ color:T.accent,fontSize:18 }}>✓</span>}
        </Card>
      ))}
    </div>
  );

  if (section === 'favorites') return (
    <div style={{ minHeight:'100vh',background:T.bg,padding:'52px 20px',color:T.text }}>
      <button onClick={()=>setSection(null)} style={{ background:'none',border:'none',color:T.text,fontSize:20,cursor:'pointer',marginBottom:20,fontFamily:'inherit' }}>←</button>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:20 }}>Sevimli arenalar</div>
      {['Pro Sport Arena','Grand Tennis Club','Basket Park'].map((a,i)=>(
        <Card key={i} style={{ marginBottom:10,display:'flex',alignItems:'center',gap:12 }}>
          <span style={{ fontSize:28 }}>🏟️</span>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700,fontSize:14,color:T.text }}>{a}</div>
            <div style={{ color:T.sub,fontSize:11 }}>Toshkent</div>
          </div>
          <button style={{ background:'none',border:'none',color:'#ff6666',cursor:'pointer',fontSize:18,fontFamily:'inherit' }}>🗑</button>
        </Card>
      ))}
    </div>
  );

  // ── Main profile ──
  return (
    <div style={{ paddingBottom:90,background:T.bg,minHeight:'100vh',color:T.text }}>
      <div style={{ padding:'52px 20px 20px',background:T.card,borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20 }}>
          <div style={{ display:'flex',alignItems:'center',gap:14 }}>
            <div style={{ width:64,height:64,borderRadius:'50%',background:'linear-gradient(135deg,#C8FF00,#8FBF00)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,fontWeight:900,color:'#0a1000' }}>J</div>
            <div>
              <div style={{ fontSize:18,fontWeight:900 }}>{editForm.name}</div>
              <div style={{ color:T.sub,fontSize:12 }}>{editForm.phone}</div>
              <div style={{ marginTop:5,display:'flex',gap:6 }}>
                <Badge>💎 Premium</Badge>
                <Badge color="#FFD700">⭐ Loyal</Badge>
              </div>
            </div>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end' }}>
            <ThemeToggle/>
            <Btn sm sec onClick={()=>setSection('edit')}>Tahrirlash</Btn>
          </div>
        </div>

        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8 }}>
          {[{ l:'Bronlar',v:'12' },{ l:'Cashback',v:fp(cashback) },{ l:'Umumiy ball',v:'1,840' }].map(s=>(
            <div key={s.l} style={{ background:T.input,border:`1px solid ${T.border}`,borderRadius:12,padding:'10px 8px',textAlign:'center' }}>
              <div style={{ fontWeight:900,fontSize:14,color:T.accent }}>{s.v}</div>
              <div style={{ color:T.sub,fontSize:10,marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'14px 20px' }}>
        {/* Sport ratings */}
        <div style={{ fontWeight:800,fontSize:15,marginBottom:12 }}>Sport reytinglarim</div>
        {myRatings.map(r=>(
          <Card key={r.sport} style={{ marginBottom:8,display:'flex',alignItems:'center',gap:12 }}>
            <div style={{ fontSize:26,width:42,height:42,background:T.input,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center' }}>{r.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:13 }}>{r.sport}</div>
              <div style={{ color:T.sub,fontSize:11 }}>{r.games} o'yin</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ color:T.accent,fontWeight:900,fontSize:15 }}>{r.rating}</div>
              <div style={{ color:'#4ECDC4',fontSize:10 }}>{r.trend} bu oy</div>
            </div>
          </Card>
        ))}

        {/* Menu */}
        <div style={{ fontWeight:800,fontSize:15,margin:'18px 0 12px' }}>Sozlamalar</div>
        {[
          { icon:'💳', label:"To'lov usullari",   sub:`${paymentMethods.length} ta saqlangan`, key:'payment'       },
          { icon:'❤️', label:'Sevimli arenalar',  sub:'3 ta saqlangan',                        key:'favorites'     },
          { icon:'🔔', label:'Bildirishnomalar',  sub:`${notifications.filter(n=>!n.read).length} ta yangi`,  key:'notifications' },
          { icon:'🌐', label:'Til',               sub:lang,                                    key:'language'      },
          { icon:'🔒', label:'Xavfsizlik',        sub:'Parol, 2FA',                            key:'security'      },
        ].map((item,i)=>(
          <Card key={i} style={{ marginBottom:8,display:'flex',alignItems:'center',gap:12,cursor:'pointer' }} onClick={()=>setSection(item.key)}>
            <span style={{ fontSize:20 }}>{item.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,fontSize:13 }}>{item.label}</div>
              <div style={{ color:T.sub,fontSize:11 }}>{item.sub}</div>
            </div>
            <span style={{ color:T.sub }}>›</span>
          </Card>
        ))}

        <button onClick={onLogout} style={{ width:'100%',marginTop:14,background:T.card,border:'1px solid #ff444030',borderRadius:14,padding:14,color:'#ff6666',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit' }}>
          ← Rolni o'zgartirish
        </button>
      </div>
    </div>
  );
}
