# URL Validator Discord Bot

Monitor selected channels for any bad urls. You can either be the approved member or you can whitelist selected URLs that anyone who has perms to post links can post.

## Description

This bot was written in a couple of hours while it was 2AM. So if you see something that can be done better, please open a pull request and we will work on getting it merged in as soon as possible. We want to contribute to making Solana (or any Discord really) a safer space.

## Getting Started

### Dependencies

* NodeJS.

### Installing

* git clone the repo
* open the repo in any terminal and in the root directory run 
``` 
npm i
```

### Running the bot

* First things first you will need to create a Discord bot through their [portal](https://discord.com/developers/applications)). If you need help I suggest you watch the first part of this [video](https://www.youtube.com/watch?v=JMmUW4d3Noc) which does a good job explaining how to do everything.
* Open up the .env file and edit four fields you see. The first field is the discord token, you just replace what is after the equal signs with your token from the portal. The next field is the prefix, you can leave it as it is or change it to whatever you want. The third field is the approved member. This is basically the server owner, or someone you trust to be able to post/whitelist any links. The final field is the channels you want to watch. So you just want to seperate each channel by a comma.
* Once you have the .env edited, you can now run  
```
node index
```
which will get the bot running. You can also deploy this bot onto a server and run it forevever (what we recommend)
## Help

If you have any problems please reach out to us on [Discord](discord.gg/thesneakydevils) or you can reach out to Shady on Twitter(check the authors section.)

## Authors

Contributors names and contact info
[@ShadyDaDev](https://twitter.com/ShadyDaDev)
## License

You can do whatever you want with the bot, we are trying to keep it opened sourced that way future improvements can be made by us or anyone else that wants to contribute.
