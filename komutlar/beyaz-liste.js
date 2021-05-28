const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  var prefix = db.get(`prefix_${message.guild.id}`) || ayarlar.prefix;

  /*if(message.author.id !== ayarlar.sahip)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `❌ Bu komutu **Sahibim** kullanabilir.`
        )
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );*/

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `❌ Beyaz listeye alıncak kişinin**ID** girmelisin!`
        )
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );

  let karalisteyealinan = args[0];
  let karalistesebebi = args.slice(1).join(" ");
  let karaliste1 = db.delete(`karaliste1_` + karalisteyealinan);
  if (!karalistesebebi)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`❌ Beyaz listeye alınma **sebebini** yazınız!`)
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `**<@!${karalisteyealinan}>** isimli kullanıcı **${message.author}** tarafından **${karalistesebebi}** sebebi ile botun beyaz listesine alındı.`
      )
        .setFooter(`${client.user.username} - Tüm hakları saklıdır.`, client.user.avatarURL)
  );
  const beyazlisteembed = new Discord.MessageEmbed()
    .setDescription(
      `**<@!${karalisteyealinan}>** isimli kullanıcı **${message.author}** tarafından **${karalistesebebi}** sebebi ile botun beyaz listesine alındı.`
    )
    .setTimestamp()
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
  client.channels.cache.get("788471256293834802").send(beyazlisteembed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: "beyazliste",
  description:
    "İstediğiniz Kullanıcıyı Beyaz Listeye Alırsınız Ve Kullanıcı Botu Kullanabilir.",
  usage: "beyazliste"
};