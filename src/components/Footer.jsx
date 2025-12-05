import { FaFacebookF, FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';
import packageJson from '../../package.json';

const redes = [
  { label: 'facebook', href: null, icon: <FaFacebookF /> },
  { label: 'instagram', href: null, icon: <FaInstagram /> },
  { label: 'youtube', href: null, icon: <FaYoutube /> },
  { label: 'soundcloud', href: 'https://soundcloud.com/ikusoundstudio', icon: <FaSoundcloud /> }
];

function Footer() {
  const version = packageJson.version;

  return (
    <footer className="site-footer">
      <nav className="site-footer__nav">
        <div className="site-footer__brand">
          <img src="/img/iku_logo_white.png" alt="Logo IKU Sound" className="site-footer__logo" />
          <small className="site-footer__version">v{version}</small>
        </div>
        <ul className="site-footer__social">
          {redes.map(({ label, href, icon }) => {
            const anchorProps = href
              ? { href, target: '_blank', rel: 'noreferrer' }
              : { role: 'button', 'aria-disabled': 'true' };

            return (
              <li className="site-footer__social-item" key={label}>
                <a className={`site-footer__social-link ${label}`} {...anchorProps}>
                  {icon}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
