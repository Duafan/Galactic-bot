module.exports.command = {
    name: "volume",
    aliases: ["volume", "vol"],
    description: "Setting your music volume",
    category: "Music",
    usage: ".volume"
}
exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    
    if (!fetched) return message.channel.send('Belum ada musik yang diputar.');
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Anda belum masuk voice channel.');

    if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Tolong masukan angka antara 0-200');

    fetched.dispatcher.setVolume(args[0]/100);

    message.channel.send(`Berhasil merubah volume lagu **${fetched.queue[0].songTitle}** menjadi ${args[0]}`);

}