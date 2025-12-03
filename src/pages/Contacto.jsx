import { useState } from 'react';
import { FaEnvelopeOpenText, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) {
      nuevosErrores.nombre = 'Completá tu nombre.';
    }
    if (!datos.email.trim()) {
      nuevosErrores.email = 'Completá tu email.';
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

    if (Object.keys(resultado).length === 0) {
      alert('¡Gracias por tu mensaje! Te contactaremos a la brevedad.');
      setDatos(initialState);
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
                {errores.nombre && <span className="error">{errores.nombre}</span>}
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
                {errores.email && <span className="error">{errores.email}</span>}
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
                <label htmlFor="motivo">Motivo</label>
                <input
                  type="text"
                  id="motivo"
                  name="motivo"
                  value={datos.motivo}
                  onChange={handleChange}
                />
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
                {errores.mensaje && <span className="error">{errores.mensaje}</span>}
              </p>
              <p className="block">
                <button id="btn_enviar" type="submit">
                  Enviar
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
              <li>
                <FaPhone /> (111) 111 111 111
              </li>
              <li>
                <FaEnvelopeOpenText /> pablostrings@gmail.com
              </li>
            </ul>
            <p>IKU Sound</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
