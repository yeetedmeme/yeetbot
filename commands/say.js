module.exports = {
  name: "say",
  description: "ADMIN ONLY",
  args:[],
  dev:true,
  run(client, message, args) {
    if(!global.admins.includes(message.author.id)) return
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o => {});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
    }
  }
;
