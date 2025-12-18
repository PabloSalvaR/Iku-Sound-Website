function Home() {
  return (
    <section id="inicio" className="home">
      <img
        src="/img/iku_logo_white.png"
        alt="Logo IKU Sound"
        className="home__logo"
        width="826"
        height="833"
        draggable="false"
        onDragStart={(event) => event.preventDefault()}
      />
      <h1 className="home__title">IKU SOUND</h1>
      <h3 className="home__subtitle">Bienvenidos</h3>
      <p className="home__description">
        IKU es un homestudio en el que podrás desarrollar tu música a través de diversas etapas.
      </p>
    </section>
  );
}

export default Home;
