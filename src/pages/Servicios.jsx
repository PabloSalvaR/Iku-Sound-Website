function Servicios() {
  return (
    <section id="servicios">
      <h1>Servicios</h1>
      <img src="/img/mic3.png" alt="Micrófono" id="img_izq" />
      <img src="/img/mixer3.png" alt="Consola" id="img_centro" />
      <img src="/img/speakers.png" alt="Monitores" id="img_der" />
      <div id="txt_izq">
        <h3>Grabación</h3>
        <ul>
          <li>Voces</li>
          <li>Guitarras</li>
          <li>Bajos</li>
          <li>Teclados</li>
          <li>Cuerdas</li>
          <li>Vientos</li>
        </ul>
      </div>
      <div id="txt_centro">
        <h3>Mezcla</h3>
        <b>Buscamos el sonido que querés</b>
      </div>
      <div id="txt_der">
        <h3>Masterización</h3>
        <b>Mejoramos el audio final de tus mezclas</b>
      </div>
    </section>
  );
}

export default Servicios;
