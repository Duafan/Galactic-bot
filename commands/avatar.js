const Discord = require("discord.js");
const PREFIX = "."

module.exports.command = {
    name: "avatar",
    aliases: ["ava", "av"],
    description: "Shows someone avatar",
    category: "Info",
    usage: ".avatar <@user>"
}
// This is the brackets in which the command goes in
exports.run = async (client, message, args) => {
    if(!message.content.startsWith(PREFIX)) return;

    if(message.mentions.users.first() === client.user) return message.channel.send("You shall not steal my avatar!!")

    if(args[0] == "help"){
        message.reply("Usage: .avatar @<user>");
        return;
    };
    
    let member = message.mentions.users.first() || message.author
    let avatar = member.displayAvatarURL({size: 1024})
    
      const embed = new Discord.MessageEmbed()
        .setTitle(`Requested by ${message.author.username}#${message.author.discriminator}`)
        .setImage(avatar)
        .setColor(0x43f033)
        .setTimestamp()
        .setFooter(`© Galactic Bot`, client.user.displayAvatarURL())
        message.channel.send(embed);

        /*message.channel.send({embed: {
        color: 0x43f033,
        image: {
            url: (avatar)
          },
        timestamp: new Date(),
        footer: {
          icon_url: client.user.displayAvatarURL ,
          text: "© GALACTIC bot",
        },
        author: {
            icon_url: message.guild.iconURL,
            name: `Requested by ${message.author.username}#${message.author.discriminator}`,
          }
        }}); */

}