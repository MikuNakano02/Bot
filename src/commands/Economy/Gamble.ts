import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
import { Sticker, Categories, StickerTypes } from "wa-sticker-formatter";
import ms from "parse-ms-js";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "gamble",
      description: "Test your gambling skill.",
      aliases: ["gamble"],
      category: "economy",
      usage: `${client.config.prefix}gamble <amount> [left/right] | ${client.config.prefix}gamble [left/right] <amount>`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    if (M.from !== "120363042851100644@g.us")
      return void M.reply(
        `You can't gamble here. Use ${this.client.config.prefix}support to get casino group link.`
      );
    const user = M.sender.jid;
    const time = 15000;
    const cd = await (await this.client.getCd(user)).gamble;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `Woahh! Slow down, you can gamble again in *${timeLeft.seconds} seconds*`
      );
    }
    const directions = ["left", "right"];
    const terms: any = joined.trim().split(" ");
    const wallet = await (await this.client.getUser(user)).wallet;
    const direction = directions[Math.floor(Math.random() * directions.length)];
    let gif!: string;
    if (direction === "left") {
      gif = "https://bestanimations.com/media/left/1026053593left-arrow-19.gif";
    } else if (direction === "right") {
      gif =
        "https://bestanimations.com/media/right/967721110right-arrow-34.gif";
    }
    const buttons = [
      {
        buttonId: "wallet",
        buttonText: { displayText: `#wallet` },
        type: 1,
      },
    ];
    const amount: number = terms[0];
    const luck: string = terms[1].toLowerCase();
    if (isNaN(amount))
      return void M.reply(
        `🟥 *Invalid format. Usage Example - ${this.client.config.prefix}gamble 100 left*`
      );
    if (amount < 100)
      return void M.reply(`🟥 *You can't gamble gold less than 100.*`);
    if (amount > wallet)
      return void M.reply(
        `🟥 *You need ${
          amount - wallet
        } gold more to gamble with this amount of gold*.`
      );
    if (amount > 15000)
      return void M.reply(`🟥 *You can't gamble gold more than 15000.*`);
    if (!directions.includes(luck))
      return void M.reply(
        `🟥 *The direction should be left or right. Example - ${this.client.config.prefix}gamble ${amount} left.*`
      );
    if (luck !== direction) {
      await this.client.reduceGold(user, amount);
      await this.client.DB.cd.updateOne(
        { jid: user },
        { $set: { gamble: Date.now() } }
      );
      const sticker: any = await new Sticker(gif, {
        pack: `${direction.toUpperCase()}`,
        author: `${direction.toUpperCase()}`,
        quality: 90,
        type: "full",
        categories: ["🎊"],
        background: "#0000ffff",
      });
      await M.reply(await sticker.build(), MessageType.sticker, Mimetype.webp);
      const buttonMessage: any = {
        contentText: `📉 You lost *${amount} gold*.`,
        footerText: "© Celestial 2022",
        buttons: buttons,
        headerType: 1,
      };
      await M.reply(buttonMessage, MessageType.buttonsMessage);
    }
    if (luck == direction) {
      await this.client.addGold(user, amount);
      await this.client.DB.cd.updateOne(
        { jid: user },
        { $set: { gamble: Date.now() } }
      );
      const sticker: any = await new Sticker(gif, {
        pack: `${direction.toUpperCase()}`,
        author: `${direction.toUpperCase()}`,
        quality: 90,
        type: "full",
        categories: ["🎊"],
        background: "#0000ffff",
      });
      await M.reply(await sticker.build(), MessageType.sticker, Mimetype.webp);
      const buttonMessage: any = {
        contentText: `🎉 You won *${amount} gold*.`,
        footerText: "© Celestial 2022",
        buttons: buttons,
        headerType: 1,
      };
      await M.reply(buttonMessage, MessageType.buttonsMessage);
    }
  };
}
