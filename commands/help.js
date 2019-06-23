const Discord = require('discord.js');
const PREFIX = '.'; 
const readdirSync = require("fs");
const stripIndents = require("common-tags");

exports.run = async (client, message, args) => {
        const embed = new Discord.RichEmbed()
            .setColor(0x43f033)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(client.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/")
            
            embed.setDescription(`These are available commands for ${message.guild.displayName}\nThe bot prefix is: **${PREFIX}**`)
            embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`> ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        }
    }
