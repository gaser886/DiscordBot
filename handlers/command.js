const { readdirSync } = require("fs");
console.log("[SPOKE] Command Handler uspešno učitan.")
module.exports = (client) => {
  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        client.commands.set(pull.name, pull);
        console.log("[SPOKE] Komanda " + file + " je uspešno učitana ✔");
      } else {
        console.log("[SPOKE] Komanda " + file + " nije učitana, postoji neka greška ✘");
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
      }
  });
};