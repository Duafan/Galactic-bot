const math = require('mathjs');
const Discord = require('discord.js');

module.exports.command = {
    name: "calc",
    aliases: ["ca", "c", "kal"],
    description: "Helping you to solve your math problems.",
    category: "Util",
    usage: ".calc <your math problems>"
}

exports.run = (client, message, args, tools) => {

    if (!args[0]) return message.channel.send('Please input a calculation.');
    let resp;
    try {
        resp = math.eval(args.join(' '));
    } catch (e) {
        return message.channel.send('Sorry, please input a valid calculation.');
    }

    const embed = new Discord.RichEmbed()
        .setColor(0x43f033)
        .setTitle('Math Calculation')
        .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
        .addField('Output', `\`\`\`js\n${resp}\`\`\``)

    message.channel.send(embed);

}
