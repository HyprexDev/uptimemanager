const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
if (!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
.setDescription(`• Komut ismi belirtiniz! \n• **!yenile [komut-ismi]**`)
.setTimestamp()
                                          .setColor("0FF09F")
.setFooter('Uptime Manager©'))//alta bak
let komutlar;
if (client.commands.has(args[0])) {
komutlar = args[0];//tmm sa k.g
} else if (client.aliases.has(args[0])) {
komutlar = client.aliases.get(args[0]);
}
if (!komutlar) return message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
.setTimestamp()
.setDescription(`• \`${args[0]}\` adında bir komut bulamadım!`)//unutma renksiz yap embed colorları hep
.setFooter('Uptime Manager©'))
  .setColor("0FF09F")
client.load(komutlar)
message.channel.send(new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL())
.setDescription(`• \`${komutlar}\` adlı komut başarıyla yeniden başlatıldı!`)
.setTimestamp()
                     .setColor("0FF09F")
.setFooter('Uptime Manager©'))
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5//bitti AmQ dc gel
}

exports.help = { 
  name: 'komut-yenile',
  description: "reload",
  usage: 'komut-yenile'
}//rebootda hata var bakarmsn

