const { RichEmbed } = require("discord.js");

exports.run = async (client, message, args, settings) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You don't meet the requirements to manage my settings!!");

    const setting = args[0];

    switch (setting) {
        case 'prefix': {
            const prefix = args.slice(1).join(" ");
            if (!prefix) return message.channel.send(`Please provied me a prefix, ${message.author}`);

            if (prefix) {
                    await client.updateGuild(message.guild, { prefix: prefix });
                    return message.channel.send(`Prefix has been updated to: \`${prefix}\``).catch(e => console.log(e));
            }

            message.channel.send(`Current prefix: ${settings.prefix ? `settings.prefix` : `client.config.prefix`}`);
            break;
        }
        case 'welcomeChannel': {

            const channel = message.mentions.channels.first();
            if (!channel) return message.channel.send(`Please mention a channel, ${message.author}`);

            if (channel) {
                await client.updateGuild(message.guild, {
                    welcomeChannel: channel.id});
                    return message.channel.send(`Welcome channel has been set to ${channel}`).catch(e => console.log(e));
            }
        message.channel.send(`Current welcome channel: ${settings.welcomeChannel ? `<#settings.welcomeChannel>` : "None"}`);
            break;
        }
        case 'welcomeMsg': {
            
            const message = args.slice(1).join(" ");
            if(!message) return message.channel.send(`Please provided me a welcome message , ${message.author}`);

            const properusage = message.match(/^.*?{{user}}.*?{{guild}}.*$/g);
            if(!properusage) return message.channel.send(`Please use the parameters: \`{{user}}\` and \`{{guild}}\`!`);

            if(properusage) {
                await client.updateGuild(message.guild, {
                    welcomeMsg: properusage
                });

            return message.channel.send(`Welcome message has been updated to : ${properusage}`).catch(e => console.log(e));
            
        }

        message.channel.send(`The current welcome message is: ${settings.welcomeMsg ? settings.welcomeMsg : client.config.defaultSettings.welcomeMsg}`);

            break;
        }
        case 'modRole': {

            const role = message.mentions.roles.first();
            if(!role) return message.channel.send(`Please mention the role, ${message.author}`);

            if(role) {
                await client.updateGuild(message.guild, { modRole: role.id});

                return message.channel.send(`Mod role has been updated to ${role.name} with id ${role.id}`);
            }

            message.channel.send(`The current Mod role is: ${settings.modRole ? message.guild.roles.get(settings.modRole).name: client.config.defaultSettings.modRole}`);

            break;
        }
        case 'adminRole': {

            const role = message.mentions.roles.first();
            if(!role) return message.channel.send(`Please mention the role , ${message.author}`);

            if(role) {
                await client.updateGuild(message.guild, { adminRole: role.id});

                return message.channel.send(`Admin role has been updated to ${role.name} with id ${role.id}`);
            }

            message.channel.send(`The current Admin role is: ${settings.adminRole ? message.guild.roles.get(settings.adminRole).name: client.config.defaultSettings.adminRole}`);
         
            break;
        }
        default: {

            const { welcomeChannel, welcomeMsg, modRole, adminRole, prefix } = settings;
            const embed = new RichEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
            .setFooter(`${client.user.tag}`, client.user.displayAvatarURL)
            .setTitle(`${message.guild.name} Configuration Menu`)
            .addField("❯ Welcome Channel:", `${welcomeChannel ? `<#welcomeChannel>`: "Not Set"}`)
            .addField("❯ Welcome Message:", `${welcomeMsg ? welcomeMsg : client.config.defaultSettings.welcomeMsg}`)
            .addField("❯ Mod Role:", `${modRole ? `<@&${modRole}>`: client.config.defaultSettings.modRole}`)
            .addField("❯ Admin Role:", `${adminRole ? `<@&${adminRole}>`: client.config.defaultSettings.adminRole}`)
            .addField("❯ Prefix:", `${prefix ? `${prefix}`: client.config.prefix}`)
            .setThumbnail(message.guild.iconURL)
            .setTimestamp();
            message.channel.send(embed);
            break;
        }
    }
};

exports.help = {
    name: 'config'
};
