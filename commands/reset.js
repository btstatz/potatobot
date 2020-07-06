const Discord = require('discord.js');
const Potato = require('../potato.js');
const helpers = require('../helpers.js');

module.exports = {
	name: 'reset',
	aliases: ['r'],
	description: 'Unmute everyone',
	cooldown: 30,
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
		return;
	},
	async execute(message, args) {
		text = `Reset potato?`;
		await helpers.vote(message, text, this.cooldown, () => {
			Potato.reset();
			message.channel.send(`Potato has been reset, it can be claimed again in 60 seconds`);

			Potato.cooldown = true;
			setTimeout(() => {Potato.cooldown = false}, 60000);
		});
	},
};