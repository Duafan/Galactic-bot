// This reuires one package, again, for the embed - discord.js
const Discord = require('discord.js');

// Command Handler - You can use your own
module.exports.command = {
    name: "serverinfo",
    aliases: ["si", "server"],
    description: "To show you this server information",
    category: "Info",
    usage: ".serverinfo"
}

exports.run = async (client, message, args) => {

    // Variables
    let icon = message.guild.iconURL;
    let embed = new Discord.MessageEmbed() // or Discord.MessageEmbed
        .setDescription('Server Info')
        .setColor('0x43f033')
        .setThumbnail(icon)
        .addField('Server Name', message.guild.name)
        .addField('Created on', message.guild.createdAt)
        .addField('You joined', message.member.joinedAt)
        .addField("Server region", message.guild.region)
        .addField("Guild owner", message.guild.owner)
        .addField('Total Members', message.guild.memberCount);

    // Send embed
    message.channel.send(embed);

} 
