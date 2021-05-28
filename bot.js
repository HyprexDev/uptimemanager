const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const kontrol = require("node-fetch");
const Database = require('plasma-db');
const Data = new Database('./database.json');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Uptime Manager Tekrardan Aktif!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 500000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (ayarlar.sahip.includes(message.author.id)) permlvl = 5; 

    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

setInterval(() => {
const linkler = db.fetch('chimped');
if(linkler) {
if(linkler.length > 0) {
linkler.forEach(s => {
kontrol(s.site).catch(err => {
console.log('');
console.log(`${s.site} hata verdi. Sahibi: ${s.sahipTag}`);
console.log('');
})
console.log(`${s.site} uptime edildi. Sahibi: ${s.sahipTag}`);
})
}
}
}, 60000)
//KOMUTLAR BURA


//KOMUTLAR BİTİŞ
client.login(ayarlar.token);
//esetInterval((//kodu sil direk kanallari sildm ztn
client.on("guildCreate", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "785209098621681691" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
const embed = new Discord.MessageEmbed()
.setTitle(`Uptime Manager | Bir Sunucuya Eklendi!`)
.setColor("0FF09F")
.addField(`◻️ | Sunucu Adı`, guild.name)
.addField(`◻️ | Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
.addField(`◻️ | Sunucu Üye Sayısı`, guild.memberCount)
.setFooter("Uptime Manager©")
.setTimestamp()
client.channels.cache.get(kanal).send({embed: embed}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})
//
  
//Atıldım
client.on("guildDelete", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "785209234592759809" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
const embeds = new Discord.MessageEmbed()
.setTitle(`Uptime Manager | Bir Sunucudan Atıldı!`)
.setColor("0FF09F")
.addField(`◻️ | Sunucu Adı`, guild.name)
.addField(`◻️ | Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
.addField(`◻️ | Sunucu Üye Sayısı`, guild.memberCount)
.setFooter("Uptime Manager©")
.setTimestamp()
client.channels.cache.get(kanal).send({embed: embeds}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})

//client.on("guildCreate", guild => {

//let plasmiccode = "785209234592759809"

//if (guild.memberCount <  10) { //kişi sınırını ayarlayabilirsiniz

//guild.leave()

//return client.channels.cache.get(plasmiccode).send("Eklendiğim sunuculardan birisi 10 üye altında olduğu için çıktım.")
//};
//}); //Plasmic Code・xKqntyZ_

client.on("message", async message => {
  if (message.content === "!yardım") {
    try {
      await message.react("794015494439960576");
    } catch (error) {
      console.error("Faild.");
    }
  }
});

client.on('message', message => {
if (message.mentions.users.first()) { if (message.mentions.users.first().id === client.user.id){
message.channel.send(`Hey, ${message.author}! Sanırım mesajında benden bahsetmişsin. Kendimi tanıtayım; Adım **Uptime Manager** Prefixim **!** Hizmet verdiğim kullanıcı sayısı **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** Hizmet verdiğim sunucu sayısı ise **${client.guilds.cache.size}!** Bana destek çıkmak için beni **!davet** yazarak ekleyebilir ve destek sunucuma katılabilirsin!`)
}}});

client.on("ready", async () => {

    client.user.setActivity(`!yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı | ${client.guilds.cache.size} Sunucu`, { type: 'WATCHING', url: 'https://twitch.tv/twitchadı' })
})

client.on("guildCreate", async guild => {
      client.user.setActivity(`!yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı | ${client.guilds.cache.size} Sunucu`, { type: 'WATCHING', url: 'https://twitch.tv/twitchadı' })
})

client.on("guildDelete", guild => {
      client.user.setActivity(`!yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı | ${client.guilds.cache.size} Sunucu`, { type: 'WATCHING', url: 'https://twitch.tv/twitchadı' })
})

client.on("guildMemberAdd", async member => {
  client.user.setActivity(`!yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı | ${client.guilds.cache.size} Sunucu`, { type: 'WATCHING', url: 'https://twitch.tv/twitchadı' })
})

client.on("guildMemberRemove", member => {
  client.user.setActivity(`!yardım ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Kullanıcı | ${client.guilds.cache.size} Sunucu`, { type: 'WATCHING', url: 'https://twitch.tv/twitchadı' })
})

//ient.on("guildCreate", guild => {

//let pinkcode = "788420619985092638"

//f (guild.memberCount <  20) { //kişi sınırını ayarlayabilirsiniz

//guild.leave()

//return client.channels.cache.get(pinkcode).send(`${guild.name} Adlı sunucudan otomatik olarak çıkış işlemimi gerçekleştirdim. ✅`)
//};
//});
