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
      let text =` *๐Konichiwa!* @${user.split("@")[0]
      }, I'm *${this.client.user.name}*.\n\n๐๐บ ๐ฑ๐ณ๐ฆ๐ง๐ช๐น ๐ช๐ด ${this.client.config.prefix}

๐๐ฉ๐ฆ ๐ถ๐ด๐ข๐ฃ๐ญ๐ฆ ๐ค๐ฐ๐ฎ๐ฎ๐ข๐ฏ๐ฅ๐ด ๐ข๐ณ๐ฆ ๐ญ๐ช๐ด๐ต๐ฆ๐ฅ ๐ฃ๐ฆ๐ญ๐ฐ๐ธ.

*โโโโชโขโฆ๐๐ฉ๐ข๐ณ๐ข๐ค๐ต๐ฆ๐ณ๐ดโฆโขโซโโโ*
 ๐ค๐ญ๐ข๐ช๐ฎ, ๐๐ฐ๐ญ๐ญ๐ฆ๐ค๐ต๐ช๐ฐ๐ฏ, ๐ด๐ค๐ฉ๐ข๐ณ๐ข, ๐ต๐ค๐ฉ๐ข๐ณ๐ข-๐ค๐ฐ๐ฏ๐ง๐ช๐ณ๐ฎ, ๐ต๐ค๐ฉ๐ข๐ณ๐ข-๐ฅ๐ฆ๐ญ๐ฆ๐ต๐ฆ, ๐ต๐ค๐ฉ๐ข๐ณ๐ข

*โโโโชโขโฆ๐๐ฐ๐ฅ๐ช๐ฏ๐จโฆโขโซโโโ*
 ๐จ๐ช๐ต๐ฉ๐ถ๐ฃ

*โโโโชโขโฆ๐๐ค๐ฐ๐ฏ๐ฐ๐ฎ๐บโฆโขโซโโโ*
 ๐ฃ๐ข๐ฏ๐ฌ, ๐ฅ๐ข๐ช๐ญ๐บ, ๐ฅ๐ฆ๐ฑ๐ฐ๐ด๐ช๐ต, ๐จ๐ข๐ฎ๐ฃ๐ญ๐ฆ, ๐จ๐ช๐ท๐ฆ, ๐ณ๐ฐ๐ฃ, ๐ด๐ญ๐ฐ๐ต, ๐ธ๐ข๐ญ๐ญ๐ฆ๐ต, ๐ธ๐ช๐ต๐ฉ๐ฅ๐ณ๐ข๐ธ

*โโโโชโขโฆ๐๐ฅ๐ถ๐ค๐ข๐ต๐ช๐ท๐ฆโฆโขโซโโโ*
 ๐ค๐ข๐ญ๐ค๐ถ๐ญ๐ข๐ต๐ฐ๐ณ, ๐ค๐ณ๐บ๐ฑ๐ต๐ฐ, ๐ฆ๐ญ๐ฆ๐ฎ๐ฆ๐ฏ๐ต, ๐ต๐ณ๐ช๐ท๐ช๐ข, ๐ถ๐ณ๐ฃ๐ข๐ฏ๐ฅ๐ช๐ค๐ต๐ช๐ฐ๐ฏ๐ข๐ณ๐บ, ๐ธ๐ฆ๐ข๐ต๐ฉ๐ฆ๐ณ

*โโโโชโขโฆ๐๐ถ๐ฏโฆโขโซโโโ*
 ๐ง๐ข๐ค๐ต, ๐ซ๐ข๐ช๐ญ, ๐ซ๐ฐ๐ฌ๐ฆ, ๐ฒ๐ถ๐ฐ๐ต๐ฆ, ๐ณ๐ช๐ฑ, ๐ณ๐ฆ๐ข๐ค๐ต, ๐ด๐ฉ๐ช๐ฑ, ๐ต๐ณ๐ข๐ด๐ฉ, ๐ต๐ณ๐ช๐จ๐จ๐ฆ๐ณ, ๐ธ๐ข๐ฏ๐ต๐ฆ๐ฅ, ๐ธ๐ฉ๐บ, ๐จ๐ญ๐ฆ๐ข๐ฅ๐ฆ๐ณ๐ฃ๐ฐ๐ข๐ณ๐ฅ, ๐ค๐ฉ๐ข๐ต

*โโโโชโขโฆ๐๐ข๐ฎ๐ฆ๐ดโฆโขโซโโโ*
 ๐ข๐ฏ๐ด๐ธ๐ฆ๐ณ, ๐ฒ๐ถ๐ช๐ป

*โโโโชโขโฆ๐๐ฆ๐ฏ๐ฆ๐ณ๐ข๐ญโฆโขโซโโโ*
 ๐ข๐ฅ๐ฎ๐ช๐ฏ๐ด, ๐ฆ๐น๐ฑ, ๐ฉ๐ฆ๐ญ๐ฑ, ๐ฉ๐ช, ๐ช๐ฏ๐ท๐ช๐ต๐ฆ๐ญ๐ช๐ฏ๐ฌ, ๐ฎ๐ฐ๐ฅ๐ด, ๐ฑ๐ณ๐ฐ๐ง๐ช๐ญ๐ฆ, ๐ณ๐ข๐ฏ๐ฌ, ๐ณ๐ถ๐ญ๐ฆ๐ด, ๐ด๐ถ๐ฑ๐ฑ๐ฐ๐ณ๐ต

*โโโโชโขโฆ๐๐ฐ๐ฅ๐ฆ๐ณ๐ข๐ต๐ช๐ฐ๐ฏโฆโขโซโโโ*
 ๐ข๐ค๐ต๐ช๐ท๐ข๐ต๐ฆ, ๐ข๐ฅ๐ฅ, ๐ค๐ญ๐ฐ๐ด๐ฆ, ๐ฅ๐ฆ๐ข๐ค๐ต๐ช๐ท๐ข๐ต๐ฆ, ๐ฅ๐ฆ๐ญ๐ฆ๐ต๐ฆ, ๐ฅ๐ฆ๐ฎ๐ฐ๐ต๐ฆ, ๐ฆ๐ท๐ฆ๐ณ๐บ๐ฐ๐ฏ๐ฆ, ๐จ๐ณ๐ฐ๐ถ๐ฑ๐ค๐ฉ๐ข๐ฏ๐จ๐ฆ, ๐ฐ๐ฑ๐ฆ๐ฏ, ๐ฑ๐ณ๐ฐ๐ฎ๐ฐ๐ต๐ฆ, ๐ฑ๐ถ๐ณ๐จ๐ฆ, ๐ณ๐ฆ๐ฎ๐ฐ๐ท๐ฆ, ๐ณ๐ฆ๐ท๐ฐ๐ฌ๐ฆ

*โโโโชโขโฆ๐๐ฐ๐ฌ๐ฆ๐ฎ๐ฐ๐ฏโฆโขโซโโโ*
 ๐ค๐ข๐ต๐ค๐ฉ, ๐ฑ๐ข๐ณ๐ต๐บ, ๐ฑ๐ค, ๐๐ฐ๐ฌ๐ฆ๐ฅ๐ฆ๐น, ๐ด๐ธ๐ข๐ฑ, ๐ต2๐ฑ๐ข๐ณ๐ต๐บ, ๐ต2๐ฑ๐ค, ๐ต๐ณ๐ข๐ฅ๐ฆ-๐ค๐ฐ๐ฏ๐ง๐ช๐ณ๐ฎ, ๐ต๐ณ๐ข๐ฅ๐ฆ-๐ฅ๐ฆ๐ญ๐ฆ๐ต๐ฆ, ๐ต๐ณ๐ข๐ฅ๐ฆ

*โโโโชโขโฆ๐๐ต๐ช๐ญ๐ดโฆโขโซโโโ*
 ๐ฃ๐ญ๐ถ๐ณ, ๐ค๐ช๐ณ๐ค๐ญ๐ฆ, ๐จ๐ฆ๐ต๐จ๐ช๐ง, ๐จ๐ฐ๐ฐ๐จ๐ญ๐ฆ, ๐ณ๐ฆ๐ต๐ณ๐ช๐ฆ๐ท๐ฆ, ๐ด๐ค๐ณ๐ฆ๐ฆ๐ฏ๐ด๐ฉ๐ฐ๐ต, ๐ด๐ต๐ฆ๐ข๐ญ, ๐ด๐ต๐ช๐ค๐ฌ๐ฆ๐ณ, ๐ด๐ถ๐ฃ๐ณ๐ฆ๐ฅ, ๐ต๐ณ๐ข๐ฏ๐ด๐ญ๐ข๐ต๐ฆ, ๐ธ๐ช๐ฌ๐ช๐ฑ๐ฆ๐ฅ๐ช๐ข, ๐ฑ๐ฑ๐ค๐ฐ๐ถ๐ฑ๐ญ๐ฆ

*โโโโชโขโฆ๐๐ฆ๐ฆ๐ฃโฆโขโซโโโ*
 ๐ข๐ฏ๐ช๐ฎ๐ฆ, ๐ข๐ฏ๐ช๐ฎ๐ฆ๐ฒ๐ถ๐ฐ๐ต๐ฆ, ๐ข๐ฏ๐ช๐ฎ๐ฆ๐ฎ๐ฆ, ๐ค๐ฉ๐ข๐ณ๐ข๐ค๐ต๐ฆ๐ณ, ๐ค๐ฉ๐ข๐ณ๐ข๐ค๐ต๐ฆ๐ณ๐ช๐ฅ, ๐ฅ๐ช๐ท๐ฐ๐ณ๐ค๐ฆ, ๐จ๐ฆ๐ฏ๐ด๐ฉ๐ช๐ฏ๐ค๐ฉ๐ข๐ณ๐ข๐ค๐ต๐ฆ๐ณ, ๐ฉ๐ข๐ช๐จ๐ถ๐ด๐ฉ๐ข, ๐ฌ๐ช๐ต๐ด๐ถ๐ฏ๐ฆ, ๐ญ๐ฐ๐ญ๐ช, ๐ฎ๐ข๐ฏ๐จ๐ข, ๐ฎ๐ข๐ณ๐ณ๐บ, ๐ฏ๐ฆ๐ฌ๐ฐ, ๐ฑ๐ฐ๐ฌ๐ฆ๐ฎ๐ฐ๐ฏ, ๐ณ๐ฑ๐ข๐ฑ๐ฆ๐ณ, ๐ด๐ข๐ถ๐ค๐ฆ, ๐ท๐ต๐ถ๐ฃ๐ฆ๐ณ, ๐ธ๐ข๐ช๐ง๐ถ, ๐ธ๐ข๐ญ๐ญ๐ฑ๐ข๐ฑ๐ฆ๐ณ

*โโโโชโขโฆ๐๐ถ๐ด๐ช๐คโฆโขโซโโโ*
 ๐ญ๐บ๐ณ๐ช๐ค๐ด, ๐ฅ๐ฐ๐ธ๐ฏ๐ญ๐ฐ๐ข๐ฅ, ๐ด๐ฑ๐ฐ๐ต๐ช๐ง๐บ

*โโโโชโขโฆ๐?๐ฐ๐ถ๐ต๐ถ๐ฃ๐ฆโฆโขโซโโโ*
 ๐บ๐ต๐ข๐ถ๐ฅ๐ช๐ฐ, ๐บ๐ต๐ด๐ฆ๐ข๐ณ๐ค๐ฉ, ๐บ๐ต๐ท๐ช๐ฅ๐ฆ๐ฐ \n\n`;
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
        { title: "pokedex", rowId: "rowid2" },
        { title: "t2party", rowId: "rowid2" },
        { title: "t2pc", rowId: "rowid2" },
        { title: "trade", rowId: "rowid2" },
        { title: "trade-confirm", rowId: "rowid2" },
        { title: "trade-delete", rowId: "rowid2" },
        { title: "swap", rowId: "rowid2" },
      ];
      const characters = [
        { title: "claim", rowId: "rowid1" },
        { title: "collection", rowId: "rowid2" },
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
        footerText: "ยฉ Celestial 2022",
        description: `${text} ๐ *๐๐ฐ๐ต๐ฆ: ๐๐ด๐ฆ ${this.client.config.prefix}๐ฉ๐ฆ๐ญ๐ฑ <command_name> ๐ต๐ฐ ๐ท๐ช๐ฆ๐ธ ๐ต๐ฉ๐ฆ ๐ค๐ฐ๐ฎ๐ฎ๐ข๐ฏ๐ฅ ๐ช๐ฏ๐ง๐ฐ*`,
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
      `๐ *Command:* ${this.client.util.capitalize(
        command.config?.command
      )}\n๐ *Status:* ${
        state ? "Disabled" : "Available"
      }\nโฉ *Category:* ${this.client.util.capitalize(
        command.config?.category || ""
      )}${
        command.config.aliases
          ? `\nโฆ๏ธ *Aliases:* ${command.config.aliases
              .map(this.client.util.capitalize)
              .join(", ")}`
          : ""
      }\n๐ *Group Only:* ${this.client.util.capitalize(
        JSON.stringify(!command.config.dm ?? true)
      )}\n๐ *Usage:* ${command.config?.usage || ""}\n\n๐ *Description:* ${
        command.config?.description || ""
      }`
    );
  };
}
