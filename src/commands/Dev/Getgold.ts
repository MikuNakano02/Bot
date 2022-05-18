import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "addgold",
      description: "",
      aliases: ["bcg"],
      category: "dev",
      dm: true,
      usage: ``,
      modsOnly: true,
      baseXp: 0,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined)
      return void (await M.reply(`Please provide the amount of gold to give.`));
    const user = M.sender.jid;
    const term: any = joined.split(" ")[0];
    if (isNaN(term)) return void M.reply(`Well... It should be a number.`);
    await this.client.user
      .find({})
      .sort([["Xp", "descending"]])
      .exec(async (err, res) => {
        if (err) return void M.reply(`...`);
         {
          await this.client.addGold(user, term);
        }
        return void M.reply(
          `🟩 *Added ${term} gold to wallet.*`
        );
      });
  };
}
