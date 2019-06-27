const Discord = require("discord.js")
const superagent = require("superagent")

module.exports.command = {
    name: "cat",
    aliases: ["cat"],
    description: "Shows random cat images",
    category: "Fun",
    usage: ".cat"
}
exports.run = async (client, message, args) => {
    let msg = await message.channel.send("Generating...");

    let{body} = await superagent
    .get(`http://aws.random.cat/meow`)
    
    if(!{body}) return message.channel.send("Something went wrong, please try again!")

        let embed = new Discord.RichEmbed()
        .setColor(0x43f033)
        .setAuthor(`CATS!`, message.guild.iconURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`Galactic Bot`, client.user.displayAvatarURL)

        message.channel.send({embed: embed})

        msg.delete();

}