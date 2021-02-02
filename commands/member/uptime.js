const Discord = require("discord.js");

module.exports = {
  name: "uptime",
  description: "vreme rada bota",
  usage: "uptime",
  category: "member",
  
  run: async (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);

    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const uptime = `${days} dana, ${hours} sati, ${minutes} minuta i ${seconds} sekundi`;
    const embed = new Discord.MessageEmbed()
      .setDescription(
`Bot radi već ⋅ __${uptime}__`)
      .setColor("YELLOW");
    message.channel.send(embed);
  }
};