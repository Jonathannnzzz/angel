const Discord = require("discord.js")
const jimp =require("jimp")
const client = new Discord.Client()
const config = require("./config.json")

//SERVIDOR DE SUPORT
client.on("guildMemberAdd", async member => {

    
   let canal = client.channels.get("618902567363149883")
    let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
    let mask = await jimp.read('mascara.png')
    let fundo = await jimp.read('fundo.png')

    canal.send(`😍${member}, seja muito bem vindo ao servidor do <@588148883931136002>!\n`)

    jimp.read(member.user.displayAvatarURL).then(avatar => {
    avatar.resize(130, 130)
    mask.resize(130, 130)
    avatar.mask(mask)
  
    fundo.print(fonte, 170, 175, member.user.username)
    fundo.composite(avatar, 40, 90).write('bemvindo.png')
    canal.send(``, { files: ["bemvindo.png"] })
    
    console.log('Mais um membro entrou no servidor do Angel, e imagem enviada com sucesso!')
    })
    .catch(err => {
    console.log('error avatar')
    })
  })
  
//STATUS DO BOT
client.on('ready', () => {
    console.log(`${client.user.tag} acordeou, o que acha de come�ar a festa?!`);
    client.user.setActivity("A FESTA DO ANGEL BOMBANDO! ", { type: "WATCHING", url: "https://www.twitch.tv/soldado56"} )
    
    });

//EVITAR LINKS
 client.on(`message`, async message => {
        const bannedWords = [`http` ,`https`, `www.`,`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`]
        try {
            if (bannedWords.some(word => message.content.toLowerCase().includes(word))) {
                await message.delete();
                await message.channel.send(`Voce nao pode enviar links aqui.`);
            }
        } catch (e) {
            console.log(e);
        }
  
    })

client.on("message", message =>{
//---------------------------------------------------    
 //COMANDOS DE PUNIÇÃO
 
 //mute
        if(message.content.startsWith('a/mutar')){
            message.delete();
            var membro3 = message.mentions.members.first();
            var motivo3 = message.content.split(' ').splice(2).join(' ');
            var permissão3 = message.member.hasPermission('KICK_MEMBERS');
            var server = message.guild;

            if(!permissão3) return message.reply('VocÊ não tem permissão para punir um membro, então não tente!').then (msg => (msg.delete(2000)));
            if(!membro3) return message.reply('Você precisa mencionar algum membro!').then (msg => (msg.delete(2000)));
            if(!motivo3) return message.reply('O membro não pode ser punido sem um motivo concreto!!').then (msg => (msg.delete(2000)));


            let cargo = message.guild.roles.find(r => r.name === "|🔇MUTADO");

            if(!cargo){

                message.channel.send('Nenhum cargo chamado ``|🔇MUTADO`` foi criado no seu servidor!').then (msg => (msg.delete(4000)));
                message.channel.send('Crie um cargo chamado ``|🔇MUTADO`` para o bot ficar com mais facilidade de executar esse comando').then (msg => (msg.delete(4000)));

            }
            else{
            
                membro3.addRole(cargo).catch(console.error);

                message.channel.send(`o membro ${membro3} foi punido com sucesso, pelo motivo ${motivo3}`)

            }
            

            

        }

 //warn
        if(message.content.startsWith('a/avisar')){
            message.delete();
            var membroavisado = message.mentions.members.first();
            var motivo2 = message.content.split(' ').splice(2).join(' ');
            var permissão2 = message.member.hasPermission('KICK_MEMBERS');
            var staff = message.member;

            if(!membroavisado) return message.reply('Você precisa mencionar algum membro!').then (msg => (msg.delete(2000)));
            if(!motivo2) return message.reply('O membro não pode ser punido sem um motivo concreto!!').then (msg => (msg.delete(2000)));
            if(!permissão2) return message.reply('VocÊ não tem permissão para punir um membro, então não tente!').then (msg => (msg.delete(2000)));

            const embedwarn = new Discord.RichEmbed()
            .setTitle(`Olha, sou seu amigo, por isso estou te avisando!`)
            .setDescription(`Depois não vem falar que eu não te avisei!`)
            .setImage('https://i.imgur.com/x72zQCa.png')
            .setColor('#db0000')
            .addBlankField()
            .addField(`Olá!`, 'Preste muita atenção para você não ser punido!')
            .addField('Você foi punido pelo mod:', staff, true)
            .addField('Pelo motivo', motivo2, true)
            .setFooter('Angel Bot OFC')
            .setTimestamp()
            membroavisado.send(embedwarn);

            staff.send('Okay, membro alertado!')

        }

 //kick
        if(message.content.startsWith('a/expulsar')){
            message.delete();
            var membro1 = message.mentions.members.first();
            var motivo1 = message.content.split(' ').splice(2).join(' ');
            var permissão1 = message.member.hasPermission('KICK_MEMBERS')
    

            if(!permissão1) return message.reply('VocÊ não tem permissão para punir um membro, então não tente!').then (msg => (msg.delete(2000)));
            if(!membro1) return message.reply('Você precisa mencionar algum membro!').then (msg => (msg.delete(2000)));
            if(!motivo1) return message.reply('O membro não pode ser punido sem um motivo concreto!!').then (msg => (msg.delete(2000)));




                 membro1.kick()                                         

                                //enviar no servidor!
                        const embedkick = new Discord.RichEmbed()
                        .setTitle(`Nossa cara, que pena :(`)
                        .setDescription(`Menos um integrante`)
                        .setImage('https://i.imgur.com/yQlFm3f.png')
                        .setColor('#db0000')
                        .addBlankField()
                        .addField(`Okay membro punido com sucesso!!`, 'Foi querer brincar com a sorte :/')
                        .setFooter('Angel Bot OFC')
                        .setTimestamp()
                        message.channel.send(embedkick);
            

        }

 //a/banir
        if(message.content.startsWith('a/banir')){
            message.delete();
            var membro = message.mentions.members.first();
            var motivo = message.content.split(' ').splice(2).join(' ');
            var permissão = message.member.hasPermission('BAN_MEMBERS')
    
            if(!permissão) return message.reply('VocÊ não tem permissão para punir um membro, então não tente!').then (msg => (msg.delete(2000)));    
            if(!membro) return message.reply('Você precisa mencionar algum membro!').then (msg => (msg.delete(2000)));
            if(!motivo) return message.reply('O membro não pode ser punido sem um motivo concreto!!').then (msg => (msg.delete(2000)));


                                //enviar para o membro que foi punido!
                                const membroban = new Discord.RichEmbed()
                                .setTitle(`Olá membro! você foi punido!`)
                                .setDescription(`Poxa, por que vocÊ foi fazer isso ?`)
                                .setImage('https://i.imgur.com/yQlFm3f.png')
                                .setColor('#db0000')
                                .addBlankField()
                                .addField(`Você foi punido pelo:`, message.author)
                                .addField('Pelo motivo:', motivo) 
                               .setFooter('Angel Bot OFC')
                               .setTimestamp()
                             membro.send(membroban);  

            membro.ban()
                    //enviar no servidor!
            const embedban = new Discord.RichEmbed()
            .setTitle(`Nossa cara, que pena :(`)
            .setDescription(`Menos um integrante`)
            .setImage('https://i.imgur.com/yQlFm3f.png')
            .setColor('#db0000')
            .addBlankField()
            .addField(`Okay membro punido com sucesso!!`, 'Foi querer brincar com a sorte :/')
            .setFooter('Angel Bot OFC')
            .setTimestamp()
            message.channel.send(embedban);
        }
//---------------------------------------------------
//COMANDOS DE JOGOS

//beijo
        if(message.content.startsWith('a/beijo')){

            let membro1 = message.mentions.members.first()
            let membro2 = message.author;
            let mensagem = message.content.split(' ').splice(2).join(' ');

            message.delete()

            if(!membro1) return message.reply('Você precisa citar algum membro pra você enviar um beijo 😘😘').then (msg => (msg.delete(3000)))
            if(!mensagem) return message.reply('Você precisa falar algum motivo!')

                const beijoembed = new Discord.RichEmbed()
                .setTitle('😘Você ganhou um beijo!')
                .setDescription('O amor esta no ar!')
                .addBlankField()
                .setColor('#db0000')
                .setThumbnail('https://www.imagensanimadas.com/data/media/373/coracao-imagem-animada-0885.gif')
                .addField('VocÊ recebeu um beijo de:', membro2, true)
                .addField('O Motivo foi:', mensagem, true)
                .setFooter('O que você pretende fazer?\n Clique em 💋 para enviar outro beijo!\n Clique em 🤣 para ignorar')
                membro1.send(beijoembed).then(msg11 => {
                    msg11.react('💋')
                    msg11.react('🤣')

                    client.on('messageReactionAdd', (reaction, user) => {

                        if(reaction.emoji.name === "💋" && user.id !== client.user.id) {
                            reaction.remove(user)

                            const vairolar = new Discord.RichEmbed()
                            .setTitle('😘Opa, aparentemente ela(e) gostou!')
                            .setDescription(`O ${membro1} retornou o beijo que você enviou para ele!`)
                            .addBlankField()
                            .setColor('#db0000')
                            .setThumbnail('https://www.imagensanimadas.com/data/media/373/coracao-imagem-animada-0885.gif')
                            .setFooter('Chama ele(a) DM!')
                            membro2.send(vairolar)

                        }
                        if(reaction.emoji.name === "🤣" && user.id !== client.user.id) {
                            reaction.remove(user)

                            const foraembed = new Discord.RichEmbed()
                            .setTitle('kkkkkk Levou um fora')
                            .setDescription('Cara ela(e) cagou pra você kkkkkk')
                            .addBlankField()
                            .setColor('#db0000')
                            .setThumbnail('https://www.imagensanimadas.com/data/media/503/coracao-partido-imagem-animada-0016.gif')
                            .addField('VocÊ recebeu um fora de:', membro1, true)
                            .setFooter('Deixa, pra lá, existe muitas pessoas pra vc enviar beijo!')
                            membro2.send(foraembed)

                        }
                    })
                }
                )
        }

//perguntas e resposta
        if(message.content.startsWith('a/per')){
            message.delete();
            let pergunta = message.content.split(' ').splice(1).join(' ');

            let imaegem = [
                "https://tenor.com/view/unbelievable-inshock-shook-shocked-gif-11934676",
                "https://tenor.com/view/gasp-ohlordy-gif-8253786",
                "https://tenor.com/view/shocked-joey-friends-gif-7187491",
                "https://tenor.com/view/antm-americas-next-top-model-miss-j-jalexander-omg-gif-3720930",
            ]

             let escolher1 = Math.floor((Math.random() * pergunta.length));

            let randomfunction = [
                  "Sim", 
                  "Não",
                  "Talvez",
              ];

              let maths = Math.floor((Math.random() * randomfunction.length));

              const perembed = new Discord.RichEmbed()
              .setTitle('PERGUNTA E RESPOSTA')
              .setDescription(`Pergunta: **${pergunta}**`)
              .addField('Resposta:', randomfunction[maths])
              .setThumbnail(imaegem[escolher1])
              message.channel.send(perembed);
        }

//enviar pão
        if(message.content.startsWith('a/enviarpão')){

    let recebidor = message.mentions.members.first()
    let quemenviou = message.author;
    let quantidade = message.content.split(' ').splice(2).join(' ');

    message.delete()

    if(!recebidor) return message.reply('Você precisa citar algum membro pra você enviar um pão 🍞').then (msg => (msg.delete(3000)))
    if(!quantidade) return message.reply('Quantos pão você quer enviar')

        const beijoembed = new Discord.RichEmbed()
        .setTitle('🍞Você ganhou um pão!')
        .setDescription('Pão é bom')
        .addBlankField()
        .setColor('#db0000')
        .setThumbnail('https://3.bp.blogspot.com/-PZNq1TvIZUk/WM1YGi80eKI/AAAAAAAAZTE/G-q2IqFSYto6_HrOwwbZ080_btTE1fIIgCLcB/s1600/Gifs%2Banimados%2BP%25C3%25A3o%2B1.gif')
        .addField('VocÊ recebeu um pão de:', quemenviou, true)
        .addBlankField()
        .addField('Quantidade:', quantidade, true)
        .setFooter('Se quiser manteiga é só abrir a geladeira  🍯 ')
        recebidor.send(beijoembed)


        }
//---------------------------------------------------
//COMANDO DE AJUDA
    if(message.content.startsWith('a/ajuda')){
        var guri = message.member;

    message.channel.send(`Olá ${message.author.username}, da uma olhadinha em seu privado.`)

   const embed = new Discord.RichEmbed()
   .setTitle('AJUDA')
   .setDescription('Você solicitou minha ajuda, CLIQUE AQUI -->')
   .setColor("RANDOM")
   .addBlankField()
   .setThumbnail('https://i.imgur.com/zcaDYuf.png')
   .addField('Você gostaria de obter ajuda em qual sentido?', 'Você deve escolher alguma das opções \n\n', true)
   .addBlankField()
   .addField('ADMINISTRADOR', '👔', true)
   .addField('JOGOS', '🎮', true)
   .addField('PARCERIA', '🎭', true)
   .setTimestamp()
   .setFooter('Angel Bot Discord OFC')
   guri.send(embed).then(msg11 => {
      msg11.react('👔')
      msg11.react('🎮')
      msg11.react('🎭')


  client.on('messageReactionAdd', (reaction, user) => {
      //ADMINISTRAÇÃO
      if(reaction.emoji.name === "👔" && user.id !== client.user.id) {
          reaction.remove(user)

          guri.send(`Olá ${message.author.username}, você deseja saber sobre **ADMINISTRAÇÃO**`).then (msg => msg.delete("2000"));

          const adminembed = new Discord.RichEmbed()
          .setTitle('AJUDA ADMINISTRAÇÃO')
          .setDescription('Tudo sobre a administração')
          .setThumbnail(message.author.avatarURL)
          .setColor('RANDOM')
          .addBlankField()
          .addField('Comandos', 'todos os comandos de administração do bot\n\n', true)
          .addField('Banimento', 'a/banir @membro motivo', true)
          .addField('Kick', 'a/expulsar membro motivo', true)
          .addField('Warn','a/avisar @membro motivo ', true)
          .addField('Mute','a/mutar @membro motivo', true)
          .addField('TempMute','a/mutartemp @membro tempo motivo', true)
          .setFooter('Angel Bot')
          .setTimestamp();
          guri.send(adminembed).then(msg11 => {
          })
          
      }
      //JOGOS
      if(reaction.emoji.name === "🎮" && user.id !== client.user.id) {
        reaction.remove(user)
        
        guri.send(`Olá ${message.author.username}, você deseja saber sobre **JOGOS**`).then (msg => msg.delete("2000"));

        const adminembed = new Discord.RichEmbed()
        .setTitle('COMANDOS DE JOGOS')
        .setDescription('Se você quiser se divertir ultilizando o AngelBot, é só seguir os comandos abaixo!')
        .setThumbnail(message.member.avatarURL)
        .setColor('RANDOM')
        .addBlankField()
        .addField('Pergunta e resposta', 'a/per ``PERGUNTA``',true)
        .addBlankField()
        .addField('Beijo', 'a/beijo ``pessoa``', true)
        .addBlankField()
        .addField('Doar Pão', 'a/dorapao ``pessoa`` e ``quantidade``', true)
        .addBlankField()
        .setFooter('Angel Bot')
        .setTimestamp();
        guri.send(adminembed);

      }
      //PARCERIA
      if(reaction.emoji.name === "🎭" && user.id !== client.user.id) {
        reaction.remove(user)
        
        guri.send(`Olá ${message.author.username}, você deseja saber sobre **PARCERIA**`).then (msg => msg.delete("2000"));

        const adminembed = new Discord.RichEmbed()
        .setTitle('COMO FAZER PARCERIA')
        .setDescription('Deseja fazer parceria com o bot?')
        .setThumbnail(message.member.avatarURL)
        .setColor('RANDOM')
        .addBlankField()
        .addField('Como começar', `Olá ${message.member}, irei te ensinar a como fazer uma parceria com o Angel. Bem começaremos com a suas atividade no nosso servidor, se você for um usuario que ultiliza o Angel frequentimente e sempre reporta os bugs você já ganha um ponto.`)
        .addBlankField()
        .addField('Como funciona', `O uso da parceria com o Angel funcionara da seguinte forma, existe comandos que um ultilizador normal não conhece, e existe comandos personalizados, para você obter esses comandos personalizados, é bem simples.`)
        .setFooter('Angel Bot')
        .addBlankField()
        .addField('Como ser um parceiro', `Para você ser um parceiro deve ser um membro ativo no servidor do Angel, e sempre reportar bug assim que preciso. Lembrando se você estiver fazendo isso, lembre, existe uma equipe somente para verificar, então não fique implorando para se tornar um! obrigado!`, true)
        .setTimestamp();
        guri.send(adminembed);

      }
    })
})  
    }
})


client.login(config.token)