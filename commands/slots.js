// 🍎🍌🍒🍓🍈

const Discord = require('discord.js'); 

module.exports.command = {
    name: "slots",
    aliases: ["slots"],
    description: "To play slots game",
    category: "Game",
    usage: ".slots"
}

// Command Handler
exports.run = async (client, message, args) => {

    let slots = ["🍎", "🍌", "🍒", "🍓", "🍈"];
    let result1 = Math.floor((Math.random() * slots.length));
    let result2 = Math.floor((Math.random() * slots.length));
    let result3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let icon = message.author.displayAvatarURL;

    if (slots[result1] === slots[result2] && slots[result3]) {
        let wEmbed = new Discord.MessageEmbed() // Remember to use MessageEmbed if you use master
            .setFooter('You won!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(0x43f033)
        message.channel.send(wEmbed);

    } else {

        let lEmbed = new Discord.MessageEmbed()
            .setFooter('You lost!', icon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
            .setColor(0x43f033)
        message.channel.send(lEmbed);
    }
} 
