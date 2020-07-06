const Discord = require('discord.js');
const Potato = require('../potato.js');

module.exports = {
	name: 'claim',
	aliases: ['c'],
	description: 'Claim speaking privileges',
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
		else if (Potato.holder) {
			return (`someone already has the potato`);
		}
		else if (Potato.cooldown) {
			return (`the potato is currently on cooldown`);
		}
		return;
	},
	execute(message, args) {
		Potato.set(message.member);
		message.channel.send(`${message.author} claimed the potato`, {tts: true});
	},
};