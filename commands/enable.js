const Discord = require('discord.js');
const Potato = require('../potato.js');
const helpers = require('../helpers.js');

module.exports = {
	name: 'enable',
	aliases: ['disable'],
	description: 'Turn the bot on and off',
	cooldown: 30,
	checkInput(message, args) {
		if (!message.member.voice.channel) {
			return (`you must be in a voice channel to use this command`);
		}
		else if (!Potato.holder) {
			return (`nobody has the potato right now`);
		}
		return;
	},
	async execute(message, args) {
		text = Potato.enabled ? `Deactivate potatobot?` : `Activate potatobot?`;

		await helpers.vote(message, text, this.cooldown, () => {
			Potato.enabled = !Potato.enabled;
			Potato.reset();
		});
	},
};