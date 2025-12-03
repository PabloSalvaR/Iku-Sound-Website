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
    <header>
      <nav>
        <div className="logo">
          <h4>IKU</h4>
        </div>
        <ul className={`nav-links ${menuAbierto ? 'nav-activo' : ''}`}>
          {navItems.map(({ label, to, href }) => (
            <li key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ) : (
                <NavLink to={to} end={to === '/'}>
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`hamburguesa ${menuAbierto ? 'cambio' : ''}`}
          aria-label="Alternar menú de navegación"
          aria-expanded={menuAbierto}
          onClick={toggleMenu}
        >
          <span className="linea1" />
          <span className="linea2" />
          <span className="linea3" />
        </button>
      </nav>
    </header>
  );
}

export default Header;
