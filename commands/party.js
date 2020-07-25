const Discord = require('discord.js');
const Potato = require('../potato.js');
const helpers = require('../helpers.js');

module.exports = {
	name: 'party',
	aliases: [],
	description: 'Random rotation',
	cooldown: 30,
	checkInput(message, args) {
		if (!message.member.voice.channel) {
			return (`you must be in a voice channel to use this command`);
		}
		else if (!Potato.enabled) {
			return (`potatobot is currently deactivated`);
		}
		return;
	},
	async execute(message, args) {
		text = Potato.party ? `Disable party mode?` : `Enable party mode (random rotation)?`;

		await helpers.vote(message, text, this.cooldown, async () => {
			Potato.party = !Potato.party;
			
			let membersArray = [];
			while (Potato.party) {
				if (membersArray.length === 0) {
					let membersInCall = message.member.voice.channel.members;
					membersInCall.each(member => {
						membersArray.push(member);
					});
				}
				let randomIndex = Math.floor(Math.random() * membersArray.length)
				let randomMember = membersArray[randomIndex];
				membersArray.splice(randomIndex, 1)

				Potato.reset();
				message.channel.send(`30 seconds until ${randomMember}\'s turn`, {tts: true});

				if (!Potato.party) {
					break;
				}
				await new Promise(resolve => setTimeout(resolve, 30000));

				Potato.set(randomMember);
				message.channel.send(`${randomMember} has the potato`, {tts: true});
			
				if (!Potato.party) {
					break;
				}
				await new Promise(resolve => setTimeout(resolve, 30000));
			}

			if (!Potato.party) {
				Potato.reset();
			}
		});
	},
};
