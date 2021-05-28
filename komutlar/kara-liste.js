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
          `❌ Bu komutu **Sahibim** kullanabilir!`
        )
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );*/

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(
          `❌ Kara listeye alınacak kişinin **ID** girmelisin!`
        )
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );
  let karalisteyealinan = args[0];
  let karalistesebebi = args.slice(1).join(" ");
  let karaliste1 = db.set(`karaliste1_` + karalisteyealinan, "karalistede");
  if (!karalistesebebi)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setDescription(`❌ Kara listeye alınma **sebebini** yazınız.`)
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setDescription(
        `**<@!${karalisteyealinan}>** isimli kullanıcı **${message.author}** tarafından **${karalistesebebi}** sebebi ile botun kara listesine alındı!`
      )
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
  );

  const karalisteembed = new Discord.MessageEmbed()
    .setDescription(
      `**<@!${karalisteyealinan}>** isimli kullanıcı **${message.author}** tarafından **${karalistesebebi}** sebebi ile botun kara listesine alındı!`
    )
    .setTimestamp()
        .setFooter(`Uptime Manager©`, client.user.avatarURL)
  client.channels.cache.get("788471224446877696").send(karalisteembed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: "karaliste",
  description:
    "İstediğiniz Kullanıcıyı Karalisteye Alırsınız Ve Kullanıcı Botu Kullanamaz.",
  usage: "karaliste"
};