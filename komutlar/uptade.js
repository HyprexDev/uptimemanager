const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { 
  
  const manager = new Discord.MessageEmbed()
  .setTitle("Uptime Manager | Güncellemeler")
  .setFooter("Uptime Manager©")
  .setTimestamp()
  .setColor("0FF09F")
  .setDescription(`**Bota Getirilen Son Güncellemeler**
  
Bottaki bazı __**Hata**__ düzeltmeleri yapıldı!
  
**Botun Şuanki Sürümü**
  
Bot Sürümü: __**v0.0.3**__`)
  
 message.channel.send(manager)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ['']
}

exports.help = {
  name: 'güncellemeler',
  description: 'Yardım Menüsünü Açar',
  usage: 'güncellemeler'
}