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
    const guild = client.guilds.cache.get('335722331949367296');

    // Get our stats channels
    const totalUsers = client.channels.cache.get('762351184907993148');
    const memberUsers = client.channels.cache.get('762351254621257778');
    const botUsers = client.channels.cache.get('762351282950242385');

    // Check every 10 seconds for changes
    setInterval(function() {
      console.log('Getting stats update..')

      //Get actual counts
      var userCount = guild.memberCount;
      var membersCount = guild.members.cache.filter(m => !m.user.bot).size;
      var botCount = guild.members.cache.filter(m => m.user.bot).size;
        
      // Log counts for debugging
      console.log("👫🤖Total Users : " + userCount);
      console.log("👫Member Count : " + membersCount);
      console.log("🤖Bot Count : " + botCount);

      // Set channel names
      totalUsers.setName("👫🤖Total Users : " + userCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);

      memberUsers.setName("👫Member Count : " + membersCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);

      botUsers.setName("🤖Bot Count : " + botCount)
      .then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
      .catch(console.error);
      }, 10000)

});


const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 50;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width-600);

	// Return the result to use in the actual canvas
	return ctx.font;
};


client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome🎉');
	if (!channel) return;
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
        .setThumbnail(member.user.avatarURL())
        .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝘽𝘼𝙍𝙐!`)
        .addField(`Selamat datang di Galactic Discord Server, **\`${member.user.username}#${member.user.discriminator}\`** !`,' Selamat bersenang-senang! :slight_smile:',  true)
        .addField(`ID`, `${member.user.id}`, true)
        .addField(`Anda member ke`, `**\`${member.guild.memberCount}\`**`, true)
        .setTimestamp()
        .setFooter(`Galactic Bot`, client.user.displayAvatarURL())
        channel.send(welcomeEmbed);
        
    
    const canvas = Canvas.createCanvas(1000, 500);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '32px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the Galactic!', canvas.width / 2.1, canvas.height / 4.1);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.username}#${member.user.discriminator}`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.username}#${member.user.discriminator}`, canvas.width / 2.1, canvas.height / 1.2);

	ctx.beginPath();
	ctx.arc(650, 250, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 550, 150, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the Galactic, ${member}!`, attachment);
});

client.on('guildMemberRemove', member =>{
 
    const channel = member.guild.channels.cache.find(ch => ch.name === 'goodbye👋');
	if (!channel) return;
    const goodbyeEmbed = new Discord.MessageEmbed()
        .setColor('#4dfff6') // I just put random in here, but you can chnage it to anything else.
        .setThumbnail(member.user.avatarURL())
        .setTitle(`𝙈𝙀𝙈𝘽𝙀𝙍 𝙆𝙀𝙇𝙐𝘼𝙍!`)
        .addField(`Sampai jumpa **\`${member.user.username}#${member.user.discriminator}\`** !`,  'Terima kasih. :upside_down: ', true)
        .addField(`ID`, `${member.user.id}`, true)
        .addField('Tanggal Join', member.joinedAt, true)
        .setTimestamp()
        .setFooter(`Galactic Bot`, client.user.displayAvatarURL())
        channel.send(goodbyeEmbed);

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