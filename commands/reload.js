module.exports.command = {
    name: "reload",
    aliases: ["rel", "r"],
    description: "Reload the code",
    category: "Developer",
    usage: ".reload"
}

exports.run = (client, message, args, ops) => {
    
    if (message.author.id !== ops.ownerID) return message.channel.send('Sorry, only the bot owner can use this command.');

    try { 
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(`Unable to reload: ${args[0]}`); 
    }

    message.channel.send(`Successfully reloaded: ${args[0]}`);

} 
