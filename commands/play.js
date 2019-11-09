module.exports.command = {
    name: "play",
    aliases: ["p", "pl"],
    description: "Play music",
    category: "Music",
    usage: ".play"
}
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

exports.run = async (client, message, args, ops) => {
    
    if(!message.member.voiceChannel) return message.channel.send('Anda belum masuk voice channel.')

    if(!args[0]) return message.channel.send('Maaf, tolong ketik url musiknya')

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {
        let commandFile = require('./search.js');
        return commandFile.run(client, message, args, ops);
      }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client, ops, data);
    else {
        message.channel.send(`:notes:  Menambahkan lagu ke playlist: **${info.title}** | Requested by: **${message.author.username}** `)
    }

    ops.active.set(message.guild.id, data);

}

async function play(client, ops, data) {
    
    client.channels.get(data.queue[0].announceChannel).send(`:musical_note: Now playing : **${data.queue[0].songTitle}**  | Requested by : **${data.queue[0].requester}**`);

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function(){
        end(client, ops, this);
    });
}

function end(client, ops, dispatcher){

    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;  

        if (vc) vc.leave();

    }

}