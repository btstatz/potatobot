const Discord = require('discord.js');
const Potato = require('../potato.js');

module.exports = {
	name: 'lend',
	aliases: ['l'],
	description: 'Temporarily grant someone else speaking privileges',
	cooldown: 20,
	checkInput(message, args) {
		if (!message.member.voice.channel) {
			return (`you must be in a voice channel to use this command`);
		}
		else if (!Potato.enabled) {
			return (`potatobot is currently deactivated`);
		}
		else if (Potato.party) {
			return (`potatobot is in party mode, use !party to disable it`);
		}
		else if (!Potato.holder || message.member.id != Potato.holder.id) {
			return (`you must be holding the potato to lend it`);
		}
		else if (message.mentions.members.size != 1) {
			return `you must specify one person to receive the potato`;
		}
		else if (message.mentions.members.first().voice.channelID != message.member.voice.channelID) {
			return `the person receiving the potato must be in the same voice channel`;
		}
		return;
	},
	async execute(message, args) {
		const duration = this.cooldown;
		
		let recipient = message.mentions.members.first();
		recipient.voice.setMute(false);
		message.channel.send(`${recipient} received a temporary potato`, {tts: true});

		setTimeout(() => {
			if (Potato.holder && Potato.holder.id != recipient.id) {
				recipient.voice.setMute(true);
			}
			message.channel.send(`${message.mentions.members.first()}\'s potato has returned to ${message.author}`);
		}, duration * 1000);
	},
};