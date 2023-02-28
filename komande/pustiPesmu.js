const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require('discord.js');
const { DisTube } = require('distube');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from YouTube.")
		.addSubcommand(subcommand =>
			subcommand
				.setName("search")
				.setDescription("Searches for a song and plays it")
				.addStringOption(option =>
					option.setName("searchterms").setDescription("search keywords").setRequired(true)
				)
		)
        .addSubcommand(subcommand =>
			subcommand
				.setName("playlist")
				.setDescription("Plays a playlist from YT")
				.addStringOption(option => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("song")
				.setDescription("Plays a single song from YT")
				.addStringOption(option => option.setName("url").setDescription("the song's url").setRequired(true))
		),
	execute: async ({ client, interaction,distube}) => {
        
        if (!interaction.member.voice.channel){
            return interaction.reply("You need to be in a VC to use this command")
        }
        
        const embed = new EmbedBuilder();

        


		

        if (interaction.options.getSubcommand() === "song") {
            const voiceChannel = interaction.member.voice.channel;
            if (voiceChannel) {

                
                distube.play(voiceChannel, interaction.options.getString("url"), {
                    message:interaction.message,
                    textChannel: interaction.channel,
                    member: interaction.member,
                }).then((x)=>{
                    const queue = distube.getQueue(interaction)
                    console.log(queue)
                    console.log(x)
                })

                // embed
                // .setDescription(`**${result.tracks.length} song from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                // .setThumbnail(playlist.thumbnail)

                
                
            } else {
                
                interaction.message.channel.send(
                    'You must join a voice channel first.',
                );
            }
            
            

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("No results")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
                .setThumbnail(playlist.thumbnail)
		}
		


        

        // let justConnected;
        // if (!queue.connection){
        //     justConnected = true;
        //     await queue.connect(interaction.member.voice.channel)
        // }
        
        // await interaction.reply({
        //     embeds: [
        //         embed
        //             .setDescription(`${currentSong} has been skipped!`)
        //     ]
        // })
	},
}