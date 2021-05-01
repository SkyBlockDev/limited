export * from 'https://deno.land/x/discordeno/mod.ts';
export { join } from 'https://deno.land/std@0.89.0/path/mod.ts';
export * from './src/interfaces.ts';
export { Embed, embed } from './lib/embed.ts';
import config from './settings.ts';
export const { token, settings, credentials } = config;
