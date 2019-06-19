const Discord = require('discord.js');
const client = new Discord.Client();

const PREFIX = '.'; 
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
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    //Command Handler
    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);

    } catch (e) {
        console.log(e.stack)
    }
    
        function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
    
    }

    
    }

)

client.login(process.env.token);
