function Staff() {
  return (
    <section id="staff">
      <h1>Staff</h1>
      <div className="staff-content">
        <div className="staff-panel">
          <img src="/img/consola.jpg" alt="Consola analógica" className="consola-img" />
          <div className="staff-text">
            <h3>Pablo Roman</h3>
            <p>
              - Encargado de todos los procesos en IKU
              <br />- Técnico en Sonido y Post-Producción de Audio
              <br />- Experiencia en varios estudios de grabación de Bs. As.
              <br />- Músico guitarrista / sesionista
            </p>
          </div>
        </div>
        <div className="staff-photo">
          <img src="/img/pablo.jpg" alt="Pablo Roman" id="pablofoto" />
        </div>
      </div>
    </section>
  );
}

export default Staff;
