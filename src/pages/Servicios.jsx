const servicios = [
  {
    id: 'grabacion',
    titulo: 'Grabación',
    descripcion: (
      <ul>
        <li>Voces</li>
        <li>Guitarras</li>
        <li>Bajos</li>
        <li>Teclados</li>
        <li>Cuerdas</li>
        <li>Vientos</li>
      </ul>
    ),
    imagen: '/img/mic3.png',
    alt: 'Microfono',
    width: 1280,
    height: 1280
  },
  {
    id: 'mezcla',
    titulo: 'Mezcla',
    descripcion: <p>Buscamos el sonido que queres para cada proyecto.</p>,
    imagen: '/img/mixer3.png',
    alt: 'Consola',
    width: 512,
    height: 512
  },
  {
    id: 'masterizacion',
    titulo: 'Masterización',
    descripcion: <p>Mejoramos el audio final de tus mezclas.</p>,
    imagen: '/img/speakers.png',
    alt: 'Monitores',
    width: 512,
    height: 512
  }
];

function Servicios() {
  return (
    <section id="servicios" className="services">
      <h1 className="services__title">Servicios</h1>
      <div className="services__grid">
        {servicios.map(({ id, titulo, descripcion, imagen, alt, width, height }) => (
          <article className="services__card" key={id}>
            <img
              src={imagen}
              alt={alt}
              className="services__image"
              width={width}
              height={height}
              loading="lazy"
            />
            <div className="services__text">
              <h3>{titulo}</h3>
              {descripcion}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Servicios;
