import { FaFacebookF, FaInstagram, FaYoutube, FaSoundcloud } from 'react-icons/fa';

const redes = [
  { label: 'facebook', href: '#', icon: <FaFacebookF /> },
  { label: 'instagram', href: 'https://www.instagram.com/pablostrings/', icon: <FaInstagram /> },
  { label: 'youtube', href: 'https://www.youtube.com/channel/UCxxHxvf1bgT7uobENf121hg/videos', icon: <FaYoutube /> },
  { label: 'soundcloud', href: 'https://soundcloud.com/ikusoundstudio', icon: <FaSoundcloud /> }
];

function Footer() {
  return (
    <footer>
      <nav>
        <img src="/img/iku_logo_white.png" alt="Logo IKU Sound" id="img_pie" />
        <ul id="btn_redes">
          {redes.map(({ label, href, icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className={label}>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
