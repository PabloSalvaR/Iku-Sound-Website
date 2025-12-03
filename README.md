# IKU Sound Website

Sitio web estático para IKU Sound, un homestudio orientado a servicios de grabación, mezcla y masterización. La nueva versión usa React con Vite para reutilizar el encabezado/pie en todas las páginas, mejorar la navegación móvil y centralizar los estilos.

## Características
- Navegación SPA con React Router manteniendo las rutas clásicas (`/`, `/servicios`, `/staff`, `/contacto`).
- Componentes reutilizables (`Header`, `Footer`, layout global) y assets servidos desde `public/` para preservar la estética original.
- Formulario de contacto controlado con validaciones básicas (campos obligatorios y mensajes de error inmediatos).
- Build optimizada con Vite (HMR en desarrollo, bundling y minificación listos para producción).

## Requisitos
- Node.js 18 o superior (recomendado 18 LTS).
- npm (incluido junto con Node).

## Cómo usar
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Levantar el entorno de desarrollo (incluye HMR y enrutamiento):
   ```bash
   npm run dev
   ```
   Abre el enlace que Vite imprime (por defecto http://localhost:5173/).
3. Generar el build estático listo para subir a cualquier hosting:
   ```bash
   npm run build
   ```
   El resultado queda en `dist/`. 

## Estructura relevante
```
├─ public/          # Imágenes y assets estáticos (se sirven sin pasar por el bundler)
├─ src/
│  ├─ components/   # Header, Footer y layout compartido
│  ├─ pages/        # Inicio, Servicios, Staff, Contacto
│  ├─ styles/       # estilos.css (estilo global portado del sitio original)
│  └─ App.jsx       # Definición de rutas y layout
└─ vite.config.js   # Configuración mínima de Vite + React
```
