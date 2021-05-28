const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (app, message, client) => {
  const uptm = new Discord.MessageEmbed()
  .setTitle("Uptime Manager | Ping Hesaplanıyor")
  .setFooter("Uptime Manager©")
  .setTimestamp()
  .setDescription('Lütfen bekleyiniz **Uptime Manager** botun pingi hesaplanıyor...')
  .setColor("0FF09F")
   let start = Date.now(); 
   let mesaj = await message.channel.send(uptm)
   let diff = (Date.now() - start); 
   let API = (app.ws.ping).toFixed(2)
   setInterval(() => {
   const uptimemanager = new Discord.MessageEmbed()
   .setTitle("Uptime Manager | Ping")
   .setColor("0FF09F")
   .setFooter("Uptime Manager©")
   .setTimestamp()
   .setDescription(`Mesaj gecikme süresi; **${diff}ms**\nBot gecikme süresi; **${API}ms**`)
   mesaj.edit(uptimemanager);
   }, 5000)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Botun Pingin, Ölçer',
  usage: 'ping'
};