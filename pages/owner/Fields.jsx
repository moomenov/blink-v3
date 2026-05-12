import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, Input, Select } from '../../components/UI';
import { CRM_FIELDS, SPORTS, fp } from '../../data/constants';

export default function Fields() {
  const { T } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name:'', sport:'Futbol', size:'', price:'' });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
        <div>
          <div style={{ fontSize:20,fontWeight:900,marginBottom:2 }}>Maydonlarim</div>
          <div style={{ color:T.sub,fontSize:13 }}>{CRM_FIELDS.length} ta maydon</div>
        </div>
        <Btn sm onClick={()=>setShowAdd(!showAdd)}>+ Qo'shish</Btn>
      </div>

      {showAdd && (
        <Card style={{ marginBottom:16,border:'1px solid #A78BFA30' }}>
          <div style={{ fontWeight:700,fontSize:14,marginBottom:12,color:'#A78BFA' }}>Yangi maydon</div>
          <div style={{ display:'flex',flexDirection:'column',gap:10,marginBottom:12 }}>
            <Input placeholder="Maydon nomi" value={form.name} onChange={e=>set('name',e.target.value)}/>
            <Select value={form.sport} onChange={e=>set('sport',e.target.value)}>
              {SPORTS.map(s=><option key={s.id} value={s.name}>{s.icon} {s.name}</option>)}
            </Select>
            <Input placeholder="O'lcham (m), masalan: 20x10" value={form.size} onChange={e=>set('size',e.target.value)}/>
            <Input placeholder="Narx (so'm/soat)" value={form.price} onChange={e=>set('price',e.target.value)}/>
          </div>
          <div style={{ display:'flex',gap:8 }}>
            <Btn sm onClick={()=>setShowAdd(false)} disabled={!form.name}>Saqlash</Btn>
            <Btn sm sec onClick={()=>setShowAdd(false)}>Bekor</Btn>
          </div>
        </Card>
      )}

      {CRM_FIELDS.map(f => (
        <Card key={f.id} style={{ marginBottom:12 }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10 }}>
            <div style={{ display:'flex',alignItems:'center',gap:10 }}>
              <span style={{ fontSize:28 }}>🏟️</span>
              <div>
                <div style={{ fontWeight:800,fontSize:14,color:T.text }}>{f.name}</div>
                <div style={{ color:T.sub,fontSize:12 }}>📐 {f.size}m · {f.surface}</div>
              </div>
            </div>
            <Badge color={f.status==='active'?'#C8FF00':'#FFD700'}>{f.status==='active'?'Faol':"Ta'mirat"}</Badge>
          </div>

          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:12,background:T.input,borderRadius:10,padding:10 }}>
            <div>
              <div style={{ color:T.sub,fontSize:10,marginBottom:2 }}>Narx</div>
              <div style={{ color:'#C8FF00',fontWeight:800,fontSize:14 }}>{fp(f.price)}</div>
            </div>
            <div>
              <div style={{ color:T.sub,fontSize:10,marginBottom:2 }}>Bugun bron</div>
              <div style={{ color:'#A78BFA',fontWeight:800,fontSize:14 }}>{f.today} ta</div>
            </div>
            <div>
              <div style={{ color:T.sub,fontSize:10,marginBottom:2 }}>Yoritish</div>
              <div style={{ color:f.lighting?'#C8FF00':'#ff6666',fontSize:13,fontWeight:600 }}>{f.lighting?'✓ Bor':'✗ Yo\'q'}</div>
            </div>
            <div>
              <div style={{ color:T.sub,fontSize:10,marginBottom:2 }}>Holat</div>
              <div style={{ color:f.status==='active'?'#C8FF00':'#FFD700',fontSize:13,fontWeight:600 }}>{f.status==='active'?'Faol':"Ta'mirat"}</div>
            </div>
          </div>

          <div style={{ display:'flex',gap:8 }}>
            <Btn sm sec style={{ flex:1 }}>✏️ Tahrirlash</Btn>
            <Btn sm danger>🗑</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}
