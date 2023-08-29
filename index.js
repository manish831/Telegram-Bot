const { Telegraf } = require("telegraf");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to CSE_Helper bot"));

bot.command("binarysearch", (ctx) => {
  ctx.reply("binarysearch");
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("bubblesort.trim().toLowerCase() === bubblesort", (ctx) => {
  const readData = fs.readFileSync("./bubblesort.txt", "utf8");
  ctx.reply(readData);
});
//you can enter plain text
bot.on("text", (ctx) => {
  const userInput = ctx.message.text.trim().toLowerCase();
  
  if (userInput === "bubblesort") {
    const readData = fs.readFileSync(
      "./Sorting Function/bubblesort.txt",
      "utf8"
    );
    ctx.reply(readData);
  } else if (userInput === "insertionsort") {
    const readData = fs.readFileSync(
      "./Sorting Function/insertionSort.txt",
      "utf8"
    );
    ctx.reply(readData);
  } else if (userInput === "mergesort") {
    const readData = fs.readFileSync(
      "./Sorting Function/mergeSort.txt",
      "utf8"
    );
    ctx.reply(readData);
  } else if (userInput === "quicksort") {
    const readData = fs.readFileSync(
      "./Sorting Function/quickSort.txt",
      "utf8"
    );
    ctx.reply(readData);
  } else {
    ctx.reply("Invalid command.");
  }
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
