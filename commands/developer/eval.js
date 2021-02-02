const Discord = require("discord.js");
const hastebin = require("hastebin-gen");

module.exports = {
  name: "eval",
  description: "eval",
  usage: "eval [kod]",
  category: "dev",
  
  run: async (client, message, args) => {
    try {
      var allowedToUse = false;
  
      client.dev_ids.forEach(id => {
        if (message.author.id == id) allowedToUse = true;
      });
    
      if (allowedToUse) {
        function clean(text) {
          if (typeof text === "string") {
            return text
              .replace(/`/g, "`" + String.fromCharCode(8203))
              .replace(/@/g, "@" + String.fromCharCode(8203));
          }
          return text;
        }
        function token(input) {
          if (typeof input === "string") {
            return input.replace(message.client.token, "Your TOKEN");
          } else if (typeof input === "object") {
            if (Array.isArray(input)) {
              function hasToken(value) {
                if (typeof value !== "string") {
                  return true;
                }
                return value !== message.client.token;
              }
              return input.filter(hasToken);
            }
            return input;
          }
          return input;
        }
        let noembed = false;
        try {
          let code = args.join(" ");
          if (code.indexOf("--noembed") !== -1) {
            code = code.replace("--noembed", "");
            noembed = true;
          }
          let evaled = eval(code);
          let func = token(clean(evaled));
          if (typeof func !== "string") {
            func = require("util").inspect(func);
          }
          const output = "```js\n" + func + "\n```";
          const Input = "```js\n" + message.content.slice(6) + "\n```";
          let type = typeof evaled;
          if (func.length < 1000 && !noembed) {
            const embed = new Discord.MessageEmbed()
              .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
              .setAuthor("Eval", client.user.displayAvatarURL())
              .addField(":inbox_tray: Ulaz", Input)
              .addField(":outbox_tray: Izlaz", output)
              .setColor("GREEN")
              .setTimestamp();
            message.channel
              .send({ embed });
          } else if (!noembed) {
            hastebin(func, { extension: ".txt" })
              .then(res => {
                const embed = new Discord.MessageEmbed()
                  .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
                  .setAuthor("Eval", client.user.displayAvatarURL())
                  .setTimestamp()
                  .addField(":inbox_tray: Ulaz", Input)
                  .addField(
                    ":outbox_tray: Izlaz",
                    `Izlaz je bio predugačak, uploadan je na ${res}`
                  )
                  .setColor("GREEN");
                message.channel
                  .send({ embed });
              })
              .catch(err => {
                console.log(err);
                const embed = new Discord.MessageEmbed()
                  .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
                  .setTimestamp()
                  .setAuthor("Eval", client.user.displayAvatarURL())
                  .addField(":inbox_tray: Input", Input)
                  .addField("<:warning:802975421188407296> Greška", `Izlaz je bio predugačak`, true)
                  .setColor("GREEN");
                message.channel
                  .send({ embed });
              });
          }
        } catch (err) {
          let errIns = require("util").inspect(err);
          const error = "```js\n" + errIns + "\n```";
          const Input = "```js\n" + message.content.slice(6) + "\n```";
          if (errIns.length < 1000 && !noembed) {
            const embed = new Discord.MessageEmbed()
              .setTimestamp()
              .setAuthor("Eval", client.user.displayAvatarURL())
              .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
              .addField(":inbox_tray: Ulaz", Input)
              .addField("<:warning:802975421188407296> Greška", error, true)
              .setColor("RED");
            message.channel
              .send({ embed });
          } else if (!noembed) {
            hastebin(errIns, { extension: ".txt" })
              .then(res => {
                const embed = new Discord.MessageEmbed()
                  .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
                  .setAuthor("Eval", client.user.displayAvatarURL())
                  .setTimestamp()
                  .addField(":inbox_tray: Ulaz", Input)
                  .addField(
                    "<:warning:802975421188407296> Greška",
                    "```" + err.name + ": " + err.message + "```",
                    true
                  )
                  .setURL(res)
                  .setColor("RED");
                message.channel
                  .send({ embed });
              })
              .catch(err => {
                console.log(err);
                const embed = new Discord.MessageEmbed()
                  .setFooter(`${message.author.username}`, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
                  .setTimestamp()
                  .setAuthor("Eval", client.user.displayAvatarURL())
                  .addField(":inbox_tray: Ulaz", Input)
                  .addField("<:warning:802975421188407296> Greška", `Izlaz je bio predugačak`, true)
                  .setColor("RED");
                message.channel
                  .send({ embed });
              });
          }
        }
      }
    } catch (err) {
      message.channel.send(`>>> Greška!\n\n${err}`);
      console.log(`>>> Greška na eval komandi!\n\nGreška:\n\n ${err}`);
    }
  }
};