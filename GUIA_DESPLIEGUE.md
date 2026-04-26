# 🚀 JARVIS — Guía de Despliegue en Vercel

Esta es la guía completa para que tu JARVIS quede funcionando online en ~10 minutos.

---

## ✅ Lo que vas a tener al final

Una URL como `https://jarvis-rodrigo.vercel.app` que:
- Funciona desde cualquier navegador (PC, celular, tablet)
- Tiene voz funcionando (HTTPS = micrófono permitido)
- IA real con Claude respondiendo
- Tu API key protegida (nunca expuesta al frontend)
- Memoria de conversación durante la sesión
- La canción de The Clash al iniciar
- Atajos de teclado, accesos rápidos, configuración de voz

---

## 📋 Pasos del despliegue

### Paso 1: Crear cuenta en Vercel (3 minutos)

1. Ve a **https://vercel.com/signup**
2. Haz clic en **"Continue with GitHub"** (o crea cuenta con email si prefieres)
   - Si no tienes GitHub, créate uno también — es gratis y útil
3. Verifica tu email
4. En el onboarding, elige el plan **"Hobby"** (gratis)
5. Cuando te pregunte el nombre del equipo, pon algo como `rodrigo-personal`

---

### Paso 2: Subir el proyecto a Vercel (5 minutos)

Tienes **dos formas** de hacer esto. Elige la que te resulte más fácil:

#### 🅰 OPCIÓN A: Drag & Drop (la más fácil)

1. Descarga el archivo `jarvis-vercel.zip` que te entrego
2. **Descomprímelo** en tu computador
3. Ve a **https://vercel.com/new**
4. Haz clic en **"Import"** o busca el botón **"Deploy"** 
5. Si ves la opción de subir carpeta directa, arrastra la carpeta `jarvis-vercel` ahí
6. Si no, sigue la **OPCIÓN B**

#### 🅱 OPCIÓN B: Con Vercel CLI (recomendada)

1. Descarga e instala **Node.js** desde https://nodejs.org (versión LTS)
2. Abre **PowerShell** o **Terminal**
3. Instala Vercel CLI:
   ```
   npm install -g vercel
   ```
4. Descomprime `jarvis-vercel.zip` en tu computador
5. Navega a la carpeta:
   ```
   cd ruta/a/jarvis-vercel
   ```
6. Despliega:
   ```
   vercel
   ```
7. Te va a preguntar:
   - **Set up and deploy?** → Sí (Y)
   - **Which scope?** → Tu cuenta personal
   - **Link to existing project?** → No (N)
   - **What's your project's name?** → `jarvis-rodrigo` (o el que quieras)
   - **In which directory is your code?** → Enter (déjalo en `./`)
   - **Want to modify settings?** → No (N)
8. Esperar el despliegue (~30 segundos)
9. Te da una URL temporal — guárdala

---

### Paso 3: Configurar tu API Key como variable de entorno (2 minutos)

⚠️ **MUY IMPORTANTE**: Esto es lo que mantiene tu API key segura.

1. Ve a https://vercel.com/dashboard
2. Haz clic en tu proyecto `jarvis-rodrigo`
3. Ve a **Settings** (arriba) → **Environment Variables** (menú izquierdo)
4. Agrega una nueva variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Pega tu API key completa (la que empieza con `sk-ant-api03-...`)
   - **Environments:** Marca las 3 (Production, Preview, Development)
5. Haz clic en **Save**

---

### Paso 4: Re-desplegar para que tome la API key (1 minuto)

La variable de entorno solo se aplica en despliegues nuevos. Hay dos formas:

**Desde el dashboard:**
1. Ve a **Deployments** en tu proyecto
2. Haz clic en los 3 puntos del último despliegue
3. Selecciona **Redeploy**
4. Confirma

**Desde la terminal (si usaste Opción B):**
```
vercel --prod
```

---

### Paso 5: Probar que funciona ✅

1. Abre la URL final que te dio Vercel (algo como `jarvis-rodrigo.vercel.app`)
2. Haz clic en el botón naranja para iniciar
3. Escucha la canción
4. Escribe un mensaje o presiona el micrófono y habla
5. JARVIS debería responderte con la voz de Claude

---

## 🎯 Cosas útiles a saber

### URL personalizada (opcional)
En el dashboard de Vercel → Settings → Domains puedes asignar un dominio personalizado si tienes uno.

### Ver el consumo de la API
Ve a **https://console.anthropic.com/** → **Usage** para ver cuánto crédito has usado. Con Haiku 4.5 (lo que estamos usando), $5 USD te dan unos **5,000 mensajes** aproximadamente.

### Acceso directo en escritorio
- **Chrome/Edge**: Abre la URL → Menú → "Crear acceso directo" o "Instalar app"
- Te queda como una app nativa en tu Windows
- En el celular: "Agregar a pantalla de inicio"

### Privacidad
La URL es pública pero solo tú la conoces. Si quieres protegerla con contraseña:
- Vercel Pro permite "Password Protection" ($20/mes)
- O puedo agregarte un login simple al frontend (gratis)

---

## ❓ Solución de problemas

### "Error de conexión: API key no configurada"
- No agregaste la variable `ANTHROPIC_API_KEY` en Vercel
- O no hiciste el re-deploy después de agregarla
- Solución: Verifica el Paso 3 y 4

### "Error 401" o "authentication_error"
- Tu API key es incorrecta o tiene un error de copiado
- Solución: Genera una nueva en console.anthropic.com y vuelve a configurarla en Vercel

### "Error 429" o "rate_limit"
- Se acabó tu crédito o pasaste el límite por minuto
- Solución: Recarga crédito en console.anthropic.com → Billing

### El micrófono no funciona
- Solo funciona en Chrome, Edge, Safari (NO Firefox en algunos sistemas)
- El navegador te debe pedir permiso al primer uso
- Si lo bloqueaste antes: candado al lado de la URL → Permisos del sitio → Micrófono → Permitir

### La música no se reproduce
- Algunos navegadores bloquean autoplay
- Solución: Tocar el botón naranja de inicio activa el contexto de audio

---

## 💰 Costos esperados

**Vercel Hobby:** Gratis para siempre (suficiente para uso personal)

**Anthropic API (Claude Haiku 4.5):**
- $1 USD por millón de tokens de entrada
- $5 USD por millón de tokens de salida
- Una conversación típica de 10 mensajes = ~$0.001 USD (un décimo de centavo)
- Los $5 USD gratis te durarán meses si lo usas casualmente

---

## 📞 Si algo falla

Cuéntame en qué paso te quedaste y qué error te aparece. Lo más común es:
1. La API key mal copiada (revisa que no tenga espacios al inicio o final)
2. Olvidar el re-deploy después de configurar la variable de entorno
3. Permisos del micrófono bloqueados en el navegador

Vamos paso a paso.
