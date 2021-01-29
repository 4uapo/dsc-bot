const Discord = require('discord.js');
const settings = require('./settings.json');

const bot = new Discord.Client({ disableEveryone: true });

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("unloveable...", { type: "PLAYING" })
})

bot.on('message', async message => {
    if (message.author.bot || message.channel.type === "dm") return;

    let prefix = settings.prefix
    let messageArray = message.content.split(" ")
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (command === `${prefix}help`) { // main help Embed
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle('Unloveable Help')
            .addField('ping', 'Test Command')
            .addField('purge', 'purge messages in the chat')
            .addField('react', 'reacts to the author\'s message')
            .setFooter('soon', message.author.displayAvatarURL())
            .setTimestamp()
            .setColor('#36393e')
        message.channel.send(helpEmbed)
    } else
        if (command === `${prefix}ping`) { // ping command ; test cmd
            message.channel.send('Pong :guitar:')
        } else
            if (command === `${prefix}purge`) { // aka. clear command
                if (message.deletable) {
                    message.delete();
                }

                if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                    return message.channel.send('Missing the following perms: MANAGE_MESSAGES.').then(m => m.delete(5000));
                }

                if (isNaN(args[0]) || parseInt(args[0]) > 100) {
                    deleteAmount = 100;
                } else {
                    deleteAmount = parseInt(args[0]);
                }

                message.channel.bulkDelete(deleteAmount, true)
                return message.channel.send('I\'ve Purged the chat.')
                    .catch(err => message.channel.send(`Something went wrong:${err}`));
            } else
                if (command === `${prefix}react`) { // reacts with a msg
                    try {
                        await message.react('💔');
                        await message.react('😵')
                    } catch (error) {

                    }
                }
})


bot.login(settings.token)