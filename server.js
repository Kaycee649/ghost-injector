// ✅ Load Required Libraries
const express = require("express");
const axios = require("axios");

const app = express();

// ✅ ENVIRONMENT VARIABLES (can be customized)
const dashboardURL = process.env.DASHBOARD_URL || "https://shadow-dashboard-kaycee.vercel.app";
const PINGS_PER_MINUTE = parseInt(process.env.PING_RATE) || 1000000;
const PINGS_PER_SECOND = Math.floor(PINGS_PER_MINUTE / 60);

// ✅ Generate Random Fake IPs
function randomIP() {
  return `${rand(11, 190)}.${rand(10, 255)}.${rand(10, 255)}.${rand(10, 255)}`;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ Function to Send Fake Ping
async function ghostPing(fakeIP) {
  try {
    await axios.get(dashboardURL, {
      headers: {
        "X-Forwarded-For": fakeIP,
        "User-Agent": "Mozilla/5.0 (GhostBot)"
      }
    });
    console.log(`✅ Ping sent from ${fakeIP}`);
  } catch (err) {
    console.log(`❌ Ping failed from ${fakeIP}`);
  }
}

// ✅ Repeat Ghost Pings Every Second
setInterval(() => {
  for (let i = 0; i < PINGS_PER_SECOND; i++) {
    const fakeIP = randomIP();
    ghostPing(fakeIP);
  }
}, 1000);

// ✅ Web Interface to Confirm Injector is Online
app.get("/", (req, res) => {
  res.send("👻 Kaycee's Ghost Injector is LIVE and pinging the shadow dashboard!");
});

// ✅ Start Server & Listen on Platform Port
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Injector running on port", listener.address().port);
});
