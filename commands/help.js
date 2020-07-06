const Discord = require('discord.js');
const fs = require('fs');

commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js') && !file.includes('help.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: 'help',
	cooldown: 10,
	async execute(message, args) {
		helpMsg = "Blonerhelp from Blonerbot:" + commands.reduce((acc, command) => acc + `\n${command.name}: ${command.description} (aliases: ${command.aliases})`)
		message.channel.send(helpMsg);
	},
}; 
