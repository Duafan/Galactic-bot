const Discord = require('discord.js');

module.exports.command = {
    name: "hapus",
    aliases: ["del", "delete", "clear", "hap"],
    description: "To delete your chat",
    category: "Moderation",
    usage: "hapus"
}

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You must specify the number of text to delete');
    if(!args[0]) return message.channel.send('You must specify the number of messages to delete');

    message.channel.bulkDelete(args[0]).then(() => { 
        message.channel.send(`:pencil2: ${args[0]} messages have been deleted.`).then(msg => msg.delete(5000));
    });

} 
