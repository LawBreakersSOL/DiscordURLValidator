const Discord = require("discord.js")
const fs = require('fs');
const dotenv = require('dotenv').config();

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
})

const prefix = process.env.PREFIX;
const whitelistJson = `${__dirname}/whitelist.json`;
const channelsToWatch = process.env.CHANNELSTOWATCH.split(",");

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in...`);
})

client.on("messageCreate", message => {
    message.content = message.content.replace(/[^\x00-\xFF]/g, "");
    const rawConfig = fs.readFileSync(whitelistJson);
    const config = JSON.parse(rawConfig);
    if (channelsToWatch.includes(message.channelId) && message.author.id != process.env.APPROVEDMEMBER && message.author.id != client.user.id) {
        verifyNoBadUrls(message, config);
    }

    if (message.author.id == process.env.APPROVEDMEMBER) {
        approvedMemberTings(message, config);
    }
});

function verifyNoBadUrls(message, config) {
    if (checkMessageForUrl(message)) {
        var urls = getUrlFromMessage(message.content)
        urls.some(url => {
            if (!config.whitelistedURLs.includes(url) && url != undefined) {
                message.delete();
                return true;
            }
        })
    }
}

function approvedMemberTings(message, config) {
    if (message.content.toLowerCase().startsWith(`${prefix}whitelist`)) {
        const url = message.content.split(" ")[1];
        if (!checkIfURLExists(url, config.whitelistedURLs)) {
            var newConfig = addURLToApprovedArray(url, config);
            writeFile(newConfig);
            message.reply(`Successfully added URL: ${url}`);
        } else {
            message.reply(`${url} already exists`);
        }
    }
    else if (message.content.toLowerCase().startsWith(`${prefix}remove`)) {
        const url = message.content.split(" ")[1];
        if (checkIfURLExists(url, config.whitelistedURLs)) {
            var newConfig = removeURLFromApprovedArray(url, config);
            writeFile(newConfig);
            message.reply(`Successfully removed URL: ${url}`);
        } else {
            message.reply(`${url} does not exist`);
        }
    }
    else if (message.content.toLowerCase().startsWith(`${prefix}list`)) {
        if (config.whitelistedURLs.length > 0)
            message.reply(config.whitelistedURLs.toString());
        else
            message.reply("You have not whitelisted any URLs yet!");
    }
}

function checkMessageForUrl(message) {
    var urlRegex = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
    return urlRegex.test(message.content);
}

function getUrlFromMessage(message) {
    return message.match("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?")
}

function checkIfURLExists(url, approvedURLs) {
    if (approvedURLs.includes(url))
        return true;
    return false;
}

function addURLToApprovedArray(url, config) {
    config.whitelistedURLs.push(url);
    return config;
}

function removeURLFromApprovedArray(urlToRemove, config) {
    var filtered = config.whitelistedURLs.filter(url => url != urlToRemove);
    config.whitelistedURLs = filtered;
    return config;
}

function writeFile(data) {
    fs.writeFileSync(whitelistJson, JSON.stringify(data));
}

client.login(process.env.DISCORD_TOKEN)