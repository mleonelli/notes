exports.handler = (event, context, callback) => {
    try {
        let locale = event.request.locale;
        if (event.request.type === 'LaunchRequest') {
            let message = '';
            switch(locale){
                case "it-IT":
                    message = 'Ciao, sono la tua calcolatrice scientifica. Prova a chiedermi un logaritmo!';
                    break;
                case "fr-FR":
                    message = 'Ciao, sono la tua calcolatrice scientifica. Prova a chiedermi un logaritmo!';
                    break;
                default:
                    message = 'Ciao, sono la tua calcolatrice scientifica. Prova a chiedermi un logaritmo!';
                    break;
            }
            
            callback(null, buildResponse(message));
        } else if (event.request.type === 'IntentRequest') {
            const intentName = event.request.intent.name;

            if (intentName === 'Logaritmo') {
                let base = event.request.intent.slots.base.value;
                let numero = event.request.intent.slots.numero.value;
                let message = '';
                switch(locale){
                    case "it-IT":
                        message = 'Il logaritmo in base ' + base + ' di ' + numero + ' è ';
                        break;
                    case "fr-FR":
                        message = 'Il logaritmo in base ' + base + ' di ' + numero + ' è ';
                        break;
                    default:
                        message = 'Il logaritmo in base ' + base + ' di ' + numero + ' è ';
                        break;
                }
                if(base === 10){
                    message += Math.log10(numero);
                }
                else
                {
                    message += (Math.log10(numero) / Math.log10(base));
                }
                callback(null, buildResponse(message));
            } 
            else if (intentName === 'LogaritmoNaturale') {
                
                let numero = event.request.intent.slots.numero.value;
                let message = '';
                switch(locale){
                    case "it-IT":
                        message = 'Il logaritmo naturale di ' + numero + ' è ';
                        break;
                    case "fr-FR":
                        message = 'Il logaritmo naturale di ' + numero + ' è ';
                        break;
                    default:
                        message = 'Il logaritmo naturale di ' + numero + ' è ';
                        break;
                }
                message += Math.log(numero);
                callback(null, buildResponse(message));
            } else {
                switch(locale){
                    case "it-IT":
                        callback(null, buildResponse("Mi dispiace, non ho capito. Puoi ripetere?"));
                        break;
                    case "fr-FR":
                        callback(null, buildResponse("Mi dispiace, non ho capito. Puoi ripetere?"));
                        break;
                    default:
                        callback(null, buildResponse("Mi dispiace, non ho capito. Puoi ripetere?"));
                        break;
                }
                
                
            }
        } else if (event.request.type === 'SessionEndedRequest') {
            callback(null, buildResponse('Session Ended'));
        }
    } catch (e) {
        context.fail(`Exception: ${e}`);
    }
};

function buildResponse(response) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: response,
            },
            shouldEndSession: true,
        },
        sessionAttributes: {},
    };
}
