// ✅ Load Required Modules
const express = require("express");
const axios = require("axios");

const app = express();

// ✅ Configuration
const PORT = process.env.PORT || 3000; // platform-assigned port
const HOST = "0.0.0.0"; // ensures it binds to all interfaces (required for Render)

const dashboardURL = process.env.DASHBOARD_URL || "https://shadow-dashboard-kaycee.vercel.app";
const PINGS_PER_MINUTE = parseInt(process.env.PING_RATE) || 1000000;
const PINGS_PER_SECOND = Math.floor(PINGS_PER_MINUTE / 60);

// ✅ Generate Random IP
function randomIP() {
  return `${rand(11, 190)}.${rand(10, 255)}.${rand(10, 255)}.${rand(10, 255)}`;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ Ghost Ping Function
async function ghostPing(fakeIP) {
  try {
    await axios.get(dashboardURL, {
      headers: {
        "X-Forwarded-For": fakeIP,
        "User-Agent": "Mozilla/5.0 (GhostBot)"
      }
    });
    console.log(`✅ Ghost ping from ${fakeIP}`);
  } catch (err) {
    console.log(`❌ Ping failed from ${fakeIP}`);
  }
}

// ✅ Ping Engine
setInterval(() => {
  for (let i = 0; i < PINGS_PER_SECOND; i++) {
    ghostPing(randomIP());
  }
}, 1000);

// ✅ Root Web Route (confirms server is live)
app.get("/", (req, res) => {
  res.send("👻 Kaycee's Ghost Injector is LIVE and working!");
});

// ✅ Start the Server (THIS FIXES THE PORT ERROR)
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});
