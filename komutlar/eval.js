const Discord = require("discord.js");
const bot = new Discord.Client();
const moment = require("moment");
const ayarlar = require("../ayarlar.json");
const util = require("util");

module.exports.run = async (client, message, args) => {
  if (!ayarlar.sahip.includes(message.author.id)) {
    return message.delete({ timeout: 100 });
  }
  if (!args[0] || args[0].includes("token"))
    return message.channel.send(`❌ Bir kod girmelisin!`).then(a => {
      a.delete({ timeout: 100 });
      message.delete({ timeout: 200 });
    });

  const code = args.join(" ");
  try {
    var evaled = clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
      evaled
        .replace("token", "Tokenmi? Sana yok.")
        .replace(
          client.token,
          "Tokenmi? Sana yok."
        )
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Tokenmi? Sana yok."
        );
    message.channel.send(
      `${evaled
        .replace(
          client.token,
          "Tokenmi? Sana yok."
        )
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Tokenmi? Sana yok."
        )}`,
      { code: "js", split: true }
    );
  } catch (err) {
    message.channel.send(err, { code: "js", split: true });
  }

  function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5
};

module.exports.help = {
  name: "eval"
}; 