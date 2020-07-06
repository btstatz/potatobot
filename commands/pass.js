const Discord = require('discord.js');
const Potato = require('../potato.js');

module.exports = {
	name: 'pass',
	aliases: ['p'],
	description: 'Grant someone else speaking privileges',
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
			return (`you must be holding the potato to pass it`);
		}
		else if (message.mentions.members.size != 1) {
			return `you must specify one person to receive the potato`;
		}
		else if (message.mentions.members.first().voice.channelID != message.member.voice.channelID) {
			return `the person receiving the potato must be in the same voice channel`;
		}
		return;
	},
	execute(message, args) {
		Potato.set(message.mentions.members.first());
		message.channel.send(`${message.author} passed the potato to ${message.mentions.members.first()}`, {tts: true});
	},
};