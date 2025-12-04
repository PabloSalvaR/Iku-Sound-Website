# IKU Sound Website

Sitio web estatico para IKU Sound, un homestudio enfocado en grabacion, mezcla y masterizacion. El proyecto es una SPA en React + Vite y se sirve a traves de un Cloudflare Worker que tambien publica un endpoint para el formulario de contacto.

## Arquitectura
- **Frontend:** React 18 con React Router 6. Las paginas (`/`, `/servicios`, `/staff`, `/contacto`) comparten un layout con `Header` y `Footer`, mas los estilos originales portados a `src/styles/estilos.css`.
- **Backend / Edge:** `worker.js` corre en Cloudflare Workers, sirve los assets generados (`env.ASSETS`) y hace fallback a `index.html` para las rutas del SPA. Tambien maneja `POST /api/contacto`.
- **Formulario de contacto:** componente controlado (`src/pages/Contacto.jsx`) con validaciones en front y back. Los limites sincronizados son: nombre 40, email 60, telefono 16, motivo 50 y mensaje 500. El worker sanitiza y reenvia los datos via Resend (`RESEND_KEY`).
- **Notificaciones y UI extra:** `sonner` para toasts, `react-icons` para iconos y un modal de confirmacion antes de enviar.

## Requisitos
- Node.js 18+ (se recomienda 18 LTS).
- npm (incluido con Node).
- Cuenta de Cloudflare + credencial de Resend para la API de contacto.

## Scripts utiles
```bash
npm install          # instala dependencias
npm run dev          # servidor de desarrollo con HMR (http://localhost:5173)
npm run build        # compila la app a dist/
npm run preview      # sirve el build localmente
```

## Variables y despliegue
- `RESEND_KEY`: API key de Resend. Guardarla como secreto en Cloudflare (`wrangler secret put RESEND_KEY`).
- `ASSETS`: binding configurado por Wrangler al usar `--assets dist`.
- Despliegue sugerido:
  1. `npm run build`
  2. `wrangler deploy --assets dist`

Para pruebas locales del worker se puede usar `wrangler dev` apuntando al build generado.

## Estructura relevante
```
public/                # imagenes y assets estaticos
src/
  components/          # Header, Footer, Layout
  pages/               # Home, Servicios, Staff, Contacto
  styles/              # estilos.css
  App.jsx              # rutas y layout principal
worker.js              # Cloudflare Worker + API contacto
vite.config.js         # configuracion de Vite
wrangler.toml          # configuracion del worker
```

## Flujo de contacto
1. El usuario completa el formulario y lo confirma desde el modal.
2. El frontend valida limites y formatos, muestra errores inline o un spinner durante el POST.
3. El worker valida nuevamente, arma el HTML del mensaje y lo envia via Resend.
4. El usuario recibe feedback mediante toasts (exito o error) y se resetea el formulario cuando corresponde.
