import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ICommand, IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, proto } from "@adiwajshing/baileys";
import request from "../../lib/request";
export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "help",
      description:
        "Displays the help menu or shows the info of the command provided",
      category: "general",
      usage: `${client.config.prefix}help (command_name)`,
      aliases: ["h"],
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    parsedArgs: IParsedArgs
  ): Promise<void> => {
    /*eslint-disable @typescript-eslint/no-explicit-any*/
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    const user = M.sender.jid;
    if (!parsedArgs.joined) {
      const commands = this.handler.commands.keys();
      const categories: { [key: string]: ICommand[] } = {};
      for (const command of commands) {
        const info = this.handler.commands.get(command);
        if (!command) continue;
        if (!info?.config?.category || info.config.category === "dev") continue;
        if (
          !info?.config?.category ||
          (info.config.category === "nsfw" &&
            !(await this.client.getGroupData(M.from)).nsfw)
        )
          continue;
        if (Object.keys(categories).includes(info.config.category))
          categories[info.config.category].push(info);
        else {
          categories[info.config.category] = [];
          categories[info.config.category].push(info);
        }
      }
      let text =` *🌀Konichiwa!* @${user.split("@")[0]
      }*, I'm *${this.client.user.name}*.\n\n𝘔𝘺 𝘱𝘳𝘦𝘧𝘪𝘹 𝘪𝘴 {this.client.config.prefix}

𝘛𝘩𝘦 𝘶𝘴𝘢𝘣𝘭𝘦 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘴 𝘢𝘳𝘦 𝘭𝘪𝘴𝘵𝘦𝘥 𝘣𝘦𝘭𝘰𝘸.

*━━━≪•◦𝘊𝘩𝘢𝘳𝘢𝘤𝘵𝘦𝘳𝘴◦•≫━━━*
 𝘤𝘭𝘢𝘪𝘮, 𝘥𝘦𝘤𝘬, 𝘴𝘤𝘩𝘢𝘳𝘢, 𝘵𝘤𝘩𝘢𝘳𝘢-𝘤𝘰𝘯𝘧𝘪𝘳𝘮, 𝘵𝘤𝘩𝘢𝘳𝘢-𝘥𝘦𝘭𝘦𝘵𝘦, 𝘵𝘤𝘩𝘢𝘳𝘢

*━━━≪•◦𝘊𝘰𝘥𝘪𝘯𝘨◦•≫━━━*
 𝘨𝘪𝘵𝘩𝘶𝘣

*━━━≪•◦𝘌𝘤𝘰𝘯𝘰𝘮𝘺◦•≫━━━*
 𝘣𝘢𝘯𝘬, 𝘥𝘢𝘪𝘭𝘺, 𝘥𝘦𝘱𝘰𝘴𝘪𝘵, 𝘨𝘢𝘮𝘣𝘭𝘦, 𝘨𝘪𝘷𝘦, 𝘳𝘰𝘣, 𝘴𝘭𝘰𝘵, 𝘸𝘢𝘭𝘭𝘦𝘵, 𝘸𝘪𝘵𝘩𝘥𝘳𝘢𝘸

*━━━≪•◦𝘌𝘥𝘶𝘤𝘢𝘵𝘪𝘷𝘦◦•≫━━━*
 𝘤𝘢𝘭𝘤𝘶𝘭𝘢𝘵𝘰𝘳, 𝘤𝘳𝘺𝘱𝘵𝘰, 𝘦𝘭𝘦𝘮𝘦𝘯𝘵, 𝘵𝘳𝘪𝘷𝘪𝘢, 𝘶𝘳𝘣𝘢𝘯𝘥𝘪𝘤𝘵𝘪𝘰𝘯𝘢𝘳𝘺, 𝘸𝘦𝘢𝘵𝘩𝘦𝘳

*━━━≪•◦𝘍𝘶𝘯◦•≫━━━*
 𝘧𝘢𝘤𝘵, 𝘫𝘢𝘪𝘭, 𝘫𝘰𝘬𝘦, 𝘲𝘶𝘰𝘵𝘦, 𝘳𝘪𝘱, 𝘳𝘦𝘢𝘤𝘵, 𝘴𝘩𝘪𝘱, 𝘵𝘳𝘢𝘴𝘩, 𝘵𝘳𝘪𝘨𝘨𝘦𝘳, 𝘸𝘢𝘯𝘵𝘦𝘥, 𝘸𝘩𝘺, 𝘨𝘭𝘦𝘢𝘥𝘦𝘳𝘣𝘰𝘢𝘳𝘥, 𝘤𝘩𝘢𝘵

*━━━≪•◦𝘎𝘢𝘮𝘦𝘴◦•≫━━━*
 𝘢𝘯𝘴𝘸𝘦𝘳, 𝘲𝘶𝘪𝘻

*━━━≪•◦𝘎𝘦𝘯𝘦𝘳𝘢𝘭◦•≫━━━*
 𝘢𝘥𝘮𝘪𝘯𝘴, 𝘦𝘹𝘱, 𝘩𝘦𝘭𝘱, 𝘩𝘪, 𝘪𝘯𝘷𝘪𝘵𝘦𝘭𝘪𝘯𝘬, 𝘮𝘰𝘥𝘴, 𝘱𝘳𝘰𝘧𝘪𝘭𝘦, 𝘳𝘢𝘯𝘬, 𝘳𝘶𝘭𝘦𝘴, 𝘴𝘶𝘱𝘱𝘰𝘳𝘵

*━━━≪•◦𝘔𝘰𝘥𝘦𝘳𝘢𝘵𝘪𝘰𝘯◦•≫━━━*
 𝘢𝘤𝘵𝘪𝘷𝘢𝘵𝘦, 𝘢𝘥𝘥, 𝘤𝘭𝘰𝘴𝘦, 𝘥𝘦𝘢𝘤𝘵𝘪𝘷𝘢𝘵𝘦, 𝘥𝘦𝘭𝘦𝘵𝘦, 𝘥𝘦𝘮𝘰𝘵𝘦, 𝘦𝘷𝘦𝘳𝘺𝘰𝘯𝘦, 𝘨𝘳𝘰𝘶𝘱𝘤𝘩𝘢𝘯𝘨𝘦, 𝘰𝘱𝘦𝘯, 𝘱𝘳𝘰𝘮𝘰𝘵𝘦, 𝘱𝘶𝘳𝘨𝘦, 𝘳𝘦𝘮𝘰𝘷𝘦, 𝘳𝘦𝘷𝘰𝘬𝘦

*━━━≪•◦𝘗𝘰𝘬𝘦𝘮𝘰𝘯◦•≫━━━*
 𝘤𝘢𝘵𝘤𝘩, 𝘱𝘢𝘳𝘵𝘺, 𝘱𝘤, 𝘱𝘰𝘬𝘦𝘮𝘰𝘯𝘴, 𝘴𝘸𝘢𝘱, 𝘵2𝘱𝘢𝘳𝘵𝘺, 𝘵2𝘱𝘤, 𝘵𝘳𝘢𝘥𝘦-𝘤𝘰𝘯𝘧𝘪𝘳𝘮, 𝘵𝘳𝘢𝘥𝘦-𝘥𝘦𝘭𝘦𝘵𝘦, 𝘵𝘳𝘢𝘥𝘦

*━━━≪•◦𝘜𝘵𝘪𝘭𝘴◦•≫━━━*
 𝘣𝘭𝘶𝘳, 𝘤𝘪𝘳𝘤𝘭𝘦, 𝘨𝘦𝘵𝘨𝘪𝘧, 𝘨𝘰𝘰𝘨𝘭𝘦, 𝘳𝘦𝘵𝘳𝘪𝘦𝘷𝘦, 𝘴𝘤𝘳𝘦𝘦𝘯𝘴𝘩𝘰𝘵, 𝘴𝘵𝘦𝘢𝘭, 𝘴𝘵𝘪𝘤𝘬𝘦𝘳, 𝘴𝘶𝘣𝘳𝘦𝘥, 𝘵𝘳𝘢𝘯𝘴𝘭𝘢𝘵𝘦, 𝘸𝘪𝘬𝘪𝘱𝘦𝘥𝘪𝘢, 𝘱𝘱𝘤𝘰𝘶𝘱𝘭𝘦

*━━━≪•◦𝘞𝘦𝘦𝘣◦•≫━━━*
 𝘢𝘯𝘪𝘮𝘦, 𝘢𝘯𝘪𝘮𝘦𝘲𝘶𝘰𝘵𝘦, 𝘢𝘯𝘪𝘮𝘦𝘮𝘦, 𝘤𝘩𝘢𝘳𝘢𝘤𝘵𝘦𝘳, 𝘤𝘩𝘢𝘳𝘢𝘤𝘵𝘦𝘳𝘪𝘥, 𝘥𝘪𝘷𝘰𝘳𝘤𝘦, 𝘨𝘦𝘯𝘴𝘩𝘪𝘯𝘤𝘩𝘢𝘳𝘢𝘤𝘵𝘦𝘳, 𝘩𝘢𝘪𝘨𝘶𝘴𝘩𝘢, 𝘬𝘪𝘵𝘴𝘶𝘯𝘦, 𝘭𝘰𝘭𝘪, 𝘮𝘢𝘯𝘨𝘢, 𝘮𝘢𝘳𝘳𝘺, 𝘯𝘦𝘬𝘰, 𝘱𝘰𝘬𝘦𝘮𝘰𝘯, 𝘳𝘱𝘢𝘱𝘦𝘳, 𝘴𝘢𝘶𝘤𝘦, 𝘷𝘵𝘶𝘣𝘦𝘳, 𝘸𝘢𝘪𝘧𝘶, 𝘸𝘢𝘭𝘭𝘱𝘢𝘱𝘦𝘳

*━━━≪•◦𝘔𝘶𝘴𝘪𝘤◦•≫━━━*
 𝘭𝘺𝘳𝘪𝘤𝘴, 𝘥𝘰𝘸𝘯𝘭𝘰𝘢𝘥, 𝘴𝘱𝘰𝘵𝘪𝘧𝘺

*━━━≪•◦𝘠𝘰𝘶𝘵𝘶𝘣𝘦◦•≫━━━*
 𝘺𝘵𝘢𝘶𝘥𝘪𝘰, 𝘺𝘵𝘴𝘦𝘢𝘳𝘤𝘩, 𝘺𝘵𝘷𝘪𝘥𝘦𝘰`;
      const coding = [{ title: "github", rowId: "rowid1" }];
      const economy = [
        { title: "bank", rowId: "rowid1" },
        { title: "daily", rowId: "rowid2" },
        { title: "deposit", rowId: "rowid2" },
        { title: "gamble", rowId: "rowid2" },
        { title: "give", rowId: "rowid2" },
        { title: "rob", rowId: "rowid2" },
        { title: "slot", rowId: "rowid2" },
        { title: "wallet", rowId: "rowid2" },
        { title: "weekly", rowId: "rowid2" },
        { title: "withdraw", rowId: "rowid2" },
      ];
      const educative = [
        { title: "calculator", rowId: "rowid1" },
        { title: "crypto", rowId: "rowid2" },
        { title: "element", rowId: "rowid2" },
        { title: "trivia", rowId: "rowid2" },
        { title: "urbandictionary", rowId: "rowid2" },
      ];
      const fun = [
        { title: "rip", rowId: "rowid1" },
        { title: "fact", rowId: "rowid2" },
        { title: "jail", rowId: "rowid2" },
        { title: "joke", rowId: "rowid2" },
        { title: "quote", rowId: "rowid2" },
        { title: "react", rowId: "rowid2" },
        { title: "ship", rowId: "rowid2" },
        { title: "why", rowId: "rowid2" },
        { title: "trash", rowId: "rowid2" },
        { title: "trigger", rowId: "rowid2" },
        { title: "wanted", rowId: "rowid2" },
      ];
      const games = [
        { title: "answer", rowId: "rowid1" },
        { title: "chess", rowId: "rowid2" },
        { title: "quiz", rowId: "rowid2" },
      ];
      const general = [
        { title: "admins", rowId: "rowid1" },
        { title: "chat", rowId: "rowid2" },
        { title: "help", rowId: "rowid2" },
        { title: "support", rowId: "rowid2" },
        { title: "hi", rowId: "rowid2" },
        { title: "hg", rowId: "rowid2" },
        { title: "invitelink", rowId: "rowid2" },
        { title: "mods", rowId: "rowid2" },
        { title: "profile", rowId: "rowid2" },
        { title: "exp", rowId: "rowid2" },
        { title: "leaderboard", rowId: "rowid2" },
        { title: "rank", rowId: "rowid2" },
        { title: "info", rowId: "rowid2" },
      ];
      const media = [
        { title: "karaoke", rowId: "rowid1" },
        { title: "lyrics", rowId: "rowid2" },
        { title: "play", rowId: "rowid2" },
        { title: "spotify", rowId: "rowid2" },
        { title: "ytaudio", rowId: "rowid2" },
        { title: "ytsearch", rowId: "rowid2" },
        { title: "ytvideo", rowId: "rowid2" },
      ];
      const moderation = [
        { title: "act", rowId: "rowid1" },
        { title: "close", rowId: "rowid2" },
        { title: "enable", rowId: "rowid2" },
        { title: "disable", rowId: "rowid2" },
        { title: "delete", rowId: "rowid2" },
        { title: "demote", rowId: "rowid2" },
        { title: "everyone", rowId: "rowid2" },
        { title: "groupchange", rowId: "rowid2" },
        { title: "open", rowId: "rowid2" },
        { title: "groupchange", rowId: "rowid2" },
        { title: "open", rowId: "rowid2" },
        { title: "promote", rowId: "rowid2" },
        { title: "purge", rowId: "rowid2" },
        { title: "remove", rowId: "rowid2" },
        { title: "revoke", rowId: "rowid2" },
      ];
      const nsfw = [
        { title: "anal", rowId: "rowid1" },
        { title: "blowjob", rowId: "rowid2" },
        { title: "maid", rowId: "rowid2" },
        { title: "masturbation", rowId: "rowid2" },
        { title: "nsfwdoujin", rowId: "rowid2" },
        { title: "nhentai", rowId: "rowid2" },
        { title: "nsfwkitsune", rowId: "rowid2" },
        { title: "nsfwneko", rowId: "rowid2" },
        { title: "nsfwpaper", rowId: "rowid2" },
        { title: "nsfwwaifu", rowId: "rowid2" },
        { title: "pussy", rowId: "rowid2" },
        { title: "thighs", rowId: "rowid2" },
        { title: "seggs", rowId: "rowid2" },
      ];
      const pokemon = [
        { title: "catch", rowId: "rowid1" },
        { title: "party", rowId: "rowid2" },
        { title: "pc", rowId: "rowid2" },
        { title: "pokemons", rowId: "rowid2" },
        { title: "t2party", rowId: "rowid2" },
        { title: "t2pc", rowId: "rowid2" },
        { title: "trade", rowId: "rowid2" },
        { title: "trade-confirm", rowId: "rowid2" },
        { title: "trade-delete", rowId: "rowid2" },
        { title: "swap", rowId: "rowid2" },
      ];
      const characters = [
        { title: "claim", rowId: "rowid1" },
        { title: "gallery", rowId: "rowid2" },
        { title: "schara", rowId: "rowid2" },
      ];
      const utils = [
        { title: "blur", rowId: "rowid1" },
        { title: "circle", rowId: "rowid2" },
        { title: "getgif", rowId: "rowid2" },
        { title: "google", rowId: "rowid2" },
        { title: "retrieve", rowId: "rowid2" },
        { title: "screenshot", rowId: "rowid2" },
        { title: "steal", rowId: "rowid2" },
        { title: "sticker", rowId: "rowid2" },
        { title: "subred", rowId: "rowid2" },
        { title: "toimg", rowId: "rowid2" },
        { title: "translate", rowId: "rowid2" },
        { title: "weather", rowId: "rowid2" },
        { title: "wiki", rowId: "rowid2" },
      ];
      const weeb = [
        { title: "anime", rowId: "rowid1" },
        { title: "animepaper", rowId: "rowid2" },
        { title: "animequote", rowId: "rowid2" },
        { title: "character", rowId: "rowid2" },
        { title: "characterid", rowId: "rowid2" },
        { title: "divorce", rowId: "rowid2" },
        { title: "genshincharacter", rowId: "rowid2" },
        { title: "haigusha", rowId: "rowid2" },
        { title: "kitsune", rowId: "rowid2" },
        { title: "loli", rowId: "rowid2" },
        { title: "marry", rowId: "rowid2" },
        { title: "manga", rowId: "rowid2" },
        { title: "neko", rowId: "rowid2" },
        { title: "pokemon", rowId: "rowid2" },
        { title: "rpaper", rowId: "rowid2" },
        { title: "sauce", rowId: "rowid2" },
        { title: "vtuber", rowId: "rowid2" },
        { title: "waifu", rowId: "rowid2" },
        { title: "wallpaper", rowId: "rowid2" },
      ];
      let sections;
      if (!(await (await this.client.getGroupData(M.from)).nsfw)) {
        sections = [
          { title: "Coding", rows: coding },
          { title: "Economy", rows: economy },
          { title: "Educative", rows: educative },
          { title: "Fun", rows: fun },
          { title: "Games", rows: games },
          { title: "General", rows: general },
          { title: "Media", rows: media },
          { title: "Moderation", rows: moderation },
          { title: "Pokemon", rows: pokemon },
          { title: "Utils", rows: utils },
          { title: "Weeb", rows: weeb },
          { title: "Characters", rows: characters },
        ];
      } else {
        sections = [
          { title: "Coding", rows: coding },
          { title: "Economy", rows: economy },
          { title: "Educative", rows: educative },
          { title: "Fun", rows: fun },
          { title: "Games", rows: games },
          { title: "General", rows: general },
          { title: "Media", rows: media },
          { title: "Moderation", rows: moderation },
          { title: "Nsfw", rows: nsfw },
          { title: "Pokemon", rows: pokemon },
          { title: "Utils", rows: utils },
          { title: "Weeb", rows: weeb },
          { title: "Characters", rows: characters },
        ];
      }
      interface button {
        buttonText: string;
        footerText: string;
        description: string;
        sections: string[];
        listType: number;
      }
      const button: any = {
        buttonText: "Command List",
        footerText: "© Celestial 2022",
        description: `${text} 📝 *𝘕𝘰𝘵𝘦: 𝘜𝘴𝘦 ${this.client.config.prefix}𝘩𝘦𝘭𝘱 <command_name> 𝘵𝘰 𝘷𝘪𝘦𝘸 𝘵𝘩𝘦 𝘤𝘰𝘮𝘮𝘢𝘯𝘥 𝘪𝘯𝘧𝘰*`,
        sections: sections,
        listType: 1,
      };
      this.client.sendMessage(M.from, button, MessageType.listMessage, {
        quoted: M.WAMessage,
        contextInfo: { mentionedJid: [user] },
      });
    }
    const key = parsedArgs.joined.toLowerCase();
    if (key === "" || key === " ") return void null;
    const command =
      this.handler.commands.get(key) || this.handler.aliases.get(key);
    if (!command) return void null;
    const state = await this.client.DB.disabledcommands.findOne({
      command: command.config.command,
    });
    M.reply(
      `🚀 *Command:* ${this.client.util.capitalize(
        command.config?.command
      )}\n📉 *Status:* ${
        state ? "Disabled" : "Available"
      }\n⛩ *Category:* ${this.client.util.capitalize(
        command.config?.category || ""
      )}${
        command.config.aliases
          ? `\n♦️ *Aliases:* ${command.config.aliases
              .map(this.client.util.capitalize)
              .join(", ")}`
          : ""
      }\n🎐 *Group Only:* ${this.client.util.capitalize(
        JSON.stringify(!command.config.dm ?? true)
      )}\n💎 *Usage:* ${command.config?.usage || ""}\n\n📒 *Description:* ${
        command.config?.description || ""
      }`
    );
  };
}
