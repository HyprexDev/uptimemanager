const Discord = require('discord.js');

exports.run = async (client , message, args ) => {

const embed = new Discord.MessageEmbed()
.setTitle("Uptime Manager | Davet")
.setColor("0FF09F")
.setDescription(`Beni Sunucuna Davet Etmek için [Tıkla!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)
Destek Sunucuma Gelmek için [Tıkla!](https://discord.gg/MNKA8GMQhf)`)
.setFooter("Uptime Manager©")
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
}

exports.help = {
name: 'davet'
};
