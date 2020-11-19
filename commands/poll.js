const Discord = require('discord.js');

module.exports.command = {
    name: "poll",
    aliases: ["polling"],
    description: "To Make a poll",
    category: "Moderation",
    usage: ".poll <your poll question>"
}

exports.run = async (client, message, args, tools) => {

    // Role Verification (Optional)
    if (!message.member.roles.cache.some(r => r.name === 'KAKI KANAN', 'PENGEDAR', 'RAJA TERAKHIR')) return message.channel.send('This requires the role: KAKI KANAN or PENGEDAR or RAJA TERAKHIR');

    // Permission Verification (Optional)
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('This requires the permission: ADMINISTRATOR');

    if (!args[0]) return message.channel.send('Proper Usage: <prefix>poll question');

    const embed = new Discord.MessageEmbed()
        .setColor(0x43f033)
        .setFooter('React to vote.')
        .setDescription(args.join(' '))
        .setTitle(`Poll created by ${message.author.username}`);

    let msg = await message.channel.send(embed);

    await msg.react('✅'); 
    await msg.react('❌');

    message.delete({timeout: 1000}); // This waits 1000 milliseconds before deleting (1 second)

} 
