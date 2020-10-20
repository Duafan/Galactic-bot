const Discord = require('discord.js');
var version = '1.1.5';

module.exports.command = {
    name: "versi",
    aliases: ["ver", "version"],
    description: "To show you bot's version",
    category: "Info",
    usage: ".versi"
}

exports.run = async (client, message, args) => {
      const useruser = 'Command ran by: ' + message.author.username;
      const userurl = message.author.avavtarURL;
  
      // Forming the embed
      let embed = new Discord.RichEmbed() // Remember to use .MessageEmbed() if you use the master version
          .setColor(0x43f033)
          .setDescription(`Loading...`)
          .setTimestamp()
      message.channel.send(embed).then(message => {
            embed.setColor(0x43f033)
            embed.setDescription('Versi '+ version)
            embed.setFooter(useruser, userurl)
            embed.setTimestamp()
            message.edit(embed)
        })
 }
