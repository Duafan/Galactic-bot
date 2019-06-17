const {Client, Attachment} = require('discord.js');
const bot = new Client();

const PREFIX = '.'; 

var version = '1.0.5';

bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('with zexter-', { type: 'STREAMING', url:"https://www.twitch.tv/duafan"}).catch(console.error);
})

const serverStats = {
    guildID: '335722331949367296',
    totalUserID: '589812086935388161',
    memberCount: '589812154065223690',
    botCountID: '589812223388549140',
};

bot.on('guildMemberAdd', member =>{

    if(member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`); //Total
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`); //Member
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`) //Bot

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Selamat datang di Galactic Discord Server, ${member}! Selamat bersenang-senang! :slight_smile: `)
});

bot.on('guildMemberRemove', member =>{

    if(member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`)
    
    const channel = member.guild.channels.find(channel => channel.name === "goodbye");
    if(!channel) return;

    channel.send(`Sampai jumpa ${member}! Terima kasih. :upside_down:  `)
});


bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");
    
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds.`
    }
    
    switch (args[0]){
        case 'ping':
            message.channel.send({embed:{ 
                title:"Ping!",
                description:"Pong!",
                color: 0x5DADE2   
            }});
            break;
        case 'uptime':
            message.channel.send(`I have been online for: ${duration(bot.uptime)}`)
            break;
        case 'hi':
                message.reply('Hello!');
            break;
        case 'giveaway':
            if(args[0]){
                message.channel.sendMessage('Giveaway sudah berakhir.');
            }
//           if(args[1] === '1'){
//                const attachment = new Attachment ('./giveaway 1.txt');
//                message.channel.send('||Key ada didalam file. Goodluck!||', attachment)
//            }
//            if(args[1] === '2'){
//                const attachment2 = new Attachment ('./giveaway 2.txt');
//                message.channel.send('||Key ada didalam file. Goodluck!||', attachment2)
//            }
            break;
        case 'info':
            if(args[1] === 'versi'){
                message.channel.sendMessage('Versi ' + version)
            }
            if(args[1] === 'owner'){
                message.channel.sendMessage('Owned by Galactic')
            }
//            }else{
//                message.channel.sendMessage('Commandnya salah woy!')
//            }
            break;
        case 'hapus':
            if(!args[1]) return message.reply('Command masih kurang')
            message.channel.bulkDelete(args[1]);
            break;
    }

})

bot.login(process.env.token);
