import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "mods",
      description: "Displays the Moderators' contact info",
      category: "general",
      usage: `${client.config.prefix}mods`,
      aliases: ["moderators", "mod", "owner"],
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    if (!this.client.config.mods || !this.client.config.mods[0])
      return void M.reply("*[UNMODERATED]*");
    const filteredMap = this.client.config.mods
      .map((mod) => this.client.getContact(mod))
      .filter((user) => user);
    let text = "🌀 Celestial Mods 🌀\n\n";
    filteredMap.forEach(
      (user, index) =>
        (text += `❯ *@${user?.jid?.split("@")[0]}*\n`)
    );
    return void M.reply(text,undefined, undefined,
                       filteredMap.map(user => user.jid))
  };
}
