import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Card, Input } from '../../components/UI';

const PROVIDERS = [
  {
    id:'click', name:'Click', color:'#00A3FF', icon:'💳',
    fields:[
      { key:'merchant_id',  label:'Merchant ID',    hint:'Click kabinet → Merchant sozlamalari' },
      { key:'service_id',   label:'Service ID',     hint:'Har bir maydon uchun alohida' },
      { key:'secret_key',   label:'Secret Key',     hint:'Click API secret key' },
      // TODO: CLICK_SPLIT_PAYMENT_HOOK
      // { key:'split_token', label:'Split Token', hint:'Split payment — backend tayyor bo\'lganda qo\'shing' },
    ],
    splitNote:'Split payment: foydalanuvchilar o\'z ulushini alohida to\'lashi — backend tayyor bo\'lganda ulanadi.',
    docsUrl:'https://docs.click.uz',
  },
  {
    id:'payme', name:'Payme', color:'#00CCAA', icon:'💰',
    fields:[
      { key:'merchant_id', label:'Merchant ID',  hint:'Payme Business kabinet' },
      { key:'cashier_key', label:'Cashier Key',  hint:'Payme API key' },
      { key:'secret_key',  label:'Secret Key',   hint:'Tranzaksiya tekshirish' },
      // TODO: PAYME_SPLIT_PAYMENT_HOOK
      // { key:'split_token', label:'Split Token', hint:'Split payment — backend tayyor bo\'lganda qo\'shing' },
    ],
    splitNote:'Split payment: foydalanuvchilar o\'z ulushini alohida to\'lashi — backend tayyor bo\'lganda ulanadi.',
    docsUrl:'https://developer.help.paycom.uz',
  },
  {
    id:'uzcard', name:'Uzcard', color:'#FF6B35', icon:'🏦',
    fields:[
      { key:'merchant_id', label:'Merchant ID', hint:'Uzcard merchant kabineti' },
      { key:'terminal_id', label:'Terminal ID', hint:'To\'lov terminali ID' },
    ],
    splitNote:null,
    docsUrl:'https://uzcard.uz',
  },
  {
    id:'humo', name:'Humo', color:'#A78BFA', icon:'🎴',
    fields:[
      { key:'merchant_id', label:'Merchant ID', hint:'Humo merchant kabineti' },
      { key:'api_key',     label:'API Key',     hint:'Humo API kaliti' },
    ],
    splitNote:null,
    docsUrl:'https://humo.uz',
  },
];

export default function PaymentSetup() {
  const { T } = useApp();
  const [active, setActive]  = useState('click');
  const [values, setValues]  = useState({});
  const [saved,  setSaved]   = useState({});

  const provider = PROVIDERS.find(p=>p.id===active);
  const setVal = (k,v) => setValues(prev=>({...prev,[`${active}_${k}`]:v}));
  const getVal = (k) => values[`${active}_${k}`] || '';

  const handleSave = () => {
    setSaved(prev=>({...prev,[active]:true}));
    setTimeout(()=>setSaved(prev=>({...prev,[active]:false})),2000);
  };

  return (
    <div style={{ padding:'24px 20px',color:T.text }}>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:4 }}>To'lov sozlamalari</div>
      <div style={{ color:T.sub,fontSize:13,marginBottom:16 }}>To'lov tizimlarini ulash</div>

      {/* Provider tabs */}
      <div style={{ display:'flex',gap:8,overflowX:'auto',paddingBottom:8,marginBottom:16 }}>
        {PROVIDERS.map(p=>(
          <button key={p.id} onClick={()=>setActive(p.id)} style={{ flexShrink:0,background:active===p.id?p.color+'22':T.card,color:active===p.id?p.color:T.sub,border:`1.5px solid ${active===p.id?p.color+'55':T.border}`,borderRadius:12,padding:'8px 16px',fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6 }}>
            <span>{p.icon}</span>{p.name}
          </button>
        ))}
      </div>

      {provider && (
        <Card style={{ marginBottom:14,border:`1px solid ${provider.color}25` }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:16 }}>
            <span style={{ fontSize:28 }}>{provider.icon}</span>
            <div>
              <div style={{ fontWeight:800,fontSize:16,color:provider.color }}>{provider.name}</div>
              <div style={{ color:T.sub,fontSize:12 }}>API sozlamalari</div>
            </div>
            <a href={provider.docsUrl} target="_blank" rel="noreferrer" style={{ marginLeft:'auto',color:provider.color,fontSize:11,textDecoration:'none',border:`1px solid ${provider.color}33`,borderRadius:8,padding:'4px 10px' }}>
              Docs →
            </a>
          </div>

          {provider.fields.map(f=>(
            <div key={f.key} style={{ marginBottom:12 }}>
              <div style={{ fontSize:12,color:T.sub,marginBottom:5,fontWeight:600 }}>{f.label}</div>
              <Input
                placeholder={f.key.toUpperCase()}
                value={getVal(f.key)}
                onChange={e=>setVal(f.key,e.target.value)}
                style={{ borderColor:provider.color+'33' }}
              />
              <div style={{ fontSize:10,color:T.sub,marginTop:3 }}>💡 {f.hint}</div>
            </div>
          ))}

          {/* Split payment info box */}
          {provider.splitNote && (
            <div style={{ background:provider.color+'10',border:`1px solid ${provider.color}25`,borderRadius:10,padding:12,marginBottom:14 }}>
              <div style={{ fontSize:11,color:provider.color,fontWeight:700,marginBottom:4 }}>
                ⚡ Split Payment (kelajakda)
              </div>
              <div style={{ fontSize:11,color:T.sub,lineHeight:1.6 }}>{provider.splitNote}</div>
              {/* ============================================
                TODO: SPLIT_PAYMENT_INTEGRATION
                Bu yerga backend dasturchisi split payment
                API kalitlari va webhook URL larini ulaydi.
                
                Click uchun: https://docs.click.uz/split
                Payme uchun: https://developer.help.paycom.uz/split
                ============================================ */}
              <div style={{ marginTop:8,background:T.input,borderRadius:8,padding:'6px 10px',fontSize:10,color:T.sub,fontFamily:'monospace' }}>
                {'// TODO: SPLIT_PAYMENT_HOOK\n// split_token: "..."'}
              </div>
            </div>
          )}

          {saved[active]
            ? <div style={{ textAlign:'center',padding:'12px 0',color:'#4ECDC4',fontWeight:700 }}>✅ Saqlandi!</div>
            : <Btn full style={{ background:`linear-gradient(135deg,${provider.color},${provider.color}aa)`,boxShadow:`0 0 20px ${provider.color}30`,color:'#0a1000' }} onClick={handleSave}>
                {provider.name} ni ulash
              </Btn>
          }
        </Card>
      )}

      {/* Test mode */}
      <Card>
        <div style={{ fontWeight:700,fontSize:14,marginBottom:10 }}>Test rejimi</div>
        <div style={{ color:T.sub,fontSize:13,marginBottom:12,lineHeight:1.5 }}>
          To'lovlarni haqiqiy pulga bog'lamasdan sinab ko'rish uchun test rejimini yoqing.
        </div>
        <div style={{ display:'flex',gap:8 }}>
          <Btn sm>Test rejim: Yoqish</Btn>
          <Btn sm sec>Prod rejim</Btn>
        </div>
      </Card>
    </div>
  );
}
