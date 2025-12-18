function Staff() {
  return (
    <section id="staff" className="staff">
      <h1 className="staff__title">Staff</h1>
      <div className="staff__content">
        <div className="staff__panel">
          <img
            src="/img/consola.jpg"
            alt="Consola analogica"
            className="staff__image"
          />
          <div className="staff__overlay">
            <h3 className="staff__name">Pablo Roman</h3>
            <p className="staff__bio">
              - Encargado de todos los procesos en IKU
              <br />- Técnico en Sonido y Post-Producción de Audio
              <br />- Experiencia en varios estudios de grabación de Bs. As.
              <br />- Músico guitarrista / sesionista
            </p>
          </div>
        </div>
        <div className="staff__photo">
          <img
            src="/img/pablo.jpg"
            alt="Pablo Roman"
            className="staff__portrait"
          />
        </div>
      </div>
    </section>
  );
}

export default Staff;
