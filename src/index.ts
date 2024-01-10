import 'dotenv/config'
import BotWhatsapp from '@bot-whatsapp/bot'
import database from './database'
import flow from './flow'
import provider from './provider'
import { initServer } from "./services/http";

const main = async()=>{
    const botInstance = await BotWhatsapp.createBot({
        database,
        provider,
        flow,
    })
    initServer(botInstance)

}

main()