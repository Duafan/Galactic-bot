module.exports.command = {
    name: "leave",
    aliases: ["leave", "keluar", 'l'],
    description: "Leaving voice channel",
    category: "Music",
    usage: ".leave"
}

exports.run = async (client, message, args, ops) => {

    if(!message.member.voiceChannel) return message.channel.send('Anda belum masuk voice channel.')

    if(!message.guild.me.voiceChannel) return message.channel.send('Maaf, bot belum masuk voice channel.')

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('Maaf, Anda tidak berada di voice channel yang sama')

    message.guild.me.voiceChannel.leave();

    message.channel.send('Keluar dari voice channel...');
}