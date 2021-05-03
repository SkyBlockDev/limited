import {
	naticoMessage,
	naticoInteraction,
	cache,
	settings,
} from '../../deps.ts';
export default {
	name: 'suggest',
	aliases: ['suggest'],
	description: 'Search for a npm package',
	enabled: true,
	slash: true,
	category: 'general',
	async exec(message: naticoMessage) {
		if (!message.args)
			return message.reply({
				content:
					'<:no:838017092216946748> Please provide a suggestion for natico',
			});
		const channel = cache.channels.get(settings.channels.suggestions);
		if (channel) channel.send(message.args);
		return await message.channel?.send('Suggestion has been left ');
	},
	SlashData: {
		options: [
			{
				type: 3,
				name: 'suggestion',
				description: 'What you want to suggest to add to the bot',
				required: true,
			},
		],
	},
	async execSlash(interaction: naticoInteraction) {
		const suggestion = interaction?.data?.options[0]?.value;
		const channel = cache.channels.get(settings.channels.suggestions);
		if (channel) channel.send(suggestion);
		return await interaction.reply({ content: 'Suggestion has been left' });
	},
};
