module.exports.command = {
    name: "play",
    aliases: ["pl"],
    description: "Play music",
    category: "Music",
    usage: ".play"
}
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

exports.run = async (client, message, args, ops) => {
    
    if(!message.member.voiceChannel) return message.channel.send('Anda belum masuk voice channel.')

    if(message.guild.me.voiceChannel) return message.channel.send('Maaf, bot masih digunakan di voice channel lain.')

    if(!args[0]) return message.channel.send('Maaf, tolong ketik url musiknya')

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) return message.channel.send('Maaf, tolong ketik url yang valid')

    let info = await ytdl.getInfo(args[0]);

    let voiceConnection = await message.member.voiceChannel.join()
        .then(voiceConnection => {
        const stream = ytdl(args[0], { filter : 'audioonly' });
        const streamDispatcher = voiceConnection.playStream(stream, streamOptions);
        })
        .catch(console.error);

    message.channel.send(`Now playing : ${info.title}`);


}