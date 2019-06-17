exports.run = async (client, message, args) => {
    message.channel.send({embed:{ 
        title:"Ping!",
        description:"Pong!",
        color: 0x5DADE2   
    }});
}