import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Card, Input, ThemeToggle } from '../../components/UI';

export default function Settings({ onLogout }) {
  const { T } = useApp();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    arenaName:'Pro Sport Arena', address:'Chilonzor tumani, 5-ko\'cha', phone:'+998 90 123 45 67', desc:'',
    openTime:'08:00', closeTime:'23:00', minBook:'1', weekendPrice:'',
    notifyBooking:true, notifyCancel:true, notifyPayment:true,
  });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSave = () => {
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
        <div style={{ fontSize:20,fontWeight:900 }}>Sozlamalar</div>
        <ThemeToggle/>
      </div>

      {/* Arena info */}
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontWeight:800,fontSize:14,marginBottom:12,color:'#A78BFA' }}>Arena ma'lumotlari</div>
        <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Arena nomi</div>
            <Input value={form.arenaName} onChange={e=>set('arenaName',e.target.value)}/>
          </div>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Manzil</div>
            <Input value={form.address} onChange={e=>set('address',e.target.value)}/>
          </div>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Telefon</div>
            <Input value={form.phone} onChange={e=>set('phone',e.target.value)}/>
          </div>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Tavsif</div>
            <Input value={form.desc} onChange={e=>set('desc',e.target.value)} placeholder="Arena haqida qisqacha..."/>
          </div>
        </div>
      </Card>

      {/* Schedule */}
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontWeight:800,fontSize:14,marginBottom:12,color:'#A78BFA' }}>Ish vaqti va narx</div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10 }}>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Ochilish</div>
            <Input value={form.openTime} onChange={e=>set('openTime',e.target.value)} placeholder="08:00"/>
          </div>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Yopilish</div>
            <Input value={form.closeTime} onChange={e=>set('closeTime',e.target.value)} placeholder="23:00"/>
          </div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Min. bron (soat)</div>
            <Input value={form.minBook} onChange={e=>set('minBook',e.target.value)} placeholder="1"/>
          </div>
          <div>
            <div style={{ fontSize:12,color:T.sub,marginBottom:4 }}>Dam olish narxi</div>
            <Input value={form.weekendPrice} onChange={e=>set('weekendPrice',e.target.value)} placeholder="so'm"/>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontWeight:800,fontSize:14,marginBottom:12,color:'#A78BFA' }}>Bildirishnomalar</div>
        {[
          { key:'notifyBooking',  label:'Yangi bron' },
          { key:'notifyCancel',   label:'Bekor qilish' },
          { key:'notifyPayment',  label:"To'lov kirdi" },
        ].map(item=>(
          <div key={item.key} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12 }}>
            <span style={{ fontSize:14,color:T.text }}>{item.label}</span>
            <button onClick={()=>set(item.key,!form[item.key])} style={{ background:form[item.key]?T.accent:'transparent',border:`2px solid ${T.accent}`,borderRadius:20,width:44,height:24,cursor:'pointer',transition:'all 0.2s',position:'relative' }}>
              <div style={{ width:16,height:16,background:form[item.key]?'#0a1000':T.accent,borderRadius:'50%',position:'absolute',top:2,left:form[item.key]?24:2,transition:'all 0.2s' }}/>
            </button>
          </div>
        ))}
      </Card>

      {saved
        ? <div style={{ textAlign:'center',padding:'14px 0',color:'#4ECDC4',fontWeight:700,fontSize:15 }}>✅ Saqlandi!</div>
        : <Btn full onClick={handleSave} style={{ marginBottom:12 }}>Saqlash</Btn>
      }

      <button onClick={onLogout} style={{ width:'100%',background:T.card,border:'1px solid #ff444030',borderRadius:14,padding:14,color:'#ff6666',fontWeight:700,fontSize:13,cursor:'pointer',fontFamily:'inherit' }}>
        ← Rolni o'zgartirish
      </button>
    </div>
  );
}
