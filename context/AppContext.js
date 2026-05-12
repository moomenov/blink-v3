import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme]           = useState('dark'); // 'dark' | 'light'
  const [user, setUser]             = useState(null);
  const [notifications, setNotifications] = useState([
    { id:1, text:"Pro Arena broningiz tasdiqlandi", time:"2 daqiqa oldin", read:false },
    { id:2, text:"Jamoangiz o'yin natijasi: G'alaba 3-1", time:"1 soat oldin", read:false },
    { id:3, text:"Cashback: +1,500 so'm qo'shildi", time:"Kecha", read:true },
  ]);
  const [bookings, setBookings]     = useState([
    { id:1, arenaId:1, arenaName:'Pro Sport Arena',   sport:'Futbol',    date:'15 May', time:'14:00–16:00', status:'confirmed', paid:300000, cashback:3000 },
    { id:2, arenaId:2, arenaName:'Grand Tennis Club', sport:'Tennis',    date:'10 May', time:'10:00–11:00', status:'done',      paid:120000, cashback:1200 },
    { id:3, arenaId:3, arenaName:'Basket Park',       sport:'Basketbol', date:'8 May',  time:'16:00–17:00', status:'cancelled', paid:0,      cashback:0    },
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id:1, type:'click',  name:'Click',  cardNum:'**** 4521', default:true  },
    { id:2, type:'payme',  name:'Payme',  cardNum:'**** 8834', default:false },
  ]);
  const [cashback, setCashback]     = useState(3700);
  const [ownerBalance, setOwnerBalance] = useState(4800000);
  const [pendingBalance, setPendingBalance] = useState(620000); // ertaga tushadi

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read:true })));

  const addBooking = (booking) => setBookings(prev => [booking, ...prev]);

  // Owner: pul chiqarish
  const withdrawFunds = (amount) => {
    if (amount > ownerBalance) return false;
    setOwnerBalance(prev => prev - amount);
    return true;
  };

  // Ertangi to'lov confirm (pending → balance)
  const confirmPendingPayment = () => {
    setOwnerBalance(prev => prev + pendingBalance);
    setPendingBalance(0);
  };

  const T = theme === 'dark' ? {
    bg:      '#060a00',
    card:    '#0d1200',
    border:  '#1a2200',
    text:    '#f0f0f0',
    sub:     '#555',
    input:   '#0a0f00',
    navBg:   'rgba(6,10,0,0.97)',
    sidebar: '#070b00',
    accent:  '#C8FF00',
  } : {
    bg:      '#f5f5f0',
    card:    '#ffffff',
    border:  '#e0e8d0',
    text:    '#0a1200',
    sub:     '#888',
    input:   '#f0f5e8',
    navBg:   'rgba(245,245,240,0.97)',
    sidebar: '#eef5e0',
    accent:  '#5a9900',
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme, T,
      user, setUser,
      notifications, setNotifications, markAllRead,
      bookings, addBooking,
      paymentMethods, setPaymentMethods,
      cashback, setCashback,
      ownerBalance, setOwnerBalance, withdrawFunds,
      pendingBalance, setPendingBalance, confirmPendingPayment,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
