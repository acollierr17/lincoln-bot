exports.run = async (client, message, args, settings) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    await client.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(`Prefix has been updated to: \`${updated}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`Current prefix: \`${settings.prefix}\``);
            break;
        }
        case 'welcomeChannel': {
             if (updated) {
               try {
                const channel = message.guild.channels.find(c => c.name === updated) || message.mentions.channels.first();
                if (!channel) return message.reply('could not find channel');

                await client.updateGuild(message.guild, { welcomeChannel: channel.id });
                return message.channel.send(`Updated channel to: ${channel}`);
               } catch (e) {
                   console.log(e);
                   message.channel.send(`An error occurred: **${e.message}**`);
               }
             }
                message.reply(`Usage: ${client.config.prefix}config welcomeChannel #<Channel> or the name of the channel`);
             
            break;
        }
        case 'welcomeMsg': {
            if (updated) {
                try {
                    if (!updated.includes('{{user}}' && '{{guild}}')) {
                        return message.reply('Welcome message must include {{user}} and {{guild}}');
                    }

                    await client.updateGuild(message.guild, { welcomeMsg: updated });
                    return message.channel.send(`Updated message to: **${updated}**`);
                } catch (e) {
                    console.log(e);
                    message.channel.send(`An error occurred: **${e.message}**`);
                }
            }
                message.reply(`Usage: ${client.config.prefix}config welcomeMsg <message> {{user}} specify the user that join and {{guild}} specify the guild and must be included`);

            break;
        }
        case 'modRole': {
            if (updated) {
                try {
                    const role = message.guild.roles.find(r => r.name === updated) || message.mentions.roles.first();
                    if (!role) return message.reply('could not find role');

                    await client.updateGuild(message.guild, { modRole: role.id });
                    return message.channel.send(`Updated role to: ${role}`);
                } catch (e) {
                    console.log(e);
                    message.channel.send(`An error occurred: **${e.message}**`);
                }
            }
            message.reply(`Usage: ${client.config.prefix}config modRole @<role> or the name of the role`);

            break;
        }
        case 'adminRole': {
            if (updated) {
                try {
                    const role = message.guild.roles.find(r => r.name === updated) || message.mentions.roles.first();
                    if (!role) return message.reply('could not find role');

                    await client.updateGuild(message.guild, { adminRole: role.id });
                    return message.channel.send(`Updated role to: ${role}`);
                } catch (e) {
                    console.log(e);
                    message.channel.send(`An error occurred: **${e.message}**`);
                }
            }
            message.reply(`Usage: ${client.config.prefix}config adminRole @<role> or the name of the role`);
            
            break;
        }
        default: {
            const skip = ['_id', 'guildID', 'guildName', 'ownerID', 'ownerUsername', '__v'];
            const values = [];

            Object.entries(settings._doc)
            .filter(f => {
                if (!skip.some(v => f.includes(v))) {
                    const name = f[0].toString();
                    const value = f[1].toString();

                    values.push(`${name} : ${value}`);
                    return values;
                }
            });
            message.channel.send(`Settings List With current Settings \n\n${values.map(m => `${m}${''.repeat(m.length)}`).join('\n')}`, {code: 'asciidoc'});

            break;
        }
    }
};

exports.help = {
    name: 'config'
};