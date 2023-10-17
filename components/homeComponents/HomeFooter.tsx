// Discord Icon added through fontawesome since it is not available in material ui. Discord icon has sizing isssues. Did the best I could.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function HomeFooter() {
  return (
    <section
      className=" mt-0 px-6 py-8 md:text-base text-xs"
      style={{
        backgroundImage: `url('/assets/25.png')`,
        backgroundSize: 'cover',
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      <hr className="my-4 bg-complementary" />
      <div className="flex flex-col items-center justify-center gap-2 text-complementary text-center">
        <div className="text-base md:text-lg text-white">
          {' '}
          {/* !change TAMUSA EDITED*/}
          Checkout HackSA&apos;s{' '}
          <a
            href="https://tamusa.campuslabs.com/engage/organization/acm" // !change Changed to ACM TAMUSA jagSync page until ACM TAMUSA website is up
            rel="noopener noreferrer"
            target="_blank"
            className="font-black hover:underline text-white"
          >
            Organizer website
          </a>
        </div>
        <div className="text-[0.6rem] md:text-sm text-white">
          Designed by <p className="font-black inline text-white">ACM Tamusa | </p>
          {/* PLEASE DO NOT CHANGE <3 */}
          HackPortal developed with &lt;3 by <p className="font-black inline">HackUTD</p> and{' '}
          <p className="font-black inline text-white">ACM Development</p>
          {/* PLEASE DO NOT CHANGE <3 */}
        </div>
        <div className="flex flex-row justify-center items-center space-x-6">
          {/* !change. TAMUSA EDITED */}
          <a
            href="https://tamusa.campuslabs.com/engage/organization/acm" // !change Contact us on jagSync until further notice
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline md:mr-8 text-white"
          >
            Contact Us on JagSync
          </a>
          {/* !change TAMUSA EDITED*/}
          <a
            href="https://github.com/acm-tamusa/HackSA-Website"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-white whitespace-nowrap"
          >
            Source Code
          </a>
        </div>
        {/* Social icons */} {/* !change TAMUSA EDITED DISCORD AND INSTAGRAM LINKS */}
        <div className="flex flex-row flex-wrap gap-6">
          <a href="https://discord.gg/jqHZ8XsJsY" rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon icon={faDiscord} height={36} color="white" />
          </a>
          <a
            href="https://instagram.com/acm.tamusa?igshid=MzRlODBiNWFlZA=="
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} height={36} color="white" />
          </a>
          <a
            href="https://www.linkedin.com/company/acm-tamusa/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} height={36} color="white" />
          </a>
        </div>
      </div>
    </section>
  );
}
