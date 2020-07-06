const Discord = require('discord.js');

module.exports = {
	holder: null,
	cooldown: false,
	enabled: true,
	party: false,
	membersInCall: new Discord.Collection(),
	set(member) {
		this.holder = member;
		if (member.voice.serverMute) {
			member.voice.setMute(false);
		}
		let asdf = this.holder.voice.channel.members;
		asdf.each(member => {
			this.membersInCall.set(member.id, member);
			if (!member.voice.serverMute && member.id != this.holder.id) {
				member.voice.setMute(true);
			}
		});
	},
	reset() {
		this.holder = null;
		this.membersInCall.each(member => {
			if (member.voice.serverMute) {
				member.voice.setMute(false);
			}
		});
	},
	add(member) {
		this.membersInCall.set(member.id, member);
		if (this.holder) {
			member.voice.setMute(true);
		}
		else {
			member.voice.setMute(false);
		}
	},
	remove(member) {
		this.membersInCall.delete(member.id);
	},
};