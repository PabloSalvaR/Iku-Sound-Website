import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { validate as isEmail } from 'email-validator';

const LIMITES = {
  nombre: 40,
  email: 60,
  telefono: 16,
  motivo: 50,
  mensaje: 500
};

const initialState = {
  nombre: '',
  email: '',
  telefono: '',
  motivo: '',
  mensaje: ''
};

function Contacto() {
  const [datos, setDatos] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);
  const [datosPendientes, setDatosPendientes] = useState(initialState);

  useEffect(() => {
    if (confirmacionAbierta) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [confirmacionAbierta]);

  const renderError = (campo) => {
    const mensaje = errores[campo];
    const className = mensaje ? 'contact__error contact__error--visible' : 'contact__error';
    return (
      <span className={className} aria-live="polite">
        {mensaje || '\u00a0'}
      </span>
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nuevoValor = name === 'telefono' ? sanitizarTelefono(value) : value;
    setDatos((prev) => ({ ...prev, [name]: nuevoValor }));
  };

  const sanitizarTelefono = (valor) => {
    if (!valor) return '';
    const sinEspacios = valor.replace(/\s+/g, '');
    const tieneMas = sinEspacios.startsWith('+');
    const digitos = sinEspacios.replace(/[^0-9]/g, '').slice(0, 16);
    return (tieneMas ? '+' : '') + digitos;
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Completá tu nombre.';
    } else if (datos.nombre.trim().length > LIMITES.nombre) {
      nuevosErrores.nombre = `Máximo ${LIMITES.nombre} caracteres.`;
    }
    if (!datos.email.trim()) {
      nuevosErrores.email = 'Completá tu email.';
    } else if (datos.email.trim().length > LIMITES.email) {
      nuevosErrores.email = `Máximo ${LIMITES.email} caracteres.`;
    } else if (!isEmail(datos.email.trim())) {
      nuevosErrores.email = 'Ingresá un email válido.';
    }

    if (datos.telefono.trim()) {
      const telefono = datos.telefono.replace(/\s+/g, '');
      if (!/^\+?[0-9]{7,16}$/.test(telefono)) {
        nuevosErrores.telefono = 'Ingrese solo números (y opcional +).';
      } else if (telefono.length > 16) {
        nuevosErrores.telefono = 'Máximo 16 dígitos.';
      }
    }
    if (!datos.motivo.trim()) {
      nuevosErrores.motivo = 'Contanos el motivo.';
    } else if (datos.motivo.trim().length > LIMITES.motivo) {
      nuevosErrores.motivo = `Máximo ${LIMITES.motivo} caracteres.`;
    }
    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = 'Contanos tu mensaje.';
    } else if (datos.mensaje.trim().length > LIMITES.mensaje) {
      nuevosErrores.mensaje = `Máximo ${LIMITES.mensaje} caracteres.`;
    }
    return nuevosErrores;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const resultado = validar();
    setErrores(resultado);

    if (Object.keys(resultado).length > 0) {
      return;
    }

    setDatosPendientes(datos);
    setConfirmacionAbierta(true);
  };

  const cerrarConfirmacion = () => setConfirmacionAbierta(false);

  const enviarFormulario = async () => {
    try {
      setEnviando(true);
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      if (!respuesta.ok) {
        const data = await respuesta.json().catch(() => null);
        const mensaje =
          data?.errores?.join(' ') || 'No pudimos enviar tu mensaje. Probá nuevamente.';
        toast.error(mensaje);
        return;
      }

      toast.success('¡Gracias por tu mensaje! Te contactaremos a la brevedad.');
      setDatos(initialState);
    } catch (error) {
      console.error('Error al enviar el formulario', error);
      toast.error('Ocurrió un error inesperado. Intente más tarde.');
    } finally {
      setEnviando(false);
      setConfirmacionAbierta(false);
    }
  };

  return (
    <section id="contacto" className="contact">
      <h1 className="contact__title">Contacto</h1>
      <div className="contact__container">
        <div className="contact__wrapper">
          <div className="contact__form">
            <h3 className="contact__form-title">Dejanos tu consulta:</h3>
            <form id="form" className="contact__fields" onSubmit={handleSubmit} noValidate>
              <p className="contact__field">
                <label htmlFor="nombre">Nombre*</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleChange}
                  maxLength={LIMITES.nombre}
                />
                {renderError('nombre')}
              </p>
              <p className="contact__field">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datos.email}
                  onChange={handleChange}
                  maxLength={LIMITES.email}
                />
                {renderError('email')}
              </p>
              <p className="contact__field">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                  maxLength={LIMITES.telefono}
                />
                {renderError('telefono')}
              </p>
              <p className="contact__field">
                <label htmlFor="motivo">Motivo*</label>
                <input
                  type="text"
                  id="motivo"
                  name="motivo"
                  value={datos.motivo}
                  onChange={handleChange}
                  maxLength={LIMITES.motivo}
                />
                {renderError('motivo')}
              </p>
              <p className="contact__field contact__field--full">
                <label htmlFor="mensaje">Mensaje*</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="3"
                  value={datos.mensaje}
                  onChange={handleChange}
                  maxLength={LIMITES.mensaje}
                />
                {renderError('mensaje')}
              </p>
              <p className="contact__field contact__field--actions">
                <button id="btn_enviar" type="submit" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar'}
                </button>
              </p>
            </form>
          </div>
          <div className="contact__info">
            <h4>Nos encontramos en:</h4>
            <iframe
              className="contact__map"
              title="Mapa IKU Sound"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9286.998799555759!2d-58.44173832197969!3d-34.618069011309345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1635037255551!5m2!1ses!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <ul className="contact__info-list">
              <li>
                <FaMapMarkerAlt /> CABA
              </li>
            </ul>
            <p>Completá el formulario y te responderemos por correo.</p>
          </div>
        </div>
      </div>
      {confirmacionAbierta && (
        <div className="contact__modal-overlay" role="dialog" aria-modal="true">
          <div className="contact__modal">
            <h3>Confirmación</h3>
            <p>Revisá que los datos sean correctos antes de enviar:</p>
            <ul className="contact__summary">
              <li>
                <strong>Nombre:</strong> {datosPendientes.nombre || 'Sin especificar'}
              </li>
              <li>
                <strong>Email:</strong> {datosPendientes.email || 'Sin especificar'}
              </li>
              <li>
                <strong>Motivo:</strong> {datosPendientes.motivo || 'Sin especificar'}
              </li>
            </ul>
            {enviando && (
              <div className="contact__loader" aria-live="polite">
                <span className="contact__spinner" aria-hidden="true" /> Enviando mensaje...
              </div>
            )}
            <div className="contact__actions">
              <button type="button" className="btn btn--secondary" onClick={cerrarConfirmacion} disabled={enviando}>
                Cancelar
              </button>
              <button type="button" className="btn btn--primary" onClick={enviarFormulario} disabled={enviando}>
                {enviando ? 'Enviando..' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contacto;
