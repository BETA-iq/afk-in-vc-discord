````markdown
# Discord Auto Voice Join

A **Discord SelfBot Script** that automatically joins specified voice channels on startup and re-joins them if you’re ever disconnected.

This script will:
- Join all voice channels listed in your configuration when the bot becomes ready.
- Listen for voice state updates for your account and, if you’re kicked or disconnect, re-join after a 9-second delay.
- Use direct gateway **OP 4** payloads for voice state updates.

---

## ⚙️ Features
- **Auto-join** listed voice channels on ready.  
- **Auto-rejoin** if you leave or get disconnected.  
- Simple configuration of your token and channel IDs.  
- Uses low-level shard send (OP 4) for reliable voice state updates.

---

## 📝 Configuration

1. **Add your token**  
   Replace `"YOUR_DISCORD_TOKEN"` with your user token:
   ```js
   const token = "YOUR_DISCORD_TOKEN";
````

2. **List the voice channel IDs** you want to join:

   ```js
   const voiceChannelIds = [
     "1095447139762585685",
     "ANOTHER_CHANNEL_ID"
   ];
   ````

---

## 🚀 How to Run

1. **Install dependencies**

   ```bash
   npm install discord.js-selfbot-v13
   ````
2. **Save the script** as `voice-join.js` (see below).
3. **Run the script**

   ```bash
   node voice-join.js
   ````

---

## ⚠️ Disclaimer

* **Selfbots violate Discord’s Terms of Service.** Use at your own risk.
* For **educational purposes** only.

---

## 📂 Project Structure

```
discord-auto-voice-join/
├── README.md
└── voice-join.js
```

````


