const Discord = require('discord.js');

module.exports.command = {
  name: "quiz",
  aliases: ["kuis"],
  description: "There are only 3 questions",
  category: "Game",
  usage: ".quiz"
}
// Command Handler
exports.run = async (client, message, args) => {

  let quiz = [
    { q: 'What color is the sky?', a: ['no color', 'invisible'] },
    { q: 'Name a soft drink brand.', a: ['pepsi', 'coke', 'rc', '7up', 'sprite', 'mountain dew'] },
    { q: 'Name a programming language.', a: ['actionscript', 'coffescript', 'c', 'c++', 'c#', 'visual basic', 'perl', 'javascript', 'dotnet', 'crystal', 'lua', 'go', 'python', 'rust', 'ruby', 'java'] },
  ];
  let options = {
    max: 1,
    time: 30050, // 30050 = 30 seconds and a half ms
    errors: ['time'],
  };

  let item = quiz[Math.floor(Math.random() * quiz.length)];
  await message.channel.send(item.q);
  try {
    let collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
    let winnerMessage = collected.first();
    return message.channel.send({embed: new Discord.MessageEmbed()
                                  .setAuthor(`Winner: ${winnerMessage.author.tag}`, winnerMessage.author.displayAvatarURL)
                                  .setTitle(`Correct Answer: \`${winnerMessage.content}\``)
                                  .setFooter(`Question: ${item.q}`)
                                  .setColor('0x43f033')
                                })

  } catch (_) {
    return message.channel.send({embed: new Discord.MessageEmbed()
                                  .setAuthor('No one got the answer in time!')
                                  .setTitle(`Correct Answer(s): \`${item.a}\``)
                                  .setFooter(`Question: ${item.q}`)
                                })

  }

} 
