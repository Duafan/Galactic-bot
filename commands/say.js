const Discord = require("discord.js");
const PREFIX = "."

module.exports.command = {
    name: "say",
    aliases: ["say"],
    description: "The bot will say what you say",
    category: "Moderation",
    usage: ".say <your text>"
}

// This is the brackets in which the command goes in
module.exports.run = async (client, message, args) => {
    if (!message.content.startsWith(PREFIX)) return;
    if(!message.member.permissions.has('BAN_MEMBERS')) {
        return message.channel.send('You are not an ``Administrator``.');
            }
        message.delete()
        var args = message.content.split(' ').slice(1);
        var argresult = args.join(" ");
        message.channel.send(argresult);
}
