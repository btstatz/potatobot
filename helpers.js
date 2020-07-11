const Discord = require('discord.js');

const vote = async (message, text, duration, thingToDo) => {
	const embed = new Discord.MessageEmbed()
	.setColor('0x00aaff')
	.setDescription(text);

	let reactionMessage = await message.channel.send(embed);
	await reactionMessage.react('👍');
	await reactionMessage.react('👎');

	const threshold = message.member.voice.channel.members.size / 2;

	const filter = (reaction, user) => {
		return (reaction.emoji.name === '👍' || reaction.emoji.name === '👎') && user.id != reactionMessage.author.id;
	};

	let numThumbsUp = 0;
	let numThumbsDown = 0;

	const collector = reactionMessage.createReactionCollector(filter, { time: duration * 1000, dispose: true });

	collector.on('collect', (reaction, user) => {
		if (reaction.emoji.name === '👍') {
			numThumbsUp++;
		}
		if (reaction.emoji.name === '👎') {
			numThumbsDown++;
		}

		if (numThumbsUp >= threshold || numThumbsDown > threshold) {
			collector.stop();
		}
	});

	collector.on('remove', (reaction, user) => {
		if (reaction.emoji.name === '👍') {
			numThumbsUp--;
		}
		if (reaction.emoji.name === '👎') {
			numThumbsDown--;
		}
	});

	collector.on('end', async collected => {
		if (numThumbsUp >= numThumbsDown && numThumbsUp > 2) {
			message.channel.send(`Vote succeeded`);
			thingToDo();
			//return true;
		}
		else {
			message.channel.send(`Vote failed`);
			//return false;
		}
	});
};

exports.vote = vote;
