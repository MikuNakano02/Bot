import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "support",
      aliases: ["support"],
      description: "Gets the support group links",
      category: "general",
      usage: `${client.config.prefix}Support`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    await this.client.sendMessage(
      M.sender.jid,
      `*Celestial*\n\nWell, In that case...\n\n
*🌀 Groups:*\n
*🧧 Title:『Celestial: News』*\n*💌 Invite:* \nhttps://chat.whatsapp.com/DmsXJlgwaF9KncMAwEtRJP\n\n 
*🧧 Title:『Celestial: Main』*\n*💌 Invite:* \nhttps://chat.whatsapp.com/IZYFwOGf7I12x0zFUDukSY\n\n
*🧧 Title:『Celestial: Casino』*\n*💌 Invite: *\nhttps://chat.whatsapp.com/IUIAiDPgKCp4LabWiOf7HE\n\n 
*🧧 Title:『Celestial: Quiz』*\n*💌 Invite:* \nhttps://chat.whatsapp.com/Fp0lBMx8kKvA5yRJQkt0k9`,

      MessageType.text
    );

    return void M.reply("Sent you the Group Links in personal message");
  };
}
