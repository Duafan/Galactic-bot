const {Discord, Attachment} = require('discord.js');
const client = new Discord.Client();

const prefix = '.'; 
const ownerID = '335726296091066386';

var version = '1.0.5';

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

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Selamat datang di Galactic Discord Server, ${member}! Selamat bersenang-senang! :slight_smile: `)
});

client.on('guildMemberRemove', member =>{

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
    
    const channel = member.guild.channels.find(channel => channel.name === "goodbye");
    if(!channel) return;

    channel.send(`Sampai jumpa ${member}! Terima kasih. :upside_down:  `)
});

//Listener events
client.on('message', message=>{

    // Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    // Returnt statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    //Command Handler
    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);

    }catch (e) {
        console.log(e.stack)
    }

    
    }

)

client.login(process.env.token);
