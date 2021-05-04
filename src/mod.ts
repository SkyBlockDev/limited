import {
	startBot,
	Message,
	token,
	Interaction,
	editBotsStatus,
	naticoInteraction,
	naticoMessage,
	yellow,
	white,
} from '../deps.ts';
import sweep from './tasks/sweep.ts';
import { commandHandler } from './client.ts';
console.log(white('[i]'), yellow('starting'));
await commandHandler.loadALL();
//deno docs stable https://doc.deno.land/builtin/stable
startBot({
	token,
	intents: ['GUILDS', 'GUILD_MESSAGES'],
	eventHandlers: {
		interactionCreate(interaction: Interaction) {
			commandHandler.runSlash(interaction as naticoInteraction);
		},
		async ready() {
			await commandHandler.EnableSlash('748956745409232945');
			editBotsStatus('online', 'with deno modules');
			console.log(white('[i]'), yellow('Bot succesfully started'));
			setInterval(() => {
				sweep.exec();
			}, sweep.delay);
		},
		messageCreate(message: Message) {
			commandHandler.handleCommand(message as naticoMessage);
		},
		messageUpdate(message: Message) {
			commandHandler.handleCommand(message as naticoMessage);
		},
	},
});
