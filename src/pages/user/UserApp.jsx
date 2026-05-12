import React, { useState } from 'react';
import BottomNav   from '../../components/BottomNav';
import Home        from './Home';
import Arenas      from './Arenas';
import ArenaDetail from './ArenaDetail';
import Booking     from './Booking';
import Payment     from './Payment';
import BookingList from './BookingList';
import Teams, { TeamDetail } from './Teams';
import Profile     from './Profile';

const NO_NAV = ['arena','booking','payment','team_detail'];

export default function UserApp({ onLogout }) {
  const [screen,       setScreen]       = useState('home');
  const [selectedArena,setSelectedArena] = useState(null);
  const [selectedTeam, setSelectedTeam]  = useState(null);

  const nav = (s) => setScreen(s);

  const renderScreen = () => {
    switch(screen) {
      case 'home':        return <Home        nav={nav} setArena={setSelectedArena}/>;
      case 'arenas':      return <Arenas      nav={nav} setArena={setSelectedArena}/>;
      case 'arena':       return <ArenaDetail arena={selectedArena} nav={nav}/>;
      case 'booking':     return <Booking     arena={selectedArena} nav={nav}/>;
      case 'payment':     return <Payment     arena={selectedArena} nav={nav}/>;
      case 'booking_list':return <BookingList/>;
      case 'teams':       return <Teams       nav={nav} setTeam={setSelectedTeam}/>;
      case 'team_detail': return <TeamDetail  team={selectedTeam}   nav={nav}/>;
      case 'booking':     return <BookingList/>;
      case 'profile':     return <Profile     onLogout={onLogout}/>;
      case 'notifications':return <Profile    onLogout={onLogout}/>;
      default:            return <Home        nav={nav} setArena={setSelectedArena}/>;
    }
  };

  const navScreen = screen === 'booking_list' ? 'booking'
                  : screen === 'team_detail'  ? 'teams'
                  : screen;

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", maxWidth:480, margin:'0 auto', minHeight:'100vh' }}>
      {renderScreen()}
      {!NO_NAV.includes(screen) && <BottomNav screen={navScreen} setScreen={setScreen}/>}
    </div>
  );
}
