const inviteLink = `https://discord.com/oauth2/authorize?client_id=${global.clientId}&scope=bot+applications.commands`
const {accounts} = require('./accounts.js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Roasting the people you love 💜', {type: 'PLAYING'});

});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
    accounts.forEach(account => {
        if (message.author.id === account.id && account.isTrolo) {
            message.react("🏳️‍🌈");
        }
    });

    if (message.content.toLowerCase().includes("epi")) {
        const epiEmoji = message.guild.emojis.cache.find(emoji => emoji.name === "epi");
        message.react(epiEmoji);
    }
});