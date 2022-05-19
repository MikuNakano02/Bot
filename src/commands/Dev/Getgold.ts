import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "getgold",
      description: "",
      aliases: ["weehee"],
      category: "dev",
      dm: true,
      usage: ``,
      modsOnly: true,
      baseXp: 0,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
   if (!joined)
      return void (await M.reply(`Please provide the amount of gold to add.`));
    const term: any = joined.split(" ")[0]; 
    const user = M.sender.jid;
    }
    await this.client.addGold(user, term);
    }
    return void M.reply(`🎉Added ${term} gold to wallet.`);
  };
}
