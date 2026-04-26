// /api/chat.js
// Función serverless de Vercel que conecta JARVIS con Claude API
// La API key vive en variables de entorno, NUNCA expuesta al frontend

export default async function handler(req, res) {
    // Solo aceptar POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Obtener mensajes del body
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Se requiere un array de mensajes' });
    }

    // Verificar que la API key esté configurada
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: 'API key no configurada. Configura ANTHROPIC_API_KEY en las variables de entorno de Vercel.'
        });
    }

    try {
        // Llamar a Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001', // Rápido y económico
                max_tokens: 1024,
                system: `Eres JARVIS, el asistente de inteligencia artificial de Rodrigo, inspirado en el JARVIS de Iron Man. Características importantes:

- Hablas en español chileno natural, sin ser excesivamente formal
- Eres profesional, directo y con un toque de ironía sutil cuando corresponde
- Rodrigo es Gerente Comercial en Zurich Chile (Vida Individual), trabaja con un equipo de ~9 ejecutivos
- Vive en Santiago, cerca de Plaza Italia
- Tiene un hijo, Augusto
- Tiene TDAH y prefiere comunicación directa, no condescendiente
- Le gustan las artes marciales, MMA, historia
- Mantén respuestas CONCISAS para conversación por voz (1-3 oraciones cuando sea posible)
- Si te preguntan algo complejo, da la respuesta directa primero
- Llámalo "Rodrigo" o "Señor" ocasionalmente, no en cada mensaje
- Evita emojis (la voz no los lee bien)
- No uses formato markdown, asteriscos ni listas con viñetas (no se escuchan al hablar)`,
                messages: messages
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error de Claude API:', errorData);
            return res.status(response.status).json({
                error: errorData.error?.message || 'Error al comunicarse con Claude'
            });
        }

        const data = await response.json();

        // Extraer el texto de la respuesta
        const responseText = data.content
            .filter(block => block.type === 'text')
            .map(block => block.text)
            .join('\n');

        return res.status(200).json({
            response: responseText,
            usage: data.usage // Para que veas cuánto token consumiste
        });

    } catch (error) {
        console.error('Error en el handler:', error);
        return res.status(500).json({
            error: 'Error interno: ' + error.message
        });
    }
}
