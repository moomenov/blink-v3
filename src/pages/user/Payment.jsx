import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Card, BackBtn } from '../../components/UI';
import { fp } from '../../data/constants';

const METHODS = [
  { id:'click',  name:'Click',  color:'#00A3FF', icon:'💳', deeplink:'https://my.click.uz/services/pay' },
  { id:'payme',  name:'Payme',  color:'#00CCAA', icon:'💰', deeplink:'https://checkout.paycom.uz'       },
  { id:'uzcard', name:'Uzcard', color:'#FF6B35', icon:'🏦', deeplink:null },
  { id:'humo',   name:'Humo',   color:'#A78BFA', icon:'🎴', deeplink:null },
];

export default function Payment({ arena, nav, addNewBooking }) {
  const { T, cashback, setCashback, addBooking } = useApp();
  const [sel,      setSel]      = useState('click');
  const [step,     setStep]     = useState('choose'); // choose | redirecting | confirm | done
  const [useCash,  setUseCash]  = useState(false);
  const amount = 300000;
  const cashDiscount = useCash ? Math.min(cashback, amount * 0.1) : 0;
  const finalAmount  = amount - cashDiscount;

  const handlePay = () => {
    const method = METHODS.find(m=>m.id===sel);
    if (method?.deeplink) {
      setStep('redirecting');
      // Real integrasiyada bu yerda Click/Payme SDK yoki deeplink ishlaydi
      // TODO: PAYMENT_GATEWAY_HOOK
      // window.open(method.deeplink + `?amount=${finalAmount}&merchant_id=MERCHANT_ID`, '_blank');
      setTimeout(() => setStep('confirm'), 2000);
    } else {
      setStep('confirm');
    }
  };

  const handleConfirm = () => {
    // Cashback sarflansa kamayt
    if (useCash) setCashback(c => c - cashDiscount);
    // Yangi cashback qo'sh
    setCashback(c => c + Math.floor(finalAmount * 0.01));
    // Booking qo'sh
    addBooking({
      id: Date.now(),
      arenaId: arena?.id,
      arenaName: arena?.name || 'Pro Sport Arena',
      sport: arena?.sport || 'Futbol',
      date: '15 May',
      time: '14:00–16:00',
      status: 'confirmed',
      paid: finalAmount,
      cashback: Math.floor(finalAmount * 0.01),
    });
    setStep('done');
  };

  // ── DONE screen ──
  if (step === 'done') return (
    <div style={{ minHeight:'100vh',background:T.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center',color:T.text }}>
      <div style={{ fontSize:70,marginBottom:16,filter:`drop-shadow(0 0 24px ${T.accent})` }}>✅</div>
      <div style={{ fontSize:24,fontWeight:900,marginBottom:6 }}>Maydon band qilindi!</div>
      <div style={{ color:T.sub,fontSize:14,marginBottom:4 }}>{arena?.name}</div>
      <div style={{ color:T.sub,fontSize:13,marginBottom:16 }}>15 May · 14:00–16:00</div>
      <div style={{ background:T.accent+'18',border:`1px solid ${T.accent}33`,borderRadius:14,padding:'14px 20px',marginBottom:28,width:'100%' }}>
        <div style={{ color:T.accent,fontWeight:700,fontSize:14 }}>💎 +{fp(Math.floor(finalAmount*0.01))} cashback qo'shildi!</div>
      </div>
      <Btn full onClick={()=>nav('booking_list')}>Bronlarimga →</Btn>
      <Btn full sec style={{ marginTop:10 }} onClick={()=>nav('home')}>Bosh sahifaga</Btn>
    </div>
  );

  // ── REDIRECTING screen ──
  if (step === 'redirecting') {
    const m = METHODS.find(x=>x.id===sel);
    return (
      <div style={{ minHeight:'100vh',background:T.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center',color:T.text }}>
        <div style={{ fontSize:60,marginBottom:20 }}>{m.icon}</div>
        <div style={{ fontSize:20,fontWeight:900,marginBottom:8,color:m.color }}>{m.name} orqali to'lov</div>
        <div style={{ color:T.sub,fontSize:14,marginBottom:24 }}>{fp(finalAmount)} to'lanmoqda...</div>
        <div style={{ display:'flex',gap:8,justifyContent:'center' }}>
          {[0,1,2].map(i=>(
            <div key={i} style={{ width:10,height:10,borderRadius:'50%',background:m.color,opacity:0.4,animation:'none' }}/>
          ))}
        </div>
        <div style={{ color:T.sub,fontSize:12,marginTop:20 }}>
          {/* Haqiqiy integrasiyada: {m.name} ilovasiga yo'naltirilmoqda */}
          To'lov tasdiqlanmoqda...
        </div>
        <Btn sm sec style={{ marginTop:24 }} onClick={()=>setStep('confirm')}>
          Tasdiqlash (test)
        </Btn>
      </div>
    );
  }

  // ── CONFIRM screen ──
  if (step === 'confirm') return (
    <div style={{ minHeight:'100vh',background:T.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:32,textAlign:'center',color:T.text }}>
      <div style={{ fontSize:60,marginBottom:16 }}>🔐</div>
      <div style={{ fontSize:20,fontWeight:900,marginBottom:8 }}>To'lov tasdiqlandi</div>
      <div style={{ color:T.sub,fontSize:14,marginBottom:24 }}>{fp(finalAmount)} muvaffaqiyatli o'tkazildi</div>
      <Card style={{ width:'100%',marginBottom:24,textAlign:'left' }}>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
          <span style={{ color:T.sub,fontSize:13 }}>Arena:</span>
          <span style={{ fontWeight:700,fontSize:13 }}>{arena?.name}</span>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
          <span style={{ color:T.sub,fontSize:13 }}>Sana:</span>
          <span style={{ fontWeight:700,fontSize:13 }}>15 May, 14:00–16:00</span>
        </div>
        <div style={{ display:'flex',justifyContent:'space-between' }}>
          <span style={{ color:T.sub,fontSize:13 }}>To'lov:</span>
          <span style={{ fontWeight:700,fontSize:13,color:T.accent }}>{fp(finalAmount)}</span>
        </div>
      </Card>
      <Btn full onClick={handleConfirm}>Maydonni tasdiqlash →</Btn>
    </div>
  );

  // ── CHOOSE screen ──
  return (
    <div style={{ paddingBottom:110,background:T.bg,minHeight:'100vh',color:T.text }}>
      <div style={{ padding:'52px 20px 14px',display:'flex',alignItems:'center',gap:12 }}>
        <BackBtn onClick={()=>nav('booking')}/>
        <div style={{ fontSize:18,fontWeight:900 }}>To'lov</div>
      </div>

      <div style={{ padding:'0 20px' }}>
        {/* Summary */}
        <Card style={{ marginBottom:16 }}>
          <div style={{ color:T.sub,fontSize:12,marginBottom:7 }}>Bron tafsilotlari</div>
          <div style={{ fontWeight:700,marginBottom:3 }}>{arena?.name||'Pro Sport Arena'}</div>
          <div style={{ color:T.sub,fontSize:12,marginBottom:14 }}>15 May · 14:00–16:00 · 2 soat</div>
          <div style={{ borderTop:`1px solid ${T.border}`,paddingTop:10 }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
              <span style={{ color:T.sub,fontSize:13 }}>Maydon narxi:</span>
              <span style={{ fontSize:13 }}>{fp(amount)}</span>
            </div>
            {useCash && cashDiscount>0 && (
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:8 }}>
                <span style={{ color:'#4ECDC4',fontSize:13 }}>Cashback chegirma:</span>
                <span style={{ color:'#4ECDC4',fontSize:13 }}>-{fp(cashDiscount)}</span>
              </div>
            )}
            <div style={{ display:'flex',justifyContent:'space-between' }}>
              <span style={{ color:T.sub,fontSize:13 }}>Jami:</span>
              <span style={{ color:T.accent,fontWeight:900,fontSize:17 }}>{fp(finalAmount)}</span>
            </div>
          </div>
        </Card>

        {/* Cashback toggle */}
        <Card style={{ marginBottom:16,border:`1px solid #4ECDC444` }}>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:700,fontSize:13,color:'#4ECDC4' }}>💰 Cashback ishlatish</div>
              <div style={{ color:T.sub,fontSize:11,marginTop:2 }}>Balansda: {fp(cashback)}</div>
            </div>
            <button onClick={()=>setUseCash(!useCash)} style={{ background:useCash?'#4ECDC4':'transparent',border:'2px solid #4ECDC4',borderRadius:20,width:44,height:24,cursor:'pointer',transition:'all 0.2s',position:'relative' }}>
              <div style={{ width:16,height:16,background:useCash?'#0a1000':'#4ECDC4',borderRadius:'50%',position:'absolute',top:2,transition:'all 0.2s',left:useCash?24:2 }}/>
            </button>
          </div>
        </Card>

        {/* Payment methods */}
        <div style={{ fontWeight:700,fontSize:14,marginBottom:12 }}>To'lov usulini tanlang</div>
        {METHODS.map(m=>(
          <div key={m.id} onClick={()=>setSel(m.id)} style={{ display:'flex',alignItems:'center',gap:12,background:sel===m.id?T.accent+'15':T.card,border:`1.5px solid ${sel===m.id?m.color+'55':T.border}`,borderRadius:14,padding:14,marginBottom:8,cursor:'pointer' }}>
            <span style={{ fontSize:22 }}>{m.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700,color:sel===m.id?m.color:T.text }}>{m.name}</div>
              {m.deeplink && <div style={{ fontSize:10,color:T.sub,marginTop:2 }}>Ilovaga yo'naltiriladi</div>}
            </div>
            {(m.id==='click'||m.id==='payme')&&(
              <span style={{ fontSize:9,color:m.color,background:m.color+'15',border:`1px solid ${m.color}30`,borderRadius:5,padding:'2px 6px',fontWeight:700 }}>
                {/* TODO: SPLIT_PAYMENT_HOOK */}
                Split tayyor
              </span>
            )}
            <div style={{ width:20,height:20,borderRadius:'50%',border:`2px solid ${sel===m.id?m.color:'#555'}`,display:'flex',alignItems:'center',justifyContent:'center' }}>
              {sel===m.id&&<div style={{ width:9,height:9,borderRadius:'50%',background:m.color }}/>}
            </div>
          </div>
        ))}

        <div style={{ background:T.accent+'10',border:`1px solid ${T.accent}20`,borderRadius:12,padding:12,marginTop:6 }}>
          <span style={{ color:T.accent,fontSize:12 }}>💎 Bu brondan +{fp(Math.floor(finalAmount*0.01))} cashback olasiz!</span>
        </div>
      </div>

      <div style={{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:T.navBg,borderTop:`1px solid ${T.border}`,padding:'14px 20px 28px' }}>
        <Btn full onClick={handlePay}>{fp(finalAmount)} to'lash</Btn>
      </div>
    </div>
  );
}
