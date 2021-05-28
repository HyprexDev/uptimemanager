const Discord = require('discord.js')
const chalk = require('chalk')
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
 try {
  const duration = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
    //  try {
let shardinfo = {
        ping: await client.shard.fetchClientValues('ws.ping'),
        server_count: await client.shard.fetchClientValues('guilds.cache.size'),
        user_count: await client.shard.fetchClientValues('users.cache.size'),
        uptime: await client.shard.fetchClientValues("uptime")
    }
let i = client.shard.ids
    let shardembed = new Discord.MessageEmbed()
    .setTitle('Uptime Manager | Shard Bilgi')
    .setColor("0FF09F")
    .setFooter(`Bu sunucunun shard id: ${client.shard.ids+1}`)
    for(i=0;i<client.shard.count;i++) {
        shardembed.addField(`Shard ${i+1} | Ping: ${Math.round(shardinfo.ping[i])}ms`, `◻️ | ${shardinfo.server_count[i]} Sunucu\n◻️ | ${shardinfo.user_count[i]} Kullanıcı\n◻️ | Uptime süresi: ${moment.duration(shardinfo.uptime[i]).format(`D [Gün] , H [Saat], m [Dakika], s [Saniye]`)} `)
    }
    message.channel.send(shardembed)
       }   catch (err) {
    const ayarlar = require("../ayarlar.json");
    const embed = new Discord.MessageEmbed()
    .setColor("0FF09F")
      .setDescription(
        `Sanırım bir hata oluştu bunu \`' swîtch#0001\` bildir!\nHata: ${err}`
      )
      .setColor("RED")
      .setTimestamp();
    message.channel.send(embed);
                         }
}
exports.conf = {
  enabled: false,
  guildOnly: true,
  aliases: ["eqweqweqw"],
  permLevel: 0,
  kategori: "bot",
};

exports.help = {
  name: 'eqweqwewrqqq',
  description: 'Botun davet linklerini gösterir.',
  usage: 'davet',

};