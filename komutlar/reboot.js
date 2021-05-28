const Discord = require('discord.js');
const moment = require('moment');

exports.run = (client, message, params) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Uptime Manager | Reboot")
  .setColor("0FF09F")
  .setDescription(`${message.author}, botu yeniden başlatmak istediğine eminmisin? Eyer eminsen 10 saniye içinde **evet** yaz lütfen!`)

 //k.gbeyv
message.channel.send(embed);



  message.channel.awaitMessages(response => response.content === "evet", {
    max: 1,
    time: 10000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.send(`${message.author}, **Uptime Manager** yeniden başlatıldı!`).then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Bot yeniden başlatılıyor...`)
      process.exit(0);
    }).catch(console.error)
    })
    .catch(() => {
      message.channel.send(`${message.author} 10 saniye içinde **evet** yazmadığınız için **Uptime Manager** adlı botun yeniden başlatılma işlemi iptal edildi!`);
    });
//yaptım ok
}//altta hata
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [`yb`],
  permLevel: 5
};

exports.help = {
  name: 'reboot',
  description: '[Admin Komutu]',
  usage: 'reboot'
};
  