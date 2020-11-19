const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = client

const PREFIX = '.'; 
const ownerID = '335726296091066386';
/* global Map*/
/* global client*/
const active = new Map();

const { loadCommands } = require("./util/handler")
loadCommands()
let statuses = ['.help or .h', '.help <command>']

const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 3000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "RANDOM",
        reaction: "🎉"
    }
});

client.on('ready', () =>{
    console.log('This bot is online!');
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "STREAMING", url:"https://www.twitch.tv/duafan"}).catch(console.error);

    }, 3000)


    // Get our server
    const guild = client.guilds.get('335722331949367296');

    // Get our stats channels
    const totalUsers = client.channels.get('762351184907993148');
    const memberUsers = client.channels.get('762351254621257778');
    const botUsers = client.channels.get('762351282950242385');

    // Check every 10 seconds for changes
    setInterval(function() {
      console.log('Getting stats update..')

      //Get actual counts
      var userCount = member.guild.memberCount;
      var memberCount = member.guild.members.filter(m => !m.user.bot).size;
      var botCount = member.guild.members.filter(m => m.user.bot).size;
        
      // Log counts for debugging
      console.log("👫🤖Total Users : " + userCount);
      console.log("👫Member Count : " + memberCount);
      console.log("🤖Bot Count : " + botCount);

      // Set channel names
      totalUsers.setName("👫🤖Total Users : " + userCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);

      memberUsers.setName("👫Member Count : " + memberCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);

      botUsers.setName("🤖Bot Count : " + botCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);
      }, 10000)

});

client.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "welcome🎉");
    if(!channel) return;

    channel.send({embed: new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
                    .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
                    .setThumbnail(member.user.avatarURL)
                    .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝘽𝘼𝙍𝙐!`)
                    .addField(`Selamat datang di Galactic Discord Server, **\`${member.user.username}#${member.user.discriminator}\`** !`,' Selamat bersenang-senang! :slight_smile:',  true)
                    .addField(`ID`, `${member.user.id}`, true)
                    .addField(`Anda member ke`, `**\`${member.guild.memberCount}\`**`, true)
                    .setTimestamp()
                    .setFooter(`Galactic Bot`, client.user.displayAvatarURL)
                });
        
});

client.on('guildMemberRemove', member =>{
   
    const channel = member.guild.channels.find(channel => channel.name === "goodbye👋");
    if(!channel) return;

    channel.send({embed: new Discord.RichEmbed() // Use Discord.MessageEmbed if you use the master version
                    .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
                    .setThumbnail(member.user.avatarURL)
                    .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝙆𝙀𝙇𝙐𝘼𝙍!`)
                    .addField(`Sampai jumpa **\`${member.user.username}#${member.user.discriminator}\`** !`,  'Terima kasih. :upside_down: ', true)
                    .addField(`ID`, `${member.user.id}`, true)
                    .addField('Tanggal Join', member.joinedAt, true)
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
            ownerID: ownerID,
            active: active
        }

        command.run(client, message, args, ops)
    } catch (e) {
        console.log(e.stack)
    }

    
    }

)

client.login(process.env.token);