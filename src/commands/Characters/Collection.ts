import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "collection",
      description: "Shows your collection",
      aliases: ["collec"],
      category: "characters",
      usage: `${client.config.prefix}collec <index_number>`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    const user = M.sender.jid;
    const data = await (await this.client.getUser(user)).gallery;
    if (data.length < 1)
      return void M.reply(`You don't have any character in your collection.`);
    const w: any = joined.trim().split(" ")[0];
    if (w > 0 && w <= data.length) {
      const i = w - 1;
      const text = `š *Name: ${data[i].name}*\nšŖ *ID: ${data[i].id}*\nš® *Description: ${data[i].source}*`;
      return void M.reply(
        await this.client.getBuffer(data[i].image),
        MessageType.image,
        undefined,
        undefined,
        text
      );
    } else {
      let text = `š Charas | ${M.sender.username} š\n\n*š§§ Total Characters (In Collection) : ${data.length}*\n\n`;
      for (let i = 0; i < data.length; i++) {
        text += `āÆ #${i + 1} - ${data[i].name} (From ${data[i].source})\n`;
      }
      return void M.reply(
        await this.client.getBuffer(data[0].image),
        MessageType.image,
        undefined,
        undefined,
        text
      );
    }
  };
}
