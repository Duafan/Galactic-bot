const client = require("./index.js")
const Discord = require("discord.js")
const fs = require("fs")

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

module.exports.loadCommands = () => {
    fs.readdir("./commands", (err, files) => {
        if (err) return console.log(err)
        let file = files.filter(f => f.split('.').pop() === "js")

        file.forEach(f => {
            let prop = require(`./commands/${f}`)
            client.commands.set(prop.command.name, prop)
            if (prop.command.aliases) {
                prop.command.aliases.forEach(a => {
                    client.aliases.set(a, prop.command.name)
                })
            }
        })
    })
}
