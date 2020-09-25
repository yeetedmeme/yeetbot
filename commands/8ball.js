const Discord = module.require("discord.js");

module.exports = {
  name: "8ball",
  description: "for you 8ball needs",
  args:["[Question]"],
  run(client, message, args) {
    if (!args[0]) {
      client.errMsg(message);
      return;
    }
    let answers = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don’t count on it.",
      "It is certain.",
      "It is decidedly so.",
      "Most likely.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Outlook good.",
      "Reply hazy, try again.",
      "Signs point to yes.",
      "Very doubtful.",
      "Without a doubt.",
      "Yes.",
      "Yes – definitely.",
      "You may rely on it."
    ];
    let answer = answers[Math.floor(Math.random() * answers.length)];
    let msg = new Discord.MessageEmbed()
      .setTitle(":8ball:")
      .setColor("#0d0d0d")
      .addField("Question:", args.join(" "))
      .addField("Answer:", answer);
    message.channel.send(msg);
  }
};
