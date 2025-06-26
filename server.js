const express = require("express");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3000;

const firebaseURL = "https://shadow-earnings-kaycee-default-rtdb.firebaseio.com/visits.json";
const wallet = "0xC9e80D2F3148a25692Cc48a61d87D8d04FfFd5B2";
const earningsPerPing = 0.0005;

// Just to keep Render app alive
app.get("/", (req, res) => {
  res.send("👻 Ghost Injector Active");
});

app.listen(PORT, () => {
  console.log(`🌐 Server is running on http://0.0.0.0:${PORT}`);
});

// Ghost Ping Function
function sendGhostPing() {
  try {
    const now = new Date().toISOString();
    const data = JSON.stringify({
      ip: "ghost",
      time: now,
      amount: earningsPerPing,
      wallet: wallet,
    });

    const req = https.request(firebaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    });

    req.write(data);
    req.end();
    console.log("✅ Ghost Ping Sent at", now);
  } catch (err) {
    console.error("❌ Ghost Ping Failed", err);
  }
}

// Every 100ms = ~600 pings per minute (safe)
setInterval(sendGhostPing, 100);
