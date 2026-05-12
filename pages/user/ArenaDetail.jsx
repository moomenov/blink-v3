import React from 'react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Card, BackBtn } from '../../components/UI';
import { SPORT_EMOJI, fp } from '../../data/constants';

export default function ArenaDetail({ arena, nav }) {
  const { T } = useApp();
  if (!arena) return null;

  return (
    <div style={{ paddingBottom:100, background:T.bg, minHeight:'100vh', color:T.text }}>
      <div style={{ height:220,background:'linear-gradient(135deg,#0a1a00,#1a2800)',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',fontSize:80 }}>
        {SPORT_EMOJI[arena.sport]||'🏟️'}
        <div style={{ position:'absolute',top:52,left:18 }}><BackBtn onClick={()=>nav('arenas')}/></div>
        <button style={{ position:'absolute',top:52,right:18,background:'#0008',border:'none',color:'#fff',fontSize:20,cursor:'pointer',width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'inherit' }}>♡</button>
      </div>

      <div style={{ padding:20 }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12 }}>
          <div>
            <div style={{ fontSize:22,fontWeight:900,marginBottom:3 }}>{arena.name}</div>
            <div style={{ color:T.sub,fontSize:12 }}>📍 {arena.location} · {arena.distance}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ color:T.accent,fontWeight:900,fontSize:18 }}>{fp(arena.price)}</div>
            <div style={{ color:T.sub,fontSize:10 }}>/soat</div>
          </div>
        </div>

        <div style={{ display:'flex',gap:7,marginBottom:18,flexWrap:'wrap' }}>
          <Badge>{arena.sport}</Badge>
          <Badge color="#FFD700">★ {arena.rating} ({arena.reviews})</Badge>
          <Badge color={arena.available?'#C8FF00':'#ff4444'}>{arena.available?"Bo'sh":'Band'}</Badge>
        </div>

        <Card style={{ marginBottom:14 }}>
          <div style={{ fontWeight:700,marginBottom:10,fontSize:13 }}>Imkoniyatlar</div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:7 }}>
            {['🚿 Dush xona','🅿️ Parking','💡 Yoritish','🏆 Tribuna'].map(f=>(
              <div key={f} style={{ color:T.sub,fontSize:12 }}>{f}</div>
            ))}
          </div>
        </Card>

        <Card style={{ marginBottom:14 }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:8 }}>Ish vaqti</div>
          <div style={{ color:T.accent,fontSize:16,fontWeight:700 }}>08:00 – 23:00</div>
          <div style={{ color:T.sub,fontSize:11,marginTop:3 }}>Har kuni</div>
        </Card>

        {/* Split payment placeholder — backend uchun */}
        <Card style={{ marginBottom:20, border:`1px solid ${T.accent}25` }}>
          <div style={{ fontWeight:700,fontSize:13,marginBottom:8,color:T.accent }}>💳 To'lov usullari</div>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10 }}>
            {[
              { name:'Click', color:'#00A3FF',icon:'💳' },
              { name:'Payme', color:'#00CCAA',icon:'💰' },
              { name:'Uzcard',color:'#FF6B35',icon:'🏦' },
              { name:'Humo',  color:'#A78BFA',icon:'🎴' },
            ].map(m=>(
              <div key={m.name} style={{ background:T.input,borderRadius:10,padding:'10px 12px',border:`1px solid ${m.color}22` }}>
                <div style={{ fontSize:18,marginBottom:2 }}>{m.icon}</div>
                <div style={{ fontWeight:700,fontSize:12,color:m.color }}>{m.name}</div>
                {(m.name==='Click'||m.name==='Payme') && (
                  <div style={{ fontSize:9,color:T.sub,marginTop:2 }}>
                    {/* TODO: SPLIT_PAYMENT_HOOK — backend ulanganda bu yerda Split badge chiqadi */}
                    Tez orada: Split
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ background:T.accent+'10',borderRadius:8,padding:'8px 12px',fontSize:11,color:T.accent }}>
            ⚡ Maydonni band qilib, o'yindan avval jamoangiz bilan pul ajratasiz
          </div>
        </Card>

        <Btn full onClick={()=>nav('booking')}>Bron qilish →</Btn>
      </div>
    </div>
  );
}
