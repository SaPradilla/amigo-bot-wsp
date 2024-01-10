import BotWhatsapp from '@bot-whatsapp/bot';
import { ChatCompletionMessageParam } from 'openai/resources';
import { run } from 'src/services/openai';


export default BotWhatsapp.addKeyword(BotWhatsapp.EVENTS.WELCOME)
        .addAction(async (ctx, {flowDynamic, state}) => {
           try {
             // revise si existe  o de lo contrario la cree y sera de tipado ChatCompletionMessageParam
            const newHistory = (state.getMyState()?.history ?? []) as ChatCompletionMessageParam[]
           
            const name = ctx?.pushName ?? ''

            newHistory.push({
                role:'user',
                content: ctx.body
            })


            const largeResponse = await run(name,newHistory)

            const chunks = largeResponse.split(/(?<!\d)\.\s+/g);
            for (const chunk of chunks) {
                await flowDynamic(chunk)
            }
            newHistory.push({
                role:'assistant',
                content: largeResponse
            })

            await state.update({history: newHistory})
           } catch (error) {
            console.log('[ERROR]', error)
           }
        })