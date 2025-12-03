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
    <footer>
      <nav>
        <div className="footer-brand">
          <img src="/img/iku_logo_white.png" alt="Logo IKU Sound" id="img_pie" />
          <small className="footer-version">v{version}</small>
        </div>
        <ul id="btn_redes">
          {redes.map(({ label, href, icon }) => {
            const anchorProps = href
              ? { href, target: '_blank', rel: 'noreferrer' }
              : { role: 'button', 'aria-disabled': 'true' };

            return (
              <li key={label}>
                <a className={label} {...anchorProps}>
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
