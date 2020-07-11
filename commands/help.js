const Discord = require('discord.js');
const fs = require('fs');

var commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js') && !file.includes('help.js'));
for (const file of commandFiles) {
	const command = require(`./${file}`);
	commands.set(command.name, command);
}

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: 'help',
	cooldown: 10,
	async execute(message, args) {
		let helpMsg = commands.reduce((acc, command) => acc + `\n${command.name}: ${command.description} (aliases: ${command.aliases})`, "Blonerhelp from Blonerbot:")
		message.channel.send(helpMsg);
	},
}; 
