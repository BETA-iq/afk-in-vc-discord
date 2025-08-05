globalThis.File = class File {};
const { Client } = require('discord.js-selfbot-v13');
const discord_bot_8w = new Client();
const token = "YOUR_DISCORD_TOKEN";
const voiceChannelIds = ["HERE_ADD_CHANNEL_ID"/*,"Your can add more"*/];

discord_bot_8w.on('ready', async () => {
    try {
        console.log(`[${new Date().toISOString()}] ${discord_bot_8w.user.username} is ready!`);
        for (const id of voiceChannelIds) {
            try {
                const channel = discord_bot_8w.channels.cache.get(id);
                if (!channel) {
                    console.log(`[${new Date().toISOString()}] Channel ${id} not found.`);
                    console.log(`Solution: Verify that the bot has cached the channel and the ID is correct.`);
                    continue;
                }
                forceJoin(channel.guild.id, id);
            } catch (err) {
                console.error(`[${new Date().toISOString()}] Error processing channel ID ${id}:`, err);
                console.log(`Solution: Ensure the guild and channel IDs are valid and bot has access.`);
            }
        }
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error in ready event handler:`, err);
        console.log(`Solution: Check that the Discord client initialized correctly and token is valid.`);
    }
});

discord_bot_8w.on('voiceStateUpdate', async (oldState, newState) => {
    try {
        if (newState.id !== discord_bot_8w.user.id) return;
        if (!voiceChannelIds.includes(newState.channelId)) {
            console.log(`[${new Date().toISOString()}] Left voice channel, rejoining in 9s...`);
            setTimeout(() => {
                try {
                    const id = voiceChannelIds[0];
                    const ch = discord_bot_8w.channels.cache.get(id);
                    if (ch) {
                        forceJoin(ch.guild.id, id);
                    } else {
                        console.log(`[${new Date().toISOString()}] Channel ${id} not found on rejoin attempt.`);
                        console.log(`Solution: Make sure the channel ID is correct and cached.`);
                    }
                } catch (err) {
                    console.error(`[${new Date().toISOString()}] Error in rejoin timeout handler:`, err);
                    console.log(`Solution: Verify setTimeout callback logic and bot cache status.`);
                }
            }, 9000);
        }
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error in voiceStateUpdate handler:`, err);
        console.log(`Solution: Ensure voiceStateUpdate event data is correct and bot is connected.`);
    }
});

function forceJoin(guildId, channelId) {
    try {
        const shard = discord_bot_8w.ws.shards.first();
        if (!shard) {
            console.log(`[${new Date().toISOString()}] Shard not found.`);
            console.log(`Solution: Confirm WebSocket shards are available and client.ws initialized.`);
            return;
        }
        shard.send({
            op: 4,
            d: {
                guild_id: guildId,
                channel_id: channelId,
                self_mute: false,
                self_deaf: false
            }
        });
        console.log(`[${new Date().toISOString()}] Sent OP 4 Voice State Update to join channel: ${channelId}`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Error in forceJoin for ${channelId}:`, err);
        console.log(`Solution: Check shard.send parameters and client.ws state.`);
    }
}

try {
    discord_bot_8w.login(token).catch(err => {
        console.error(`[${new Date().toISOString()}] Login failed:`, err);
        console.log(`Solution: Verify your token and network connectivity.`);
    });
} catch (err) {
    console.error(`[${new Date().toISOString()}] Error calling login():`, err);
    console.log(`Solution: Make sure login() is called after defining token and client.`);
}

discord_bot_8w.login(token);
