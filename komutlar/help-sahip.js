const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message) {
 
  const evet = client.emojis.cache.get("788560456733163540");
  const hayir = client.emojis.cache.get("788560409539510313");
  const ayar = client.emojis.cache.get("788560971202691093");
  const mavi = client.emojis.cache.get("788560197412323349");
  const info = client.emojis.cache.get("785071900036431872");
  
const embed = new Discord.MessageEmbed()
.setAuthor('Uptime Manager | Sahip Menüsü', client.user.avatarURL())
.setTimestamp()
.setColor("0FF09F")
.setThumbnail(client.user.avatarURL())
.setDescription(`
${info} Bilgilendirme
> Merhaba, ${message.author}!
> Prefixim: **${ayarlar.prefix}** (Bu Özellik Yakında Ayarlanabilir Olacak!)
> Botun Dili: 🇹🇷

${ayar} **__${ayarlar.prefix}kara-liste__**
${mavi} Belirtilen kullanıcı İDsini botun kara listesine alan komut.
${ayar} **__${ayarlar.prefix}beyaz-liste__**
${mavi} Belirtilen kullanıcı İDsini botun beyaz listesine alan komut.
${ayar} **__${ayarlar.prefix}eval__**
${mavi} Girilen kodu çalıştıran komut.
${ayar} **__${ayarlar.prefix}komut-yenile__**
${mavi} Girilen komut ismini yeniden başlatan komut.
${ayar} **__${ayarlar.prefix}reboot__**
${mavi} Botu yeniden başlatan komut.`)
.setImage("https://cdn.discordapp.com/attachments/784160146749390928/784901371207352320/standard_8.gif")

.setFooter("Uptime Manager©", client.user.avatarURL())
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım-sahip',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım-sahip'
};