const { Telegraf } = require("telegraf");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to CSE_Helper bo"));

bot.command("binarysearch", (ctx) => {
  ctx.reply("binarysearch");
});

bot.command("lettercombination", async function (ctx) {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/manish831/LeetCode-Practice/main/0017-letter-combinations-of-a-phone-number/0017-letter-combinations-of-a-phone-number.cpp?token=GHSAT0AAAAAACEIDAUZBBQCGUHYUHPDSV2GZHFYQEA"
    );
    return ctx.reply(response.data);
  } catch (error) {
    console.error(error);
    return ctx.reply("An error occurred while fetching data.");
  }
});

bot.on("sticker", (ctx) => {
  ctx.reply("❤️");
});

// Handle the 409 error
bot.catch((err, ctx) => {
  if (err.code === 409) {
    return ctx.reply("The bot is already running. Please try again later.");
  }
  console.error(err);
});

bot.launch();
