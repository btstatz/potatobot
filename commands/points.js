const Discord = require('discord.js');

module.exports = {
	name: 'points',
	aliases: [],
	description: 'display points!',
	cooldown: 1,
	async execute(message, args) {
    message.channel.send(message.member.nickname + ' has ' + message.member.blonerpoints + ' blonerpoints!')
	},
}; 
