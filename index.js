const Discord = require('discord.js-selfbot-v13')
const client = new Discord.Client();
client.on("ready", () => {
    console.log(`Done Login for ${client.user.username}`)
})
process.on('unhandledRejection', (reason, p) => {
  console.log(' [antiCrash] :: Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch');
  console.log(err, origin);
}) 
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(' [antiCrash] :: Multiple Resolves');
console.log(type, promise, reason);
});

const axios = require("axios")
const owners = ["644158057168896000"]
const apikey = "apikey"
const prefix = "!"
client.on("messageCreate", async message => {
  if (!owners.includes(message.author.id)) return;

  if (message.content.startsWith(prefix + "7ul")) {
    let args = message.content.split(" ")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if(!args[1]) return message.reply({content:`Enter id or User`})
    let amount = args[2]
    if(!args[2]) return message.reply({content:`Enter Amount`})

    message.channel.send({ content: `c ${user} ${amount}` });

    let probotMessage = await message.channel.awaitMessages({
      filter: (m) => m.author.id === "282859044593598464" && m.content.includes(client.user.username),
      max: 1,
      time: 15000,
      errors: ["time"],
    });

    if (!probotMessage?.first()) return;

    let captchaurl = probotMessage.first().attachments.first()?.url;

    const imageToBase64 = async (captchaurl) => {
      const response = await fetch(captchaurl);
      const buffer = await response.arrayBuffer();
      const base64Data = Buffer.from(buffer).toString("base64");
      return base64Data;
    };

    let response = await axios.post(
      "https://pro.nocaptchaai.com/solve",
      JSON.stringify({
        method: "ocr",
        id: "probot",
        image: await imageToBase64(imageUrl),
      }),
      {
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
        },
      }
    )
    .catch((err) => {
      console.log(err.response.data);
      return err.reseponse;
    });
    message.channel.send({ content: response.data["solution"] });
  }
});

client.login("Token")
