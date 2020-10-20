const Discord = require("discord.js");

module.exports.command = {
  name: "botinfo",
  aliases: ["bi"],
  description: "Shows all bot info",
  category: "Info",
  usage: ".botinfo"
}

module.exports.run = async (client, message, args) => {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("0x43f033")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt)
    .addField("Guilds in", client.guilds.size)
    .addField("Helping", client.users.size)

    message.channel.send(botembed);
}
