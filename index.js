
const express = require('express')
const app = express();
const port = 3000
app.get('/', (req, res) => res.send('Akintaor game'))

app.listen(port, () =>
console.log('Connected')
           
);

const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

const { MessageActionRow, MessageButton} = require('discord.js');

let prefix = "#"
const trick = "```"
var bool = false


client.login(process.env.TOKEN);
client.on("ready", () => {
  console.log('Bot started')
             client.user.setActivity("⚡｜" + prefix + "ping");



        client.channels.cache.get("997615261635063858").bulkDelete(100).catch(error => console.log("Invalid message to delete:"))

  
  setTimeout(function(){



           	const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId("ticket")
					.setLabel('')
          .setEmoji("📩")
					.setStyle('SECONDARY'),
			);

    
  let embedTicket = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(trick + "To create ticket react with emoji bellow 📩" + trick)
    .setTimestamp()
    

    

            client.channels.cache.get("997615261635063858").send({ embeds: [embedTicket], components: [row]})
    
  }, 5000);
  
});


client.on("interactionCreate", async interaction =>{





  
  if(interaction.customId == "ticket"){
                let nameS = interaction.user.discriminator;


    
    const yourTicket = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Unix-Ticket")
    .setDescription(trick + interaction.user.tag + " Your ticket is created succsefully!" + trick)
    .setTimestamp()
    .setFooter(interaction.user.tag)



    
           	const comp = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(interaction.user.id)
					.setLabel('Close')
					.setStyle('DANGER'),
			);
    

  if(client.channels.cache.find(ch => ch.name == "ticket-" + nameS)){

      await interaction.reply(trick + interaction.user.tag + " No more tickets!" + trick);
      setTimeout(() => interaction.deleteReply(), 1500);
    
    return;
    
  }
  
    await interaction.reply(trick + interaction.user.tag + " Your ticket was created succsefully!" + trick)

          setTimeout(() => interaction.deleteReply(), 1500);
    
    interaction.guild.channels.create("ticket-"+nameS, {
        type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
      parent: "997638189516861470",
      
        permissionOverwrites: [
           {
             id: interaction.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
             allow: [], //Allow permissions
             deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] //Deny permissions
             
             
           },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
            deny: []
          }
        ],
      
      }).then(ch => ch.send({embeds: [yourTicket],  components: [comp]}))


  } else if(interaction.customId == interaction.user.id){
    interaction.channel.send(trick + "Running... " + interaction.user.tag + trick)
    
    setTimeout(function(){
      interaction.reply(trick + "Your ticket was closed succsefully" + trick)
      interaction.channel.delete().catch(error => console.log("Channel is already deleted or an error!"))
    }, 2500);
  }

    
})



