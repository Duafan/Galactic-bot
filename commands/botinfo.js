const Discord = require("discord.js");

module.exports.command = {
  name: "botinfo",
  aliases: ["bi"],
  description: "Shows all bot info",
  category: "Util",
  usage: "botinfo"
}

module.exports.run = async (client, message, args) => {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Created On", client.user.createdAt);

    message.channel.send(botembed);
}
