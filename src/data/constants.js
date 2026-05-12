export const SPORTS = [
  { id: 'football',   name: 'Futbol',    icon: '⚽', color: '#C8FF00' },
  { id: 'tennis',     name: 'Tennis',    icon: '🎾', color: '#FFD700' },
  { id: 'basketball', name: 'Basketbol', icon: '🏀', color: '#FF6B35' },
  { id: 'volleyball', name: 'Voleybol',  icon: '🏐', color: '#00D4FF' },
  { id: 'hockey',     name: 'Xokkey',    icon: '🏒', color: '#FF4785' },
];

export const ARENAS = [
  { id:1, name:'Pro Sport Arena',   sport:'Futbol',    location:'Chilonzor',    price:150000, rating:4.9, reviews:234, distance:'1.2 km', available:true,  hot:true  },
  { id:2, name:'Grand Tennis Club', sport:'Tennis',    location:'Yunusobod',    price:120000, rating:4.7, reviews:189, distance:'2.4 km', available:true,  hot:false },
  { id:3, name:'Basket Park',       sport:'Basketbol', location:"Mirzo Ulug'bek",price:100000,rating:4.8, reviews:312, distance:'0.8 km', available:false, hot:true  },
  { id:4, name:'Volley Arena',      sport:'Voleybol',  location:'Shayxontohur', price:90000,  rating:4.6, reviews:98,  distance:'3.1 km', available:true,  hot:false },
];

export const TEAMS = [
  { id:1, name:'Toshkent Tigers',  sport:'Futbol',    members:8,  max:11, rating:2840, wins:24, losses:6,  leader:'Jasur T.',   badge:'🔥' },
  { id:2, name:'Ace Smashers',     sport:'Tennis',    members:4,  max:4,  rating:1950, wins:12, losses:8,  leader:'Dilnoza K.', badge:'⭐' },
  { id:3, name:'Slam Dunkers',     sport:'Basketbol', members:5,  max:5,  rating:2210, wins:18, losses:4,  leader:'Bobur M.',   badge:'👑' },
  { id:4, name:'Net Crushers',     sport:'Voleybol',  members:6,  max:6,  rating:1780, wins:9,  losses:11, leader:'Sarvar A.',  badge:'⚡' },
];

export const PLAYERS = [
  { id:1, name:'Jasur T.',   sport:'Futbol',    level:"O'rta",        age:24, distance:'0.5km', online:true,  rating:1840, team:'Toshkent Tigers' },
  { id:2, name:'Dilnoza K.', sport:'Tennis',    level:'Professional', age:22, distance:'1.2km', online:true,  rating:2210, team:'Ace Smashers'    },
  { id:3, name:'Bobur M.',   sport:'Basketbol', level:"Boshlang'ich", age:19, distance:'2.0km', online:false, rating:980,  team:null               },
  { id:4, name:'Sarvar A.',  sport:'Futbol',    level:"O'rta",        age:27, distance:'1.8km', online:true,  rating:1650, team:'Toshkent Tigers' },
  { id:5, name:'Malika R.',  sport:'Voleybol',  level:'Professional', age:23, distance:'0.9km', online:false, rating:2890, team:'Net Crushers'    },
];

export const CHAT_MESSAGES = [
  { id:1, user:'Jasur T.',  text:"Ertaga 14:00 da Pro Arena band qildim!",        time:'09:12', mine:false },
  { id:2, user:'Sarvar A.', text:"Zo'r! Men ham boraman 💪",                       time:'09:14', mine:false },
  { id:3, user:'Jasur T.',  text:'Hamma tayyor bo\'lsin, bu safar g\'alaba bizniki',time:'09:15', mine:false },
];

export const CRM_BOOKINGS = [
  { id:1, user:'Jasur Toshmatov',  phone:'+998 90 123 45 67', sport:'Futbol',    field:'1-maydon', date:'Bugun',  time:'14:00–16:00', amount:300000, status:'active'    },
  { id:2, user:'Malika Rahimova',  phone:'+998 91 234 56 78', sport:'Tennis',    field:'2-maydon', date:'Bugun',  time:'17:00–18:00', amount:120000, status:'pending'   },
  { id:3, user:'Bobur Mirzayev',   phone:'+998 93 345 67 89', sport:'Futbol',    field:'1-maydon', date:'Ertaga', time:'10:00–12:00', amount:300000, status:'active'    },
  { id:4, user:'Sardor Alijev',    phone:'+998 97 456 78 90', sport:'Basketbol', field:'3-maydon', date:'16 May', time:'15:00–16:00', amount:100000, status:'cancelled' },
  { id:5, user:'Zulfiya Hasanova', phone:'+998 99 567 89 01', sport:'Voleybol',  field:'4-maydon', date:'17 May', time:'09:00–11:00', amount:180000, status:'active'    },
];

export const CRM_FIELDS = [
  { id:1, name:'1-maydon (Futbol)',    size:'11x7',  surface:"Sun'iy o't", lighting:true,  price:150000, status:'active',      today:3 },
  { id:2, name:'2-maydon (Tennis)',    size:'23x11', surface:'Hard court', lighting:true,  price:120000, status:'active',      today:2 },
  { id:3, name:'3-maydon (Basketbol)', size:'28x15', surface:'Parket',     lighting:false, price:100000, status:'maintenance', today:0 },
  { id:4, name:'4-maydon (Voleybol)',  size:'18x9',  surface:"Sun'iy o't", lighting:true,  price:90000,  status:'active',      today:1 },
];

export const WEEKLY_REVENUE = [320000,480000,290000,560000,410000,680000,540000];
export const WEEKLY_DAYS    = ['Du','Se','Ch','Pa','Ju','Sh','Ya'];
export const TIME_SLOTS     = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
export const TAKEN_SLOTS    = ['10:00','11:00','15:00','16:00'];
export const DAYS_UZ        = ['Ya','Du','Se','Ch','Pa','Ju','Sh'];
export const MONTHS_UZ      = ['Yan','Fev','Mar','Apr','May','Iyn','Iyl','Avg','Sen','Okt','Noy','Dek'];
export const MONTHS_FULL    = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];

export const STATUS_COLORS = { active:'#C8FF00', pending:'#FFD700', done:'#4ECDC4', cancelled:'#ff4444' };
export const STATUS_LABELS = { active:'Faol', pending:'Kutilmoqda', done:'Bajarildi', cancelled:'Bekor' };
export const SPORT_EMOJI   = { Futbol:'⚽', Tennis:'🎾', Basketbol:'🏀', Voleybol:'🏐', Xokkey:'🏒' };
export const SPORT_COLOR   = { Futbol:'#C8FF00', Tennis:'#FFD700', Basketbol:'#FF6B35', Voleybol:'#00D4FF', Xokkey:'#FF4785' };
export const LEVEL_COLORS  = { "Boshlang'ich":'#4ECDC4', "O'rta":'#FFD700', 'Professional':'#C8FF00' };

export const fp = (p) => p.toLocaleString() + " so'm";
