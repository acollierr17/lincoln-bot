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
                    let channel = message.guild.channels.find(c => c.name === updated) || message.mentions.channels.first();

                    if (channel) {
                        await client.updateGuild(message.guild, { welcomeChannel: channel.id });
                        return message.channel.send(`The welcome channel has been updated to: ${channel}`);
                    } else {
                        return message.channel.send('Channel not was not found!');
                    }
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`Current welcome channel: ${settings.welcomeChannel ? `<#${settings.welcomeChannel}>` : 'None'}`);
            break;
        }
        case 'welcomeMsg': {
            if (updated) {
                try {
                    if (updated.match(/^.*?{{user}}.*?{{guild}}.*$/g)) {
                        await client.updateGuild(message.guild, { welcomeMsg: updated });
                        return message.channel.send(`The welcome message was been updated to: \`${updated}\``);
                    } else {
                        return message.channel.send('Please use the parameters: `{{user}}` and `{{guild}}`!');
                    }
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`The current welcome message is: \`${settings.welcomeMsg || 'None'}\``);
            break;
        }
        case 'modRole': {
            if (updated) {
                try {
                    let role = message.guild.roles.find(r => r.name === updated) || message.mentions.roles.first();

                    if (role) {
                        await client.updateGuild(message.guild, { modRole: role.id });
                        return message.channel.send(`The mod role has been updated to: \`${role.name}\``);
                    } else {
                        return message.channel.send('Role was not found!');
                    }
                } catch(error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`The current mod role is: \`${settings.modRole ? `${message.guild.roles.get(settings.modRole).name}` : 'None'}\``);
            break;
        }
        case 'adminRole': {
            if (updated) {
                try {
                    let role = message.guild.roles.find(r => r.name === updated) || message.mentions.roles.first();

                    if (role) {
                        await client.updateGuild(message.guild, { adminRole: role.id });
                        return message.channel.send(`The admin role has been updated to: \`${role.name}\``);
                    } else {
                        return message.channel.send('Role was not found!');
                    }
                } catch(error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`The current admin role is: \`${settings.adminRole ? `${message.guild.roles.get(settings.adminRole).name}` : 'None'}\``);
            break;
        }
        default: {
            let { prefix, welcomeChannel, welcomeMsg, modRole, adminRole } = settings;

            message.channel.send(`**Default settings:**\n\nPrefix: ${prefix ? prefix : client.config.prefix}\nWelcome channel: ${welcomeChannel ? `<#${welcomeChannel}>` : 'None'}\nWelcome message: \`${welcomeMsg || 'None'}\`\nMod role: \`${modRole ? `${message.guild.roles.get(modRole).name}` : 'None'}\`\nAdmin role: \`${adminRole ? `${message.guild.roles.get(adminRole).name}` : 'None'}\``);
            break;
        }
    }
};

exports.help = {
    name: 'config'
};