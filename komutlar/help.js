const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message) {
 
  const evet = client.emojis.cache.get("788560456733163540");
  const hayir = client.emojis.cache.get("788560409539510313");
  const ayar = client.emojis.cache.get("788560971202691093");
  const mavi = client.emojis.cache.get("788560197412323349");
  const info = client.emojis.cache.get("785071900036431872");
  
const embed = new Discord.MessageEmbed()
.setAuthor('Uptime Manager | Yardım Menüsü', client.user.avatarURL())
.setTimestamp()
.setColor("0FF09F")
.setThumbnail(client.user.avatarURL())
.setDescription(`
${info} Bilgilendirme
> Merhaba, ${message.author}!
> Prefixim: **${ayarlar.prefix}** (Bu Özellik Yakında Ayarlanabilir Olacak!)
> Botun Dili: 🇹🇷

${ayar} **__${ayarlar.prefix}yardım-uptime__**
${mavi} Uptime kategorisi için yardım menüsünü gösterir.
${ayar} **__${ayarlar.prefix}yardım-bot__**
${mavi} Bot kategorisi için yardım menüsünü gösterir.
${ayar} **__${ayarlar.prefix}yardım-sahip__**
${mavi} Sahip kategorisi için yardım menüsünü gösterir.
`)
.setImage("https://cdn.discordapp.com/attachments/784160146749390928/784901371207352320/standard_8.gif")

.setFooter("Uptime Manager©", client.user.avatarURL())
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['y', 'yardım'], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};