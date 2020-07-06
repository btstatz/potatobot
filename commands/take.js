const Discord = require('discord.js');
const Potato = require('../potato.js');
const helpers = require('../helpers.js');

module.exports = {
	name: 'take',
	aliases: ['t'],
	description: 'Take the potato',
	cooldown: 30,
	checkInput(message, args) {
		if (!Potato.enabled) {
			return (`potatobot is currently disabled, use !enable to reactivate it`);
		}
		else if (Potato.party) {
			return (`potatobot is currently deactivated`);
		}
		else if (!message.member.voice.channel) {
			return (`you must be in a voice channel to use this command`);
		}
		else if (!Potato.holder) {
			return (`nobody has the potato right now`);
		}
		else if (!Potato.holder.id == message.member.id) {
			return (`you already have the potato`);
		}
		return;
	},
	async execute(message, args) {
		text = `Allow ${message.author} to take the potato from ${Potato.holder.user}?`;

		await helpers.vote(message, text, this.cooldown, () => {
			Potato.set(message.member);
			message.channel.send(`${message.author} took the potato`, {tts: true});
		});
	},
};