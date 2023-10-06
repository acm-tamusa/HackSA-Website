import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Discord Icon added through fontawesome since it is not available in material ui. Discord icon has sizing isssues. Did the best I could.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function HomeFooter() {
  return (
    <section className=" mt-16 px-6 py-8 md:text-base text-xs">
      <hr className="my-4 bg-complementary" />
      <div className="flex flex-col items-center justify-center gap-2 text-complementary text-center">
        <div className="text-base md:text-lg">
          {' '}
          {/* !change TAMUSA EDITED*/}
          Checkout HackSA&apos;s{' '}
          <a
            href="https://tamusa.campuslabs.com/engage/organization/acm" // !change Changed to ACM TAMUSA jagSync page until ACM TAMUSA website is up
            rel="noopener noreferrer"
            target="_blank"
            className="font-black hover:underline"
          >
            Organizer website
          </a>
        </div>
        <div className="text-[0.6rem] md:text-sm">
          Designed by <p className="font-black inline">HackUTD | </p>
          {/* PLEASE DO NOT CHANGE <3 */}
          HackPortal developed with &lt;3 by <p className="font-black inline">HackUTD</p> and{' '}
          <p className="font-black inline">ACM Development</p>
          {/* PLEASE DO NOT CHANGE <3 */}
        </div>
        <div className="flex flex-row justify-center items-center space-x-6">
          {/* !change. TAMUSA EDITED */}
          <a
            href="https://tamusa.campuslabs.com/engage/organization/acm" // !change Contact us on jagSync until further notice
            rel="noopener noreferrer"
            target="_blank"
            className="hover:underline md:mr-8"
          >
            Contact Us on JagSync
          </a>
          {/* !change TAMUSA EDITED*/}
          <a
            href="https://github.com/acm-tamusa/HackSA-Website"
            target="_blank"
            rel="noreferrer"
            className="hover:underline  whitespace-nowrap"
          >
            Source Code
          </a>
        </div>
        {/* Social icons */} {/* !change TAMUSA EDITED DISCORD AND INSTAGRAM LINKS */}
        <div className="space-x-8 > * + *">
          <a href="https://discord.gg/jqHZ8XsJsY" rel="noopener noreferrer" target="_blank">
            <FontAwesomeIcon icon={faDiscord} className="footerIcon" fontSize="small" />
          </a>
          <a
            href="https://instagram.com/acm.tamusa?igshid=MzRlODBiNWFlZA=="
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* <InstagramIcon className="footerIcon" /> */}
            <FontAwesomeIcon icon={faInstagram} className="footerIcon" fontSize="small" />
          </a>
          <a
            href="https://www.linkedin.com/company/acm-tamusa/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {/* <LinkedInIcon className="footerIcon" /> */}
            <FontAwesomeIcon icon={faLinkedin} className="footerIcon" fontSize="small" />
          </a>
          {/* SHOULD WE ADD ANY MORE SOCIAL LINKS DOWN HERE?*/}
        </div>
      </div>
    </section>
  );
}
