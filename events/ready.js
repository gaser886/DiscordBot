const Discord = require("discord.js");

module.exports = client => {
  console.log(`[SCOPE] Uspešno sam pokrenut i trenutno sam na ${client.guilds.cache.size} servera`);
  console.log(`[SCOPE] Ukupan broj članova na svim serverima je ${client.users.cache.size}`);

  client.user.setActivity("Scope Discord Server", { type: 'WATCHING' });
};