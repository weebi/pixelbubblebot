const Discord = require('discord.js')
const client = new Discord.Client()
const chalk = require('chalk') // colors woo
const axios = require('axios')

require('dotenv').config() // let's load the config

client.on('ready', () => {
	console.log(chalk.green("Logged in with name \"" + client.user.username + "\"."))
})

client.on('message', (msg) => {
	if(msg.author.bot) return // we don't talk to robots

	if(msg.content.startsWith(process.env.PREFIX + "bubble") && msg.content.length > 8) {

		let message = msg.content.substring(8) // don't want the command in our input

		// gotta ask the server to send us a link
		axios({
			method: 'post',
			url: 'https://pixelspeechbubble.com/make-bubble', 
			data: `text=${encodeURIComponent(message)}&animated=true&orientation=left`,
			headers: {'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(res => { 
			let msgToSend = new Discord.MessageAttachment("https:" + res.data.image, "bubble.gif")
			msg.channel.send(msgToSend)
		}).catch(error => {
			//client.guilds.members.cache.get(process.env.OWNER_ID).send(error)
			msg.channel.send("error xd: " + error)
		})
	}
})

// let's login
client.login(process.env.TOKEN)