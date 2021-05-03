import {
	startBot,
	Message,
	token,
	Interaction,
	editBotsStatus,
	naticoInteraction,
} from '../deps.ts';
import { commandHandler } from './client.ts';
await commandHandler.loadALL();

startBot({
	token,
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	eventHandlers: {
		interactionCreate(interaction: Interaction) {
			commandHandler.runSlash(interaction as naticoInteraction);
		},
		async ready() {
			await commandHandler.EnableSlash('748956745409232945');
			await editBotsStatus('online', 'with deno modules');
			console.log('Successfully connected to gateway');
		},
		messageCreate(message: Message) {
			commandHandler.handleCommand(message);
		},
		messageUpdate(message: Message) {
			commandHandler.handleCommand(message);
		},
	},
});
