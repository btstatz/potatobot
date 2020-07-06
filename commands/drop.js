const Discord = require('discord.js');
const Potato = require('../potato.js');

module.exports = {
	name: 'drop',
	aliases: ['d'],
	description: 'Let go of the potato',
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
			return (`you must be holding the potato to drop it`);
		}
		return;
	},
	execute(message, args) {
		Potato.reset();
		message.channel.send(`${message.author} dropped the potato`, {tts: true});
	},
};