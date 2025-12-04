import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'sonner';
import { validate as isEmail } from 'email-validator';

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

  const renderError = (campo) => (
    <span className="error" aria-live="polite">
      {errores[campo] || '\u00a0'}
    </span>
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Completa tu nombre.';
    }
    if (!datos.email.trim()) {
      nuevosErrores.email = 'Completa tu email.';
    } else if (!isEmail(datos.email.trim())) {
      nuevosErrores.email = 'Ingresá un email válido.';
    }

    if (datos.telefono.trim()) {
      const telefono = datos.telefono.replace(/\s+/g, '');
      if (!/^\+?[0-9]{7,15}$/.test(telefono)) {
        nuevosErrores.telefono = 'Ingresá solo números (y opcional +).';
      }
    }
    if (!datos.motivo.trim()) {
      nuevosErrores.motivo = 'Contanos el motivo.';
    }
    if (!datos.mensaje.trim()) {
      nuevosErrores.mensaje = 'Contanos tu mensaje.';
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
      setConfirmacionAbierta(false);
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
      toast.error('Ocurrió un error inesperado. Intentá más tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contacto">
      <h1>Contacto</h1>
      <div className="contenedor">
        <div className="contact-wrapper animated bounceInUp">
          <div className="contact-form">
            <h3>Dejanos tu consulta:</h3>
            <form id="form" onSubmit={handleSubmit} noValidate>
              <p>
                <label htmlFor="nombre">Nombre*</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleChange}
                />
                {renderError('nombre')}
              </p>
              <p>
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datos.email}
                  onChange={handleChange}
                />
                {renderError('email')}
              </p>
              <p>
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                />
              </p>
              <p>
                <label htmlFor="motivo">Motivo*</label>
                <input
                  type="text"
                  id="motivo"
                  name="motivo"
                  value={datos.motivo}
                  onChange={handleChange}
                />
                {renderError('motivo')}
              </p>
              <p className="block">
                <label htmlFor="mensaje">Mensaje*</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="3"
                  value={datos.mensaje}
                  onChange={handleChange}
                />
                {renderError('mensaje')}
              </p>
              <p className="block">
                <button id="btn_enviar" type="submit" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar'}
                </button>
              </p>
            </form>
          </div>
          <div className="contact-info">
            <h4>Nos encontramos en:</h4>
            <iframe
              title="Mapa IKU Sound"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9286.998799555759!2d-58.44173832197969!3d-34.618069011309345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1635037255551!5m2!1ses!2sar"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <ul>
              <li>
                <FaMapMarkerAlt /> CABA
              </li>
            </ul>
            <p>Completa el formulario y te responderemos por correo.</p>
          </div>
        </div>
      </div>
      {confirmacionAbierta && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h3>¿Enviar mensaje?</h3>
            <p>
              Revisá que tus datos sean correctos antes de enviar. Nombre: <strong>{datosPendientes.nombre}</strong> –
              Email: <strong>{datosPendientes.email}</strong>
            </p>
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={cerrarConfirmacion} disabled={enviando}>
                Cancelar
              </button>
              <button type="button" className="btn-primary" onClick={enviarFormulario} disabled={enviando}>
                {enviando ? 'Enviando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contacto;
