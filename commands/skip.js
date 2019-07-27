module.exports.command = {
    name: "skip",
    aliases: ["s", "skip"],
    description: "Skip the current music",
    category: "Music",
    usage: ".skip"
}
exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('Belum ada musik yang diputar');
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Anda belum masuk voice channel');
    
    let userCount = message.member.voiceChannel.members.size;
    
    let required = Math.ceil(userCount/2);
    
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
    
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Maaf, Anda telah melakukan vote! ${fetched.queue[0].voteSkips.length}/${required} yang dibutuhkan.`);
    
    fetched.queue[0].voteSkips.push(message.member.id);
    
    ops.active.set(message.guild.id, fetched);
    
    if (fetched.queue[0].voteSkips.length >= required) {
      message.channel.send('Berhasil skip lagunya!');
      return fetched.dispatcher.end();
    }
    
    message.channel.send(`Berhasil voting untuk skip!.${fetched.queue[0].voteSkips.length}/${required} yang dibutuhkan.`) 
}