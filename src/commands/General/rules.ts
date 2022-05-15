/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "rules",
      description: "shows the rules for beyond",
      category: "general",
      usage: `${client.config.prefix}rules`,
      baseXp: 0,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const buttons = [
      {
        buttonId: "support",
        buttonText: { displayText: `${this.client.config.prefix}support` },
        type: 1,
      },
       {
        buttonId: "mods",
        buttonText: {
          displayText: `${this.client.config.prefix}mods`,
        },
        type: 1,
      },
    ];

    const buttonMessage: any = {
      contentText: `_*----🎀[Rules]🎀----*_\n\n*DONT ASK FOR THE SCRIPT*❌\n• Use *#support* to get the Official group links in your dm\n• If you want to add Celestial Bots in your group then contact the mods by using *#mods* \n• Dont use wrong command, use the command given in the *help list* \n• Dont spam the bot with commands if the bot is not responding, it means the bot maybe offline or facing internet issues \n• Dont Dm/Call the bot \n\n_*IF YOU DONT FOLLOW THE RULES THEN YOU WILL BE BANNED* 🚫_ `,
      footerText: "© Celestial 2022",
      buttons: buttons,
      headerType: 1,
    };
    await M.reply(buttonMessage, MessageType.buttonsMessage);
  };
}
