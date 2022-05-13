import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import ms from "parse-ms-js";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "daily",
      description: "Claims daily gold",
      category: "economy",
      usage: `${client.config.prefix}daily`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    const user = M.sender.jid;
    const time = 86400000;
    const cd = await (await this.client.getUser(user)).lastDaily;
    if (time - (Date.now() - cd) > 0) {
      const timeLeft = ms(time - (Date.now() - cd));
      return void M.reply(
        `You have already claimed your daily gold recently. Claim again in *${timeLeft.hours}h:${timeLeft.minutes}m:${timeLeft.seconds}s*`
      );
    }
    await this.client.addGold(user, 1000);
    await this.client.DB.user.updateOne(
      { jid: user },
      { $set: { lastDaily: Date.now() } }
    );
    return void M.reply(`🎉 *1000 gold* has been added to your wallet.`);
  };
}
