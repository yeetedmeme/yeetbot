const Discord = require('discord.js')

module.exports = {
  name: "help",
  description:"help yes",
  args:['[Command]'],
  run(client, message, args) {
    
    if(!args[0]) {
     var cmds = client.commands.filter(c=>c.dev !== true).map(c=>`${global.config.prefix}${c.name} ${c.args.join(" ")}| ${c.description}`)
     
     var cmdEmbed = new Discord.MessageEmbed()
     .setTitle(`List of Commands`)
     .setDescription(cmds)
     .setFooter(`${client.user.tag}`)
     .setTimestamp()  
     
     message.channel.send(cmdEmbed)
    } else if(args[0]) {
      var cmd = client.commands.get(args[0])
      if(!cmd) return message.channel.send(`Invalid Command`)
      var cmdEmbed = new Discord.MessageEmbed()
      .setTitle(`Command: ${cmd.name}`)
      .addField(`Description`, cmd.description)
      .addField(`Args`, cmd.args.join(" "))
      
      message.channel.send(cmdEmbed)
    }
  }
};
