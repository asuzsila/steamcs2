const SteamUser = require('steam-user');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('CS2 Booster 24/7 ishlamoqda!'));
app.listen(process.env.PORT || 3000, () => {
  console.log('Web-server ishga tushdi');
});

const client = new SteamUser();

// Agar REFRESH_TOKEN kiritilgan bo'lsa, kod so'ramasdan kiradi
const logOnOptions = process.env.REFRESH_TOKEN
  ? { refreshToken: process.env.REFRESH_TOKEN }
  : {
      accountName: process.env.STEAM_USER,
      password: process.env.STEAM_PASSWORD
    };

client.logOn(logOnOptions);

// Birinchi marta kirganda tokenni konsolga chiqaradi (uni nusxalab olasiz)
client.on('refreshToken', (token) => {
  console.log('YANGI REFRESH_TOKEN (buni serverga saqlang):', token);
});

client.on('loggedOn', () => {
  console.log('Steam akkauntga muvaffaqiyatli ulanildi!');
  client.setPersona(SteamUser.EPersonaState.Online); // Ko'rinmas bo'lish uchun Invisible yozing
  client.gamesPlayed([730]); // 730 = CS2
});

client.on('error', (err) => {
  console.error('Xatolik:', err.message);
});