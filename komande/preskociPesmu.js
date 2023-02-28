const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),

	execute: async ({ client, interaction,distube }) => {

        if (!interaction.member.voice.channel){
            return interaction.reply("You need to be in a VC to use this command")
        }


        const embed = new EmbedBuilder();
        // Get the queue for the server
		const queue = distube.getQueue(interaction)

        // If there is no queue, return
		if (!queue)
        {
            await interaction.reply("There are no songs in the queue");
                return;
        }

        const currentSong = queue.songs[0].name

        if(queue.songs.length==1){
            distube.stop(interaction)
            await interaction.reply({
                embeds: [
                    embed
                        .setDescription(`${currentSong} has been skipped!`)
                ]
            })
            return
        }
            

        // Skip the current song
		distube.skip(interaction)

        // Return an embed to the user saying the song has been skipped
        
        await interaction.reply({
            embeds: [
                embed
                    .setDescription(`${currentSong} has been skipped!`)
            ]
        })
	},
}