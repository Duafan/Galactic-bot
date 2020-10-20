const Discord = require('discord.js');

module.exports.command = {
    name: "rps",
    aliases: ["rps"],
    description: "Buat main game gunting, batu, kertas",
    category: "Game",
    usage: ".rps <batu, gunting, atau kertas>"
}

exports.run = async (client, message, args) => {

    let rock2 = ['Kertas! Yay aku menang!!', 'Gunting! Yahh kamu menang :(']
    let rock1 = Math.floor(Math.random() * rock2.length);

    let paper2 = ['Batu! Yay aku menang!!', 'Gunting! Yahh kamu menang :(']
    let paper1 = Math.floor(Math.random() * paper2.length);

    let scissors2 = ['Batu! Yay aku menang!!', 'Kertas! Yahh kamu menang :(']
    let scissors1 = Math.floor(Math.random() * scissors2.length);

let rock = new Discord.RichEmbed()
    .setAuthor('Batu, Kertas, Gunting')
    .setColor(0x43f033)
    .addField('Kamu pilih', `${args[0]}`)
    .addField('Aku pilih', rock2[rock1])

let paper = new Discord.RichEmbed()
    .setAuthor('Batu, Kertas, Gunting')
    .setColor(0x43f033)
    .addField('Kamu pilih', `${args[0]}`)
    .addField('Aku pilih', paper2[paper1])

let scissors = new Discord.RichEmbed()
    .setAuthor('Batu, Kertas, Gunting')
    .setColor(0x43f033)
    .addField('Kamu pilih', `${args[0]}`)
    .addField('Aku pilih', scissors2[scissors1])

if (message.content === '.rps batu') message.channel.send(rock)
if (message.content === '.rps Batu') message.channel.send(rock)

if (message.content === '.rps kertas') message.channel.send(paper)
if (message.content === '.rps Kertas') message.channel.send(paper)

if (message.content === '.rps gunting') message.channel.send(scissors)
if (message.content === '.rps Gunting') message.channel.send(scissors)


if (message.content === '.rps') message.channel.send('Options: ``Batu``, ``Kertas``, ``Gunting``. **Cara pakai: .rps <option>**')

} 
