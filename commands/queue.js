module.exports.command = {
    name: "queue",
    aliases: ["queue", "q"],
    description: "Showing music queue",
    category: "Music",
    usage: ".queue"
}
exports.run = async (client, message, args, ops) => {
  
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('Tidak ada musik pada playlist');
    
    let queue = fetched.queue;
    
    let nowPlaying = queue[0];
    
    let resp = `:musical_note: __**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;
    
    for (var i=1; i < queue.length; i++) {
      resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`;
    }
    message.channel.send(resp);
  
  }