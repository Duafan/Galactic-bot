const Discord = require('discord.js');
const PREFIX = '.'; 
const readdirSync = require("fs")
const stripIndents = require("common-tags")

exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Display all commands that the bot has",
        accessableby: "everyone"

    },
    run: async (client, message, args) => {
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
        } else  {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${PREFIX}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is:\`${PREFIX}\`\n
            **Command:** ${command.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No description provided."}
            **Usage:** ${command.usage ? `\`${PREFIX}${command.name} ${command.usage}\`` : "No usage"}
            **Accessible by:** ${command.accessableby || "Everyone"}
            **Alliases:** ${command.aliases ? command.aliases.join(" ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}
