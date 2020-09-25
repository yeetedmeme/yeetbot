const express = require("express");
const app = express();

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

const token = require("./token.json");

const config = require("./config.json");
global.config = config;

client.on("ready", () => {
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  client.user.setActivity(`hentai`, { type: "WATCHING" });
});

client.on("guildCreate", guild => {
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async message => {
  global.logchannel = message.guild.channels.cache.find(
    c => c.name == "mod-logs"
  );

  if (message.author.bot) return;

  let prefix = config.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let cmdFile = client.commands.get(command.slice(prefix.length));

  if (cmdFile && message.content.startsWith(prefix)) {
    cmdFile.run(client, message, args);

    var swears = require("./swears.json").array;

    swears.forEach(word => {
      if (message.content.toLowerCase().includes(word)) {
        message.reply(`NO SWORE IN MY GOOD CRISTIAN MINECRAFT SERVER`);
        message.reply("AHHHHHHHHHHHHHH NO SWAER");
        message.reply("yeeted will have your ass for this!");
      }
    });
  }

  if (command === "!!ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        client.ping
      )}ms`
    );
  }

  if (command === "!!purge") {
    // This command removes all messages from all users in the channel, up to 100.
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply(`You don't have the proper permissions for that!`);
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if (!deleteCount || deleteCount < 1 || deleteCount > 1000)
      return message.reply(
        "Please provide a number between 1 and 1000 for the number of messages to delete"
      );

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.messages.fetch({
      limit: deleteCount
    });
    message.channel
      .bulkDelete(fetched)
      .catch(error =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );
    global.logchannel.send(
      `${message.author} has purged ${deleteCount} message in ${message.channel}.`
    );
  }
});

client.login(token);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

global.devs = ["503934026189635594", "640224786366201856"];

global.admins = [""];
