const Discord = require('discord.js');

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: 'help',
	cooldown: 10,
	async execute(message, args) {
		message.channel.send(`git gud scrub`);
	},
};