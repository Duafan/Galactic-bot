const Discord = require('discord.js');
 
exports.run = async (client, message, args) =>{
   message.channel.send(embed).then(message => {
      embed.setColor(0x43f033)
      embed.setDescription("Owned by Galactic")
      embed.setDescription("Created by zexter")
      embed.setFooter(useruser, userurl)
      embed.setTimestamp()
      message.edit(embed)
  })
}


