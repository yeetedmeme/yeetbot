module.exports = {
  "name":"eval",
  "args":["[Code]"],
  "description":"yes",
  dev:true,
  run(client, message, args) {
    if(!global.devs.includes(message.author.id)) return;
    eval(args.join(" "))
  }
}


