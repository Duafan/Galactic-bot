// const Discord = require("discord.js");
// const PREFIX = "."
// const superagent = require('superagent');

// module.exports.command = {
//     name: "dog",
//     aliases: ["anjing"],
//     description: "To shows dog picture",
//     category: "Fun",
//     usage: ".dog"
// }

// // This is the brackets in which the command goes in
// module.exports.run = async (client, message, args) => {
//     if (!message.content.startsWith(PREFIX)) return;

//     let msg = await message.channel.send("Generating...")

//     let {body} = await superagent
//     .get(`https://dog.ceo/api/breeds/image/random`);
//    // console.log(body.message)
//     if(!{body}) return message.channel.send("I broke! Try again.")

//     message.channel.send({embed: {
//         color: 3447003,
//         image: {
//             url: (body.message)
//           },
//           timestamp: new Date(),
//           footer: {
//           icon_url: client.user.displayAvatarURL ,
//           text: "© Galactic Bot",
//         },
//         author: {
//             icon_url: message.guild.iconURL,
//             name: "Galactic Bot",
//           }
//         }});

//         msg.delete();
//       } 


      