/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "faq",
      description: "shows the rules of celestial",
      category: "general",
      usage: `${client.config.prefix}faq`,
      baseXp: 0,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const buttons = [
      {
        buttonId: "rules",
        buttonText: { displayText: `${this.client.config.prefix}rules` },
        type: 1,
      },
       {
        buttonId: "support",
        buttonText: {
          displayText: `${this.client.config.prefix}support`,
        },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `⋆ *F͢A͢Q͢* ⋆

_Celestial Bots are multi-purpose anime themed bots_

• *How can I get Celestial Bots in my group?*
   - Sent your group link in bot's dm
   - The group should have atleast 25 members
  
• How to become a Mod?
   - You can't

• *How can i earn gold?*
   - Collect your daily gold ( Use #daily )
   - Sell your pokemons or cards 
   - Gamble or bet in our casino group
   - Ask rich ppl

• *Can I get this bot's script?*
   - No you can't

• *How to spawn Pokemon and Characters in our group?*
   - Use *#activate wild* to enable spawning of Pokemons
   - Use *#activate chara* to enable spawning of Characters
( Note: Disappearing messages should be turned off for the chat )`,
      footerText: "© Celestial 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
