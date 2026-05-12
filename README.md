# BLINK Sports — v3

Sport maydonlarni bron qilish platformasi.

## Ishga tushirish

```bash
npm install
npm start
```

## Tuzilma

```
src/
├── App.jsx                        # Root
├── context/AppContext.js          # Global state (tema, auth, bronlar, balans)
├── data/constants.js              # Barcha ma'lumotlar
├── components/
│   ├── UI.jsx                     # Btn, Card, Input, Modal, ThemeToggle...
│   ├── BottomNav.jsx              # Foydalanuvchi navigatsiya
│   └── ArenaCard.jsx              # Arena kartasi
├── pages/
│   ├── RoleSelect.jsx             # Rol tanlash
│   ├── Register.jsx               # Ro'yxatdan o'tish
│   ├── user/
│   │   ├── UserApp.jsx            # Router
│   │   ├── Home.jsx               # Bosh sahifa
│   │   ├── Arenas.jsx             # Arenalar ro'yxati
│   │   ├── ArenaDetail.jsx        # Arena batafsil
│   │   ├── Booking.jsx            # Bron qilish
│   │   ├── Payment.jsx            # To'lov (Click/Payme yo'naltirish)
│   │   ├── BookingList.jsx        # Bronlarim
│   │   ├── Teams.jsx              # Jamoalar + chat + reyting
│   │   └── Profile.jsx            # Profil (barcha funksiyalar)
│   └── owner/
│       ├── OwnerApp.jsx           # CRM Router (desktop sidebar + mobil nav)
│       ├── Dashboard.jsx          # Asosiy ko'rsatkichlar
│       ├── CRMBookings.jsx        # Bronlar CRM
│       ├── Fields.jsx             # Maydonlar boshqaruvi
│       ├── Analytics.jsx          # Grafiklar
│       ├── Withdraw.jsx           # Pul chiqarish (bank)
│       ├── PaymentSetup.jsx       # Click/Payme API sozlama
│       └── Settings.jsx           # Arena sozlamalari
```

## Muhim joylar (backend uchun)

### Split Payment
`src/pages/owner/PaymentSetup.jsx` ichida:
```js
// TODO: CLICK_SPLIT_PAYMENT_HOOK
// TODO: PAYME_SPLIT_PAYMENT_HOOK
```

### To'lov yo'naltirish
`src/pages/user/Payment.jsx` ichida:
```js
// TODO: PAYMENT_GATEWAY_HOOK
// window.open(method.deeplink + `?amount=${finalAmount}&merchant_id=MERCHANT_ID`, '_blank');
```

## Deploy

```bash
# Vercel (frontend)
npx vercel --prod

# .env fayl (tokenlarni shu yerga yozing, GitHubga yuklamang!)
REACT_APP_CLICK_MERCHANT_ID=...
REACT_APP_PAYME_MERCHANT_ID=...
```
