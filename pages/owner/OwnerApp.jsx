import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Dashboard    from './Dashboard';
import CRMBookings  from './CRMBookings';
import Fields       from './Fields';
import Analytics    from './Analytics';
import Withdraw     from './Withdraw';
import PaymentSetup from './PaymentSetup';
import Settings     from './Settings';

const NAV = [
  { id:'dashboard',     icon:'⊞',  label:'Dashboard'    },
  { id:'bookings',      icon:'📋', label:'Bronlar'       },
  { id:'fields',        icon:'🏟️',label:'Maydonlar'     },
  { id:'analytics',     icon:'📊', label:'Analitika'     },
  { id:'withdraw',      icon:'💸', label:'Pul chiqarish' },
  { id:'payment_setup', icon:'💳', label:"To'lov sozlama"},
  { id:'settings',      icon:'⚙️', label:'Sozlamalar'   },
];

function Sidebar({ screen, setScreen, onLogout, T }) {
  return (
    <div style={{ width:210,background:T.sidebar,borderRight:`1px solid ${T.border}`,minHeight:'100vh',display:'flex',flexDirection:'column',padding:'24px 0',flexShrink:0 }}>
      <div style={{ padding:'0 18px 24px' }}>
        <div style={{ fontSize:20,fontWeight:900,background:'linear-gradient(135deg,#C8FF00,#8FBF00)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>BLINK</div>
        <div style={{ color:'#A78BFA',fontSize:9,letterSpacing:2,marginTop:1,fontWeight:700 }}>OWNER CRM</div>
      </div>
      <div style={{ padding:'0 10px',flex:1,overflowY:'auto' }}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setScreen(n.id)} style={{ width:'100%',display:'flex',alignItems:'center',gap:9,padding:'10px 11px',background:screen===n.id?'linear-gradient(135deg,#A78BFA18,#A78BFA08)':'none',border:screen===n.id?'1px solid #A78BFA25':'1px solid transparent',borderRadius:11,color:screen===n.id?'#A78BFA':T.sub,fontSize:12,fontWeight:screen===n.id?700:500,cursor:'pointer',fontFamily:'inherit',marginBottom:3,textAlign:'left' }}>
            <span style={{ fontSize:14 }}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
      <div style={{ padding:'0 10px' }}>
        <div style={{ background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:11,marginBottom:10 }}>
          <div style={{ fontSize:10,color:T.sub,marginBottom:3 }}>Egasi</div>
          <div style={{ fontWeight:700,fontSize:12,color:T.text }}>Alisher Karimov</div>
          <div style={{ color:T.sub,fontSize:10 }}>Pro Sport Arena</div>
        </div>
        <button onClick={onLogout} style={{ width:'100%',background:'#1a0000',border:'1px solid #ff444020',borderRadius:9,padding:9,color:'#ff6666',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit' }}>← Rolni o'zgartirish</button>
      </div>
    </div>
  );
}

function MobileNav({ screen, setScreen, T }) {
  const visible = NAV.slice(0, 5);
  return (
    <div style={{ position:'fixed',bottom:0,left:0,right:0,background:T.navBg,backdropFilter:'blur(20px)',borderTop:`1px solid ${T.border}`,display:'flex',padding:'8px 0 20px',zIndex:100 }}>
      {visible.map(t=>(
        <button key={t.id} onClick={()=>setScreen(t.id)} style={{ flex:1,background:'none',border:'none',color:screen===t.id?'#A78BFA':T.sub,fontFamily:'inherit',display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'3px 0' }}>
          <span style={{ fontSize:16,filter:screen===t.id?'drop-shadow(0 0 5px #A78BFA)':'none' }}>{t.icon}</span>
          <span style={{ fontSize:8,fontWeight:600 }}>{t.label.slice(0,6)}</span>
          {screen===t.id&&<div style={{ width:3,height:3,borderRadius:'50%',background:'#A78BFA' }}/>}
        </button>
      ))}
    </div>
  );
}

export default function OwnerApp({ onLogout }) {
  const { T } = useApp();
  const [screen, setScreen] = useState('dashboard');
  const [isMobile] = useState(() => window.innerWidth < 768);

  const renderScreen = () => {
    switch(screen) {
      case 'dashboard':    return <Dashboard   setScreen={setScreen}/>;
      case 'bookings':     return <CRMBookings/>;
      case 'fields':       return <Fields/>;
      case 'analytics':    return <Analytics/>;
      case 'withdraw':     return <Withdraw/>;
      case 'payment_setup':return <PaymentSetup/>;
      case 'settings':     return <Settings onLogout={onLogout}/>;
      default:             return <Dashboard   setScreen={setScreen}/>;
    }
  };

  return (
    <div style={{ display:'flex',minHeight:'100vh',background:T.bg,color:T.text,fontFamily:"'Outfit',sans-serif" }}>
      {!isMobile && <Sidebar screen={screen} setScreen={setScreen} onLogout={onLogout} T={T}/>}
      <div style={{ flex:1,overflowY:'auto',paddingBottom:isMobile?90:0 }}>
        {isMobile && (
          <div style={{ padding:'16px 16px 0',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <div>
              <div style={{ fontSize:18,fontWeight:900,background:'linear-gradient(135deg,#C8FF00,#8FBF00)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>BLINK</div>
              <div style={{ color:'#A78BFA',fontSize:9,letterSpacing:2,fontWeight:700 }}>OWNER CRM</div>
            </div>
            <button onClick={onLogout} style={{ background:'#1a0000',border:'1px solid #ff444020',borderRadius:9,padding:'7px 12px',color:'#ff6666',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit' }}>← Chiqish</button>
          </div>
        )}
        {renderScreen()}
      </div>
      {isMobile && <MobileNav screen={screen} setScreen={setScreen} T={T}/>}
    </div>
  );
}
