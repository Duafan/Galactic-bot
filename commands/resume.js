module.exports.command = {
    name: "resume",
    aliases: ["resume"],
    description: "Resume your music if the music was paused",
    category: "Music",
    usage: ".resume"
}

exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('Belum ada musik yang diputar.');
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Anda belum masuk voice channel.');
    
    if (!fetched.dispatcher.paused) return message.channel.send('Musik tidak dipause.');
    
    fetched.dispatcher.resume();
    
    message.channel.send(`Berhasil diresume: ${fetched.queue[0].songTitle}.`);
  
  
  
  
  }