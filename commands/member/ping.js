const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "ping bota",
  usage: "ping",
  category: "member",
  
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
       .setDescription("Ping?")
       .setColor("YELLOW")
       .setTimestamp();
  
    const m = await message.channel.send(embed);
  
    let embedEdit = new Discord.MessageEmbed()
       .setDescription(`Pong!
Latency ⋅ ${m.createdTimestamp - message.createdTimestamp}ms
API Latency ⋅ ${client.ws.ping}ms`)
       .setColor("YELLOW");
    m.edit(embedEdit);
  }
};