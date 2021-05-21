import { naticoMessage, naticoInteraction } from '../../deps.ts';
import axiod from 'https://deno.land/x/axiod/mod.ts';
import Command from '../../lib/Command.ts';
export default class pip extends Command {
	constructor() {
		super('pip', {
			name: 'pip',
			aliases: ['pip', 'python'],
			examples: ['pip discord.py'],
			description: 'Search for a pip package',
			enabled: true,
			slash: true,
			required: true,
			category: 'general',
		});
	}
	async exec(message: naticoMessage, { args }: { args: string }) {
		const pkg = await axiod(`https://api.anaconda.org/search`, {
			method: 'GET',
			params: {
				limit: 1,
				name: args,
			},
		});

		if (!pkg.data[0])
			return message.reply({
				content: '<:no:838017092216946748> Please provide a valid pip package',
			});

		const result = pkg.data[0];

		message.channel?.send({
			embed: this.handler
				.embed()
				.setColor('#0080ff')
				.addField('❯ Version', result.versions[0])
				.setDescription(result.summary || 'No description provided')
				.setTitle(
					`🐍 ${result.name}`,
					`https://pypi.org/project/${result.name}`
				),
		});
	}
	async execSlash(interaction: naticoInteraction) {
		const query = interaction?.data?.options[0]?.value;
		interaction.reply({ content: 'searching' });
		const pkg = await axiod(`https://api.anaconda.org/search`, {
			method: 'GET',
			params: {
				limit: 1,
				name: query,
			},
		});

		if (!pkg.data[0])
			return interaction.reply({
				content: '<:no:838017092216946748> Please provide a valid pip package',
			});

		const result = pkg.data[0];

		const embed = this.handler
			.embed()
			.setColor('#0080ff')
			.addField('❯ Version', result.versions[0])
			.setDescription(result.summary || 'No description provided')
			.setTitle(`🐍 ${result.name}`, `https://pypi.org/project/${result.name}`);

		interaction.edit({ content: 'python', embeds: [embed] });
	}
}
