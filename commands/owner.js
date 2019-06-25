const Discord = require('discord.js');
 
module.exports.command = {
   name: "owner",
   aliases: ["own"],
   description: "To show you who created this bot",
   category: "Util",
   usage: ".owner"
}

exports.run = async (client, message, args) =>{
   const useruser = 'Command ran by: ' + message.author.username;
   const userurl = message.author.avavtarURL;

   // Forming the embed
   let embed = new Discord.RichEmbed() // Remember to use .MessageEmbed() if you use the master version
   .setColor(0x43f033)
   .setDescription(`Loading...`)
   .setTimestamp()
   message.channel.send(embed).then(message => {
      embed.setColor(0x43f033)
      embed.setTitle("Owned by Galactic")
      embed.setDescription("Created by Admin and Owner")
      embed.setFooter(useruser, userurl)
      embed.setTimestamp()
      message.edit(embed)
  })
}


