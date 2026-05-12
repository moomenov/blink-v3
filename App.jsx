import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import RoleSelect from './pages/RoleSelect';
import Register   from './pages/Register';
import UserApp    from './pages/user/UserApp';
import OwnerApp   from './pages/owner/OwnerApp';

function AppContent() {
  const { T } = useApp();
  const [role,  setRole]  = useState(null); // null | 'user' | 'owner'
  const [screen,setScreen] = useState('role'); // 'role' | 'register' | 'app'

  return (
    <div style={{ background:T.bg, minHeight:'100vh', fontFamily:"'Outfit',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#1a2200;border-radius:99px;}
        button{transition:all 0.15s;cursor:pointer;}
        button:active{transform:scale(0.97);}
        input,select{outline:none;}
        input::placeholder{color:#555;}
      `}</style>

      {screen==='role' && (
        <RoleSelect
          onSelect={(r) => {
            if (r==='register') { setScreen('register'); return; }
            setRole(r);
            setScreen('app');
          }}
        />
      )}

      {screen==='register' && (
        <Register
          onBack={()=>setScreen('role')}
          onDone={(r)=>{ setRole(r); setScreen('app'); }}
        />
      )}

      {screen==='app' && role==='user'  && (
        <UserApp  onLogout={()=>{ setRole(null); setScreen('role'); }}/>
      )}
      {screen==='app' && role==='owner' && (
        <OwnerApp onLogout={()=>{ setRole(null); setScreen('role'); }}/>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent/>
    </AppProvider>
  );
}
