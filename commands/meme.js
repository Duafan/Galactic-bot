const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.command = {
    name: "meme",
    aliases: ["mim", "memes"],
    description: "Shows random meme images",
    category: "Fun",
    usage: ".meme"
}

exports.run = async (client, message, args) => {
    let msg = await message.channel.send("Generating...");

    let{body} = await superagent
    .get(`https://apis.duncte123.me/meme?nsfw=false`)
    
    if(!{body}) return message.channel.send("Something went wrong, please try again!")

        let mEmbed = new Discord.RichEmbed()
        .setColor(0x43f033)
        .setAuthor(`MEMES!`, message.guild.iconURL)
        .setImage(body.url.image)
        .setTimestamp()
        .setFooter(`Galactic Bot`, client.user.displayAvatarURL)

        message.channel.send({embed: mEmbed})

        msg.delete();
}