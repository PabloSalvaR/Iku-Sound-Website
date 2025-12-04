// Cloudflare Worker that serves the Vite build and falls back to index.html for SPA routes.
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;

      if (url.pathname === '/api/contacto' && request.method === 'POST') {
        return handleContacto(request, env);
      }

      if (!env.ASSETS || typeof env.ASSETS.fetch !== 'function') {
        throw new Error('ASSETS binding is not available. Deploy with --assets dist.');
      }

      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404 || request.method !== 'GET') {
        return assetResponse;
      }

      if (!shouldFallbackToIndex(pathname)) {
        return assetResponse;
      }

      const indexRequest = new Request(new URL('/index.html', request.url), request);
      return env.ASSETS.fetch(indexRequest);
    } catch (error) {
      const message = error instanceof Error ? `${error.name}: ${error.message}` : 'Unknown error';
      console.error('Worker unhandled error:', error);
      return new Response(`Internal Error\n${message}`, { status: 500 });
    }
  }
};

function shouldFallbackToIndex(pathname) {
  return !pathname.includes('.') && !pathname.startsWith('/cdn-cgi/');
}

const LIMITES = {
  nombre: 40,
  email: 60,
  telefono: 16,
  motivo: 50,
  mensaje: 500
};

async function handleContacto(request, env) {
  let datos;
  try {
    datos = await request.json();
  } catch {
    return new Response('JSON inválido', { status: 400 });
  }

  const errores = validarDatos(datos);
  if (errores.length > 0) {
    return Response.json({ errores }, { status: 400 });
  }

  const envio = await enviarCorreo(datos, env);
  if (!envio.ok) {
    return Response.json({ errores: ['No pudimos enviar tu mensaje. Intentá más tarde.'] }, { status: 502 });
  }

  return Response.json({ ok: true });
}

function validarDatos(datos) {
  const mensajes = [];
  if (!datos || typeof datos !== 'object') {
    mensajes.push('Datos inválidos.');
    return mensajes;
  }

  const nombre = datos.nombre?.trim() ?? '';
  if (!nombre) {
    mensajes.push('Completá tu nombre.');
  } else if (nombre.length > LIMITES.nombre) {
    mensajes.push('Nombre demasiado largo.');
  }
  const email = datos.email?.trim() ?? '';
  if (!email) {
    mensajes.push('Completá tu email.');
  } else if (email.length > LIMITES.email) {
    mensajes.push('Email demasiado largo.');
  } else if (!esEmailValido(email)) {
    mensajes.push('Ingresá un email válido.');
  }
  if (datos.telefono) {
    const telefono = datos.telefono.replace(/\s+/g, '');
    const digitos = telefono.startsWith('+') ? telefono.slice(1) : telefono;
    if (digitos.length > LIMITES.telefono) {
      mensajes.push('Teléfono demasiado largo.');
    } else if (!/^\+?[0-9]{7,16}$/.test(telefono)) {
      mensajes.push('Teléfono inválido.');
    }
  }
  const motivo = datos.motivo?.trim() ?? '';
  if (!motivo) {
    mensajes.push('Contanos el motivo.');
  } else if (motivo.length > LIMITES.motivo) {
    mensajes.push('Motivo demasiado largo.');
  }
  const mensaje = datos.mensaje?.trim() ?? '';
  if (!mensaje) {
    mensajes.push('Contanos tu mensaje.');
  } else if (mensaje.length > LIMITES.mensaje) {
    mensajes.push('Mensaje demasiado largo.');
  }
  return mensajes;
}

function esEmailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}
async function enviarCorreo(datos, env) {
  const key = env.RESEND_KEY;
  if (!key) {
    console.error('RESEND_KEY no configurada');
    return { ok: false };
  }

  const cuerpo = {
    from: 'IKU Sound <no-reply@ikusound.com>',
    to: ['pablostrings@gmail.com'],
    reply_to: datos.email,
    subject: `Nuevo mensaje de ${datos.nombre}`,
    html: construirHtml(datos)
  };

  const respuesta = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cuerpo)
  });

  if (!respuesta.ok) {
    const texto = await respuesta.text();
    console.error('Error al enviar correo', respuesta.status, texto);
  }

  return { ok: respuesta.ok };
}

function construirHtml(datos) {
  const campos = [
    ['Nombre', datos.nombre],
    ['Email', datos.email],
    ['Teléfono', datos.telefono || 'No informado'],
    ['Motivo', datos.motivo || 'No informado'],
    ['Mensaje', datos.mensaje]
  ];

  const filas = campos
    .map(([label, valor]) => `<p><strong>${label}:</strong> ${escaparHtml(valor)}</p>`)
    .join('');

  return `<div>${filas}</div>`;
}

function escaparHtml(texto = '') {
  return texto
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
