# JARVIS — Rodrigo

Asistente IA personal con interfaz tipo Iron Man, conectado a Claude.

## Estructura

```
jarvis-vercel/
├── api/
│   └── chat.js          # Función serverless que conecta con Claude
├── public/
│   ├── index.html       # Frontend principal
│   └── clash.mp3        # Música de inicio
├── vercel.json          # Configuración Vercel
├── package.json
└── GUIA_DESPLIEGUE.md   # ⭐ Léeme primero
```

## Variable de entorno requerida

```
ANTHROPIC_API_KEY=sk-ant-api03-...
```

Configurar en: Vercel Dashboard → Settings → Environment Variables

## Despliegue rápido

```bash
npm install -g vercel
vercel
# Configurar ANTHROPIC_API_KEY en el dashboard
vercel --prod
```

Ver `GUIA_DESPLIEGUE.md` para instrucciones detalladas paso a paso.
