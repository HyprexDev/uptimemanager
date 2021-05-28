const Discord = require("discord.js");
const data = require("quick.db");
const moment = require("moment");
const kontrol = require("node-fetch");
const checker = require("site-checker");
const ayarlar = require("../ayarlar.json");
const Database = require('plasma-db');
const Data = new Database('./database.json');
moment.locale("tr");

exports.run = async (client, message, args) => {
  //if (message.author.id !== message.guild.ownerID)
    //return message.channel.send(
      //':x: Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!"
    //);
  message.delete();
  let argümanlar = ["ekle", "sil", "liste", "bot-say"];
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor("0FF09F")
        .setDescription(
          `・ Yanlış kullanım tespit edildi. Komutlar şu şekildedir;

**${ayarlar.prefix}uptime ekle [link]** : Botunuzu **uptime** edersiniz!
**${ayarlar.prefix}uptime bot-say** : Uptime edilen botları sayar!
**${ayarlar.prefix}uptime liste** : Uptime edilen botlarınızı listelersiniz!`
        )
        .setTimestamp()
        .setFooter("Uptime Manager©")
    );
  if (!argümanlar.includes(args[0].toLowerCase()))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor("0FF09F")
        .setDescription(
          `・ Yanlış kullanım tespit edildi. Komutlar şu şekildedir;

**${ayarlar.prefix}uptime ekle [link]** : Botunuzu **uptime** edersiniz!
**${ayarlar.prefix}uptime bot-say** : Uptime edilen botları sayar!
**${ayarlar.prefix}uptime liste** : Uptime edilen botlarınızı listelersiniz!`
        )
        .setTimestamp()
        .setFooter("Uptime Manager©")
    );
  //return message.channel.send('Geçersiz argüman girdin.\nBu komut için geçerli argümanlar: '+argümanlar.join(', '))

  if (args[0].toLowerCase() === "ekle") {
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`・ Bir link belirtmelisin!`)
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    if (!args[1].startsWith("https://", ".glitch.me/"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(
            `・ Geçersiz bir link girdiniz. **https://** ile başlamasına dikkat et!`
          )
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    const linkler = await data.fetch("chimped");
    if (linkler) {
      if (linkler.find(a => a.site === args[1]))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(`・ Böyle bir link zaten ekli. Bir daha ekleyemem!`)
            .setTimestamp()
            .setColor("0FF09F")
            .setFooter("Uptime Manager©")
        );
    }
    data.push("chimped", {
      site: args[1],
      sahipID: message.author.id,
      sahipTag: message.author.tag,
      sahipName: message.author.username,
      eklenmeTarihi: moment(Date.now()).format("DD/MM/YYYY HH:mm")
    });
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`・ Botunuz başarıyla **Uptime** edildi!`)
        .setTimestamp()
        .setColor("0FF09F")
        .setFooter("Uptime Manager©")
    );
    client.channels.cache
      .get("784165398736011315")
      .send(
        `・ \`${message.author.tag}\` adlı kişinin ${
          args[1]
        } linkine sahip botu **Uptime Sistemi'**ne başarıyla eklendi. \n・ Eklenme Tarihi: **${moment(
          Date.now()
        ).format("DD/MM/YYYY HH:mm")}**`
      );
    client.channels.cache.get("784165398736011315").send(`\`\`\`
${message.author.id}
\`\`\``);
  }

  if (args[0].toLowerCase() === "sil") {
    const linkler = await data.fetch("chimped");
    if (!linkler)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setColor("0FF09F")
          .setDescription(`・ Daha önce hiç link eklenmemiş!`)
          .setTimestamp()
          .setFooter("Uptime Manager©")
      );
    if (!args[1])
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setTimestamp()
          .setDescription(`・ Bir link belirtmelisiniz!`)
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    if (!args[1].startsWith("https://", ".glitch.me/"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(
            `・ Geçersiz bir link girdiniz. sitenin **https://** sonunu ise **.glitch.me** ile başlayıp bitmesine dikkat et!`
          )
          .setColor("0FF09F")
          .setTimestamp()
          .setFooter("Uptime Manager©")
      );
    if (
      !linkler
        .filter(a => a.sahipID === message.author.id)
        .find(c => c.site === args[1])
    )
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(
            `• Uptime ettiğin botlar arasında böyle bir link bulamadım!`
          )
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    if (!linkler.find(a => a.site === args[1]))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(
            `・ Uptime edilen botlar arasında böyle bir link bulamadım!`
          )
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    if (linkler.length == 1) {
      data.delete("chimped");
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(
            `• <@${message.author.id}> uptime edilen linkin başarıyla sistemden kaldırıldı!`
          )
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    } else {
      let ex = [];
      linkler.forEach(db => {
        if (db.site === args[1]) return;
        ex.push(db);
        data.set("chimped", ex);
      });
      message.author
        .send(
          new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTimestamp()
            .setDescription(
              `・ \`${
                args[1]
              }\` adlı linkin başarıyla sistemden kaldırıldı! Şuanda toplam **${linkler.filter(
                c => c.sahipID === message.author.id
              ).length - 1}** linkin uptime ediliyor!`
            )
            .setColor("0FF09F")
            .setFooter("Uptime Manager©")
        )
        .then(
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor("0FF09F")
              .setAuthor(message.author.username, message.author.avatarURL())
              .setDescription(
                `・ Uptime sisteminden sildiğin linki sana **DM'**den yolladım!`
              )
              .setFooter("Uptime Manager©")
          )
        );
      client.channels.cache
        .get("784165398736011315")
        .send(
          `・ \`${message.author.tag}\` adlı kişinin ${
            args[1]
          } adlı linkini başarıyla sistemden kaldırdı! \n• Kaldırılma Tarihi: **${moment(
            Date.now()
          ).format("DD/MM/YYYY HH:mm")}**`
        );
    }
  }
  if (args[0].toLowerCase() === "bot-say") {
    const linkler = await data.fetch("chimped");
    const embed = new Discord.MessageEmbed()
      .setTitle("Uptime Edilen Botlar")
      .setDescription(
        `・Şuanda toplam **${
          linkler.length
        }** bot uptime ediliyor. Bunlardan **${
          linkler.filter(s => s.sahipID === message.author.id).length
        }** tanesi senin **Uptime** ettiğin botlardır!`
      )
      .setFooter("Uptime Manager©")
      .setColor("0FF09F")
      .setTimestamp();
    message.channel.send(embed);
  }
  if (args[0].toLowerCase() === "liste") {
    const linkler = await data.fetch("chimped");
    if (!linkler)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`・ Daha önce hiç bir bot uptime edilmemiş!`)
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );
    if (!linkler.filter(a => a.sahipID === message.author.id))
      return message.channel.send(
        new Discord.MessageEmbed()
          .seAuthor(message.author.username, message.author.avatarURL())
          .setDescription(`・ Daha önce hiç bot uptime etmemişsin!`)
          .setTimestamp()
          .setColor("0FF09F")
          .setFooter("Uptime Manager©")
      );

    const embed = new Discord.MessageEmbed()
      .setColor("0FF09F")
      .setAuthor(message.author.username, message.author.avatarURL());
    linkler
      .filter(a => a.sahipID === message.author.id)
      .forEach(s => {
        embed.addField(s.site, `・ Eklenme tarihi: ${s.eklenmeTarihi}`);
      });
    message.author
      .send(
        embed
          .setDescription(
            `・ Uptime ettiğin **${
              linkler.filter(a => a.sahipID === message.author.id).length
            }** link bulundu.`
          )
          .setFooter("Uptime Manager©")
      )
      .then(
        message.channel.send(
          new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setDescription(
              `・ Uptime edilen botlarının linklerini **DM'**den yolladım!`
            )
            .setTimestamp()
            .setColor("0FF09F")
            .setFooter("Uptime Manager©")
        )
      );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "uptime"
};
