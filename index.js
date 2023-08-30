const { Telegraf } = require("telegraf");
const axios = require("axios");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Telegraf(BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome to CSE_Helper bot"));
bot.command("quotes", (ctx) => {
  axios
    .get("https://api.quotable.io/random")
    .then((response) => {
      // Extract quote and author from the response data
      const quote = response.data.content;
      const author = response.data.author;
      const replyText = `"${quote}" - ${author}`;
      // Reply to the user with the extracted quote
      ctx.reply(replyText);
    })
    .catch((error) => {
      console.error(error);
      return ctx.reply("An error occurred while fetching data.");
    });
});
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
// you can enter plain text
const sortingAlgorithms = {
  bubblesort: "bubblesort.txt",
  insertionsort: "insertionSort.txt",
  mergesort: "mergeSort.txt",
  quicksort: "quickSort.txt",
  selectionsort: "selectionSort.txt",
};
const searchingAlgorithms = {
  binarysearch: "binarySearch.txt",
  linearsearch: "linearSearch.txt",
};

bot.on("text", (ctx) => {
  const userInput = ctx.message.text.trim().toLowerCase();

  if (userInput in sortingAlgorithms) {
    const algorithmFilePath = sortingAlgorithms[userInput];
    const readData = fs.readFileSync(
      `./Sorting Function/${algorithmFilePath}`,
      "utf8"
    );
    ctx.reply(readData);
  } else if (userInput in searchingAlgorithms) {
    const algorithmFilePath = searchingAlgorithms[userInput];
    const readData = fs.readFileSync(
      `./searching/${algorithmFilePath}`,
      "utf8"
    );
    ctx.reply(readData);
  } else {
    ctx.reply("Invalid command.");
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
