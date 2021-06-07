let usersToReact = {}
let prefix = "!"
const inviteLink = `https://discord.com/oauth2/authorize?client_id=${global.clientId}&scope=bot+applications.commands`
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


function getId(rawId) {
    return rawId.match(/\d+/)[0];
}


function userExists(message, userId) {
    let user = message.guild.members.cache.get(userId);
    if (user === null) {
        message.channel.send("User not valid :x:");
        return false;
    }
    return true;
}

function updateData(user) {
    fs.readFile('data.json', 'utf8', function (err, data) {
        let obj = JSON.parse(data);
        obj.push(user);
        let strNotes = JSON.stringify(obj);
        fs.writeFile('data.json', strNotes, function (err) {
            if (err) return console.log(err);
            console.log('User added');
        });

    })
}

function setReactionToUser(message, args) {
    const userId = getId(args[0])
    const reaction = args[1];
    if (userExists(message, userId)) {
        usersToReact[userId] = reaction
        message.channel.send("Setted reaction!");
        console.log(usersToReact);
    }

    updateData()

}

function setPrefix(message, args) {
    prefix = args[0];
    message.channel.send(`Prefix changed to \`${args[0]}\``);
}

function removeReactionFromUser(message, args) {
    const userId = getId(args[0])
    const reaction = args[1];
    if (userExists(message, userId)) {
        delete usersToReact[userId];
        message.channel.send("Removed user reaction!");
        console.log(usersToReact);
    }
}

const commands = {
    "setReaction": {
        function: setReactionToUser,
        description: "Sets the given reaction to a user"
    },
    "setPrefix": {
        function: setPrefix,
        description: "Sets the given character as the prefix"
    },
    "removeReaction": {
        function: removeReactionFromUser,
        description: "Removes the reaction from the given user"
    }
}

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('Roasting the people you love 💜', {type: 'PLAYING'});
});

//TODO: Remove this token
client.login("ODQ3OTUwMjk5NjQxNDEzNjUw.YLFhQQ.UEz-2FziUN1mqVNnrb2crJuFMb8");

const matiId = "517806671423209473"

client.on('message', message => {
    //If it is a command
    if (message.content.startsWith(prefix)) {
        try {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift();
            if (commands[command] && args.length > 0) {
                //Call the command
                commands[command].function(message, args);
            }
        } catch (e) {
            message.channel.send("Mmmm... nah bruh, you gotta check your inputs!");
            // console.log(e)
        }
    }

    //Reacts to user
    let id = getId(message.author.id)
    if (usersToReact[id]) {
        message.react(usersToReact[id]);
    }

});