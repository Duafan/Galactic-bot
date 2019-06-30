const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = client

const PREFIX = '.'; 
const ownerID = '335726296091066386';

const { loadCommands } = require("./util/handler")
loadCommands()

let statuses = ['The bot has been updated', '.help or .h', '.help <command>', 'no more zexter-', 'see you soon', "i'll be back (maybe)"]

client.on('ready', () =>{
    console.log('This bot is online!');
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "STREAMING", url:"https://www.twitch.tv/duafan"}).catch(console.error);

    }, 3000)
})

// client.on('ready', () =>{
//     console.log('This bot is online!');
//     client.user.setActivity('no more zexter-', { type: 'STREAMING', url:"https://www.twitch.tv/duafan"}).catch(console.error);
// })

const serverStats = {
    guildID: '335722331949367296',
    totalUserID: '589812086935388161',
    memberCount: '589812154065223690',
    botCountID: '589812223388549140',
};

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send({embed: new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
                    .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
                    .setThumbnail(member.user.avatarURL)
                    .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝘽𝘼𝙍𝙐!`)
                    .addField(`Selamat datang di Galactic Discord Server, **\`${member.user.username}#${member.user.discriminator}\`** !`,' Selamat bersenang-senang! :slight_smile:',  true)
                    .addField(`ID`, `${member.user.id}`, true)
                    .addField('Anda member ke', member.guild.memberCount)
                    .setTimestamp()
                    .setFooter(`Galactic Bot`, client.user.displayAvatarURL)
                });
        
});

client.on('guildMemberRemove', member =>{
   
    const channel = member.guild.channels.find(channel => channel.name === "goodbye");
    if(!channel) return;

    channel.send({embed: new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
                    .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
                    .setThumbnail(member.user.avatarURL)
                    .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝙆𝙀𝙇𝙐𝘼𝙍!`)
                    .addField(`Sampai jumpa **\`${member.user.username}#${member.user.discriminator}\`** !`,  'Terima kasih. :upside_down: ')
                    .addField(`ID`, `${member.user.id}`)
                    .addField('Member saat ini', member.guild.memberCount)
                    .setTimestamp()
                    .setFooter(`Galactic Bot`, client.user.displayAvatarURL)
                });
});

//Listener events
client.on('message', message => {

    // Variables
    let args = message.content.slice(PREFIX.length).trim().split(/ +/)
    let cmd = args.shift().toLowerCase();

    // Return statements
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    let command;
    if (client.commands.has(cmd)) {
        command = client.commands.get(cmd)
    } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd))
    } else return

    //Command Handler
    try {

        let ops = {
            ownerID: ownerID
        }

        command.run(client, message, args, ops)
    } catch (e) {
        console.log(e.stack)
    }

    
    }

)

client.login(process.env.token);