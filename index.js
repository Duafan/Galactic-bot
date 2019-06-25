const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = client

const { loadCommands } = require("./util/handler")
loadCommands() 

const PREFIX = '.'; 
const ownerID = '335726296091066386';

client.on('ready', () =>{
    console.log('This bot is online!');
    client.user.setActivity('with zexter-', { type: 'STREAMING', url:"https://www.twitch.tv/duafan"}).catch(console.error);
})

const serverStats = {
    guildID: '335722331949367296',
    totalUserID: '589812086935388161',
    memberCount: '589812154065223690',
    botCountID: '589812223388549140',
};

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Selamat datang di Galactic Discord Server, ${member}! Selamat bersenang-senang! :slight_smile: `)
});

client.on('guildMemberRemove', member =>{
   
    const channel = member.guild.channels.find(channel => channel.name === "goodbye");
    if(!channel) return;

    channel.send(`Sampai jumpa ${member}! Terima kasih. :upside_down:  `)
});

//Listener events
client.on('message', message => {

    // Variables
    let args = message.content.slice(PREFIX.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Returnt statements
    if (message.author.client) return;
    if (!message.content.startsWith(PREFIX)) return;

    let command;
    if(client.commands.has(cmd)){
        command = client.commands.get(cmd)
    }else if (client.aliases.has(cmd)){
        command = client.commands.get(client.aliases.get(cmd))
    }

    //Command Handler
    try {
        // Options
        let ops = {
            ownerID: ownerID
        }
        
        let commandFile = require(`./commands/${cmd}.js`); 
        commandFile.run(client, message, args, ops); 
        command.run(client, message, args, ops); 

    } catch (err) { 
        console.log(err.stack);
    }

});

client.login(process.env.token);
