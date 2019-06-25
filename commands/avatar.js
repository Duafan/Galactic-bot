const Discord = require("discord.js");
const PREFIX = ";"

module.exports.command = {
    name: "avatar",
    aliases: ["ava", "av"],
    description: "Shows someone avatar",
    category: "Util",
    usage: "avatar"
}
// This is the brackets in which the command goes in
exports.run = async (client, message, args) => {
    if(!message.content.startsWith(PREFIX)) return;

    if(message.mentions.users.first() === client.user) return message.channel.send("You shall not steal my avatar!!")

    if(args[0] == "help"){
        message.reply("Usage: >avatar <user> || +avatar");
        return;
    };
    let msg = await message.channel.send("Generating avatar...");
    let target = message.mentions.users.first() || message.author;

        message.channel.send({embed: {
        color: 1339135,
        image: {
            url: (target.displayAvatarURL)
          },
        timestamp: new Date(),
        footer: {
          icon_url: client.user.displayAvatarURL ,
          text: "© GALACTIC bot",
        },
        author: {
            icon_url: message.guild.iconURL,
            name: "zexter-",
          }
        }});

        msg.delete();
}