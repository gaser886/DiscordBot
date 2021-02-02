module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  let prefix = "s!";

  if (message.author.bot) return;
  
  if(message.content.toLowerCase() === "wlcm") {
    message.react("806194335628001329");
    message.react("805830813328474182");
  }
  
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  
  let cmd = client.commands.get(command);
  if (!cmd) cmd = client.commands.get(client.aliases.get(command));
  if(cmd) cmd.run(client, message, args);
};