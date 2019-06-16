const {Client, Attachment} = require('discord.js');
const bot = new Client();

const token = 'NTgzNTMxMjY2ODE3OTE2OTQ4.XPC84Q.8_gajQznpaADcqKjG70BDI8QIUw';

const PREFIX = '.'; 

var version = '1.0.0';

bot.on('ready', () =>{
    console.log('This bot is online!');
    bot.user.setActivity('with zexter-', { type: 'STREAMING', url:"https://www.twitch.tv/duafan"}).catch(console.error);
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "command-bot");
    if(!channel) return;

    channel.send(`Welcome to Galactic Discord Server, ${member}, Hope you enjoy it! :slight_smile: `)
});

bot.on('guildMemberRemove', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "command-bot");
    if(!channel) return;

    channel.send(`${member} has left the server. :anguished: `)
});


bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case 'ping':
            message.reply('pong!');
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

bot.login(procces.env.token);
