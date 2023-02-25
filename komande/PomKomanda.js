const { SlashCommandBuilder } = require("@discordjs/builders")
const { QueryType } = require("discord-player")
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName("pomkomanda")
		.setDescription("play a song from YouTube.")
		,
	execute: async ({ client, interaction }) => {
        // Make sure the user is inside a voice channel
		if (!interaction.member.voice.channel) return interaction.reply("You need to be in a Voice Channel to play a song.");


        const embed = new EmbedBuilder();


        embed
            .setDescription("SEx na eks")

        await interaction.reply({
            embeds: [embed]
        })
	},
}