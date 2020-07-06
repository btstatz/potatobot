const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const Potato = require('./potato.js');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (typeof(command.checkInput) === 'function') {
		let error = command.checkInput(message, args);
		if (error) {
			return message.reply(error);
		}
	}

	if (command.cooldown) {
		let now = Date.now();
		let cooldownAmount = command.cooldown * 1000;
		
		if (cooldowns.has(command.name)) {
			let previousTime = cooldowns.get(command.name);
			let timeLeft = (cooldownAmount - (now - previousTime)) / 1000;
			return message.reply(`please try again in ${timeLeft.toFixed(1)} seconds`);
		}
		cooldowns.set(command.name, now);
		setTimeout(() => cooldowns.delete(command.name), cooldownAmount);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command');
	}
});

client.on('voiceStateUpdate', (oldState, newState) => {
	if (!oldState.channelID && newState.channelID) {
		Potato.add(newState.member);
	}
	else if (oldState.channelID && !newState.channelID) {
		Potato.remove(newState.member);
	}
});

client.login(token);