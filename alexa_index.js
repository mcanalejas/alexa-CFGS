// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const CFGS_MAP = {
    "Actividades fisicas y deportivas": [
        "Técnico Superior en Acondicionamiento Físico",
        "Técnico Superior en Enseñanza y Animación Sociodeportiva"
    ],
    "Administración y Gestión": [
        "Técnico Superior en Administración y Finanzas",
        "Técnico Superior en Asistencia a la Dirección"],
    "Agraria": [
        "Técnico Superior en Ganadería y Asistencia en Sanidad Animal",
        "Técnico Superior en Gestión Forestal y del Medio Natural",
        "Técnico Superior en Paisajismo y Medio Rural"
    ],
    "Artes Gráficas": [
        "Técnico Superior en Diseño y Edición de Publicaciones Impresas y Multimedia",
        "Técnico Superior en Diseño y Gestión de la Producción Gráfica"
    ],
    "Artes y Artesanias": [
        "Técnico Superior Artista Fallero y Construcción de Escenografías"
    ],
    "Comercio y Marketing": [
        "Técnico Superior en Comercio Internacional",
        "Técnico Superior en Gestión de Ventas y Espacios Comerciales",
        "Técnico Superior en Marketing y Publicidad",
        "Técnico Superior en Transporte y Logística"
    ],
    "Edificación y Obra Civil": [
        "Técnico Superior en Organización y Control de Obras de Construcción",
        "Técnico Superior en Proyectos de Edificación",
        "Técnico Superior en Proyectos de Obra Civil"
    ],
    "Electricidad y Electrónica": [
        "Técnico Superior en Automatización y Robótica Industrial",
        "Técnico Superior en Electromedicina Clínica",
        "Técnico Superior en Mantenimiento Electrónico",
        "Técnico Superior en Sistemas Electrotécnicos y Automatizados",
        "Técnico Superior en Sistemas de Telecomunicaciones e Informáticos"
    ],
    "Energía y Agua": [
        "Técnico Superior en Centrales Eléctricas",
        "Técnico Superior en Eficiencia Energética y Energía Solar Térmica",
        "Técnico Superior en Energías Renovables",
        "Técnico Superior en Gestión del Agua"
    ],
    "Fabricación Mecánica": [
        "Técnico Superior en Construcciones Metálicas",
        "Técnico Superior en Diseño en Fabricación Mecánica",
        "Técnico Superior en Programación de la Producción en Fabricación Mecánica",
        "Técnico Superior en Programación de la Producción en Moldeo de Metales y Polímeros"
    ],
    "Hostelería y Turismo": [
        "Técnico Superior en Agencias de Viajes y Gestión de Eventos",
        "Técnico Superior en Dirección de Cocina",
        "Técnico Superior en Dirección de Servicios de Restauración",
        "Técnico Superior en Gestión de Alojamientos Turísticos",
        "Técnico Superior en Guía, Información y Asistencias Turísticas"
    ],
    "Imagen Personal": [
        "Técnico Superior en Asesoría de Imagen Personal y Corporativa",
        "Técnico Superior en Caracterización y Maquillaje Profesional",
        "Técnico Superior en Estilismo y Dirección de Peluquería",
        "Técnico Superior en Estética Integral y Bienestar"
    ],
    "Imagen y sonido": [
        "Técnico Superior en Animaciones 3D, Juegos y Entornos Interactivos",
        "Técnico Superior en Iluminación, Captación y Tratamiento de Imagen",
        "Técnico Superior en Producción de Audiovisuales y Espectáculos",
        "Técnico Superior en Realización de Proyectos Audiovisuales y Espectáculos",
        "Técnico Superior en Sonido para Audiovisuales y Espectáculos"
    ],
    "Industrias Alimentarias": [
        "Técnico Superior en Procesos y Calidad en la Industria Alimentaria",
        "Técnico Superior en Vitivinicultura"
    ],
    "Informática y Comunicaciones": [
        "Técnico Superior en Administración de Sistemas Informáticos en Red",
        "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
        "Técnico Superior en Desarrollo de Aplicaciones Web"
    ],
    "Instalación y Mantenimiento": [
        "Técnico Superior en Desarrollo de Proyectos de Instalaciones Térmicas y de Fluidos",
        "Técnico Superior en Mantenimiento de Instalaciones Térmicas y de Fluidos",
        "Técnico Superior en Mecatrónica Industrial"
    ],
    "Madera, Mueble y Corcho": [
        "Técnico Superior en Diseño y Amueblamiento"
    ],
    "Marítimo-Pesquera": [
        "Técnico Superior en Acuicultura",
        "Técnico Superior en Organización del Mantenimiento de Maquinaria de Buques y Embarcaciones",
        "Técnico Superior en Transporte Marítimo y Pesca de Altura"
    ],
    "Química": [
        "Técnico Superior en Fabricación de Productos Farmacéuticos, Biotecnológicos y Afines",
        "Técnico Superior en Laboratorio de Análisis y de Control de Calidad",
        "Técnico Superior en Química Industrial"
    ],
    "Sanidad": [
        "Técnico Superior en Anatomía Patológica y Citodiagnóstico",
        "Técnico Superior en Audiología Protésica",
        "Técnico Superior en Documentación y Administración Sanitarias",
        "Técnico Superior en Higiene Bucodental",
        "Técnico Superior en Imagen para el Diagnóstico y Medicina Nuclear",
        "Técnico Superior en Laboratorio Clínico y Biomédico",
        "Técnico Superior en Ortoprótesis y Productos de Apoyo",
        "Técnico Superior en Prótesis Dentales",
        "Técnico Superior en Radioterapia y Dosimetría"
    ],
    "Seguridad y Medio Ambiente": [
        "Técnico Superior en Coordinación de Emergencias y Protección Civil",
        "Técnico Superior en Educación y Control Ambiental",
        "Técnico Superior en Química y Salud Ambiental"
    ],
    "Servicios Socioculturales y a la Comunidad": [
        "Técnico Superior en Animación Sociocultural y Turística",
        "Técnico Superior en Educación Infantil",
        "Técnico Superior en Integración Social",
        "Técnico Superior en Mediación Comunicativa",
        "Técnico Superior en Promoción de Igualdad de Género"
    ],
    "Textil, Confección y Piel": [
        "Técnico Superior en Diseño Técnico en Textil y Piel",
        "Técnico Superior en Diseño y Producción de Calzado y Complementos",
        "Técnico Superior en Patronaje y Moda",
        "Técnico Superior en Vestuario a Medida y de Espectáculos"
    ],
    "Transporte y Mantenimiento de Vehículos": [
        "Técnico Superior en Automoción",
        "Técnico Superior en Mantenimiento Aeromecánico de Aviones con Motor de Pistón",
        "Técnico Superior en Mantenimiento Aeromecánico de Aviones con Motor de Turbina",
        "Técnico Superior en Mantenimiento Aeromecánico de Helicópteros con Motor de Pistón",
        "Técnico Superior en Mantenimiento Aeromecánico de Helicópteros con Motor de Turbina",
        "Técnico Superior en Mantenimiento de Sistemas Electrónicos y Aviónicos de Aeronaves"
    ],
    "Vidrio y Cerámica": [
        "Técnico Superior en Desarrollo y Fabricación de Productos Cerámicos"
    ]
}

function getMapKeysValues() {
    var categoria = "";
    for (var cat in CFGS_MAP) {
        categoria += cat + ', ';
    }
    return categoria;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Bienvenido a grados superiores España, estos son las categorías que hay: ${getMapKeysValues()}de qué categoría te gustaría saber que grados hay?`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const ListCfgsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListCfgsIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola mundo!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Esta skill esta diseñada para decirte los grados superiores que hay en España. Me tienes que decir la categoría del grado y yo te digo todos los grados que pertenecen a la categoría dicha.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Lo siento no te he entendido, dime la categoría de los grados que deseas saber.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ListCfgsIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
