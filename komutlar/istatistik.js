const Discord = require('discord.js');
const moment = require("moment");
const os = require("os");
require("moment-duration-format");
const db = require("quick.db");

exports.run = (client, message, args) => {
let em = client.emojis.cache.get("785161208696406016");
const sistem = process.cpuUsage().system
const user = process.cpuUsage().user
const sonuc = user-sistem
const data = user/100
const data2 = "%"+sonuc/data

let uptimemanager = new Discord.MessageEmbed()
.setTimestamp()
.setAuthor(client.user.username, client.user.avatarURL({dynamic: true}))
.setThumbnail(message.author.avatarURL({dynamic: true}))
.setFooter(`© Uptime Manager`, client.user.avatarURL())
.setColor("0FF09F")
.setDescription(`**👑 Bot Sahipleri**
<@340585082236567552> | <@789246231716036619> | <@807269800635531304> | <@696501928162492467>

Çalışma Süresi: **${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye] ")}**
DiscordJS Sürümü: **${Discord.version}**
NodeJS Sürümü: **${process.version}**
Bot Sürümü: **0.0.3**
Platform: **${os.platform()} (${os.type()} ${os.arch()}) - ${os.release()}**
CPU: **${os.cpus().shift().model}**
CPU Hızı: **${os.cpus().shift().speed} MHz**
CPU Çekirdeği: **${os.cpus().length / 2} Core / ${os.cpus().length} Thread**
Toplam Bellek: **512 Megabyte**
Bellek Kullanımı: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Megabyte**`)//alo

message.channel.send(uptimemanager)

};

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ["i", "ista"], 
  permLevel: 0 
};

exports.help = {
  name: 'istatistik' };