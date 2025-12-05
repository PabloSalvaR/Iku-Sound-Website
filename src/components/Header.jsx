import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Trabajos', href: 'https://soundcloud.com/ikusoundstudio' },
  { label: 'Staff', to: '/staff' },
  { label: 'Contacto', to: '/contacto' }
];

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  const toggleMenu = () => setMenuAbierto((prev) => !prev);

  return (
    <header className="site-header">
      <nav className="site-nav">
        <div className="site-nav__logo">
          <h4>IKU</h4>
        </div>
        <ul className={`site-nav__links ${menuAbierto ? 'site-nav__links--open' : ''}`}>
          {navItems.map(({ label, to, href }) => (
            <li className="site-nav__item" key={label}>
              {href ? (
                <a className="site-nav__link" href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ) : (
                <NavLink className="site-nav__link" to={to} end={to === '/'}>
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`site-nav__toggle ${menuAbierto ? 'site-nav__toggle--open' : ''}`}
          aria-label="Alternar menu de navegacion"
          aria-expanded={menuAbierto}
          onClick={toggleMenu}
        >
          <span className="site-nav__line" />
          <span className="site-nav__line" />
          <span className="site-nav__line" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
