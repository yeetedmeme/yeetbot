const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "sends you an image of your avatar",
  args:['[User]'],
  run(client, message, args) {
    var user = message.mentions.users.first() || message.author
    message.channel.send(user.avatarURL())
    }
  }

