const inviteLink = `https://discord.com/oauth2/authorize?client_id=${global.clientId}&scope=bot+applications.commands`

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Roasteando a Mati 🏳️‍🌈', {type: 'PLAYING'});

});

client.login(process.env.BOT_TOKEN);

const matiId = "517806671423209473"
client.on('message', message => {
    if (message.author.id === matiId) {
        message.react("🏳️‍🌈");
    }
});