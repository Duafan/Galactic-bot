module.exports.command = {
    name: "pause",
    aliases: ["pause"],
    description: "Pause your current music",
    category: "Music",
    usage: ".pause"
}

exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('Belum ada musik yang diputar.');
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Anda belum masuk voice channel.');
    
    if (fetched.dispatcher.paused) return message.channel.send('Music sudah di pause.');
    
    fetched.dispatcher.pause();
    
    message.channel.send(`Berhasil dipause ${fetched.queue[0].songTitle} `); 
  
  }