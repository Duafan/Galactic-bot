const Discord = require('discord.js');

var version = '1.0.5';
exports.run = async (client, message, args) => {
      message.channel.send(embed).then(message => {
            embed.setColor(0x43f033)
            embed.setDescription('Versi '+ version)
            embed.setFooter(useruser, userurl)
            embed.setTimestamp()
            message.edit(embed)
        })
 }
