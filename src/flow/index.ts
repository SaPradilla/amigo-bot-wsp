import BotWhatsapp from '@bot-whatsapp/bot';
import saludoFlow from './saludo.flow';
import welcomeFlow from './chat.flow';
export default BotWhatsapp.createFlow(
    [
        saludoFlow,
        welcomeFlow,
    ]
)