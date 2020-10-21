const ms = require('ms');

module.exports.command = {
    name: "giveaway",
    aliases: ["ga"],
    description: "To start a giveaway",
    category: "Giveaway",
    usage: ".giveaway #namachannel 'waktu' 'jumlahpemenang' 'judul'"
  }
  
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You are not allowed to start giveaways');

    let channel = message.mentions.channels.first();

    if (!channel) return message.channel.send('Please provide a channel');

    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Pleae provide a valid duration');

    let giveawayWinners = args[2];

    if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!');

    let giveawayPrize = args.slice(3).join(" ");

    if (!giveawayPrize) return message.channel.send('Ok then, I\'ll give away nothing');

    
    client.giveawaysManager.start(channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(args[2]),
        hostedBy: message.author.username,

        messages: {
            giveaway: "@everyone\n\n" + "🎉🎉 GIVEAWAY 🎉🎉",
            giveawayEned: "@everyone\n\n" + "GIVEAWAY BERAKHIR",
            timeRemaining: "Sisa waktu: **{duration}**",
            inviteToParticipate: "Tekan emoji 🎉 dibawah untuk ikut giveaway ini!",
            winMessage: "SELAMAT {winners} !!! 🎉🎉🎉 \nKAMU MENANG **{prize}** !!! 🎁🎁🎁",
            embedFooter: "Giveaway time!",
            noWinner: "Tidak dapat menentukan pemenangnya.",
            hostedBy: "Diadakan oleh {user}",
            winners: "Pemenang",
            endedAt: "Berakhir pada",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    })

    message.channel.send(`Giveaway starting in ${channel}`);
}
