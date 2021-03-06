const Discord = require("discord.js");

module.exports.command = {
    name: "coinflip",
    aliases: ["cf"],
    description: "To play coinflip game",
    category: "Game",
    usage: ".coinflip"
}
var coin = [
    ":coin: **CoinFlip:** Muncul Gambar :coin:",
    ":coin: **CoinFlip:** Muncul Angka :coin:",
];
const PREFIX = "."

// This is the brackets in which the command goes in
module.exports.run = async (client, message, args) => {
    if (!message.content.startsWith(PREFIX)) return;
    message.channel.send((coin[Math.floor(Math.random() * coin.length)]) + ".");
}
