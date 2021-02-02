const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: Discord.Intents.ALL }});
client.Discord = Discord;

client.afk = new Discord.Collection();

// Files // 

const dotenv = require("dotenv").config();
const TOKEN = process.env.BOT_TOKEN;

// Other //

const dev_ids = ["276044647321698315", "787854452274888735"];
client.dev_ids = dev_ids;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    
    if (!file.endsWith(".js")) return;
    
    const event = require(`./events/${file}`);
    
    let eventName = file.split(".")[0];

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.aliases = new Discord.Collection();
client.commands = new Discord.Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/command`)(client);
});

client.login(TOKEN);