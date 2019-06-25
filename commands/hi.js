module.exports.command = {
    name: "hi",
    aliases: ["hi"],
    description: "hi",
    category: "Util",
    usage: ".hi"
}

exports.run = async (client, message, args) => {
 message.reply('Hello!');
 }
