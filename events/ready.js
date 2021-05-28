module.exports = (client) => {
var kullanıcı = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
console.log("Bot başarı ile giriş yaptı.")
client.user.setActivity(`!yardım ${kullanıcı} Kullanıcı | ${client.guilds.cache.size} Sunucu` ,  { type: 'WATCHING', url: 'https://www.twitch.tv/twitchadı' })
}