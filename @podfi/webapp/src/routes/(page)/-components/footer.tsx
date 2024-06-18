import { Link } from "@tanstack/react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const links = [
  { href: "#", label: "Donate" },
  { href: "#", label: "Sign in" },
  { href: "#", label: "Services" },
  { href: "#", label: "How it works" },
  { href: "#", label: "About" },
]

export const Footer = () =>
  <footer className="px-10 xl:px-24 pb-8 bg-[#06507F] text-white text-sm font-roboto">
    <div className="flex flex-col items-center gap-y-20 text-center py-20 lg:text-left lg:flex-row lg:justify-between lg:gap-x-6 lg:items-start lg:py-28">
      {/* branding */}
      <div className="flex flex-col items-center lg:items-start max-w-[365px] gap-y-8">
        <Link to="/">
          <img src="/images/podfi.png" width={150} height={100} />
        </Link>
        <p>
          Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom
          diska. Jinesade bel när feras redorade i belogi. FAR paratyp i
          muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde.{" "}
        </p>
        {/* socials */}
        <div className="flex gap-x-4">
          <Link to="#">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faTwitter}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
          <Link to="#">
            <FontAwesomeIcon
              icon={faInstagram}
              className="w-5 h-5 hover:text-cyan-500"
            />
          </Link>
        </div>
      </div>
      {/* quick links */}
      <div>
        <h2 className="font-bold text-lg mb-10">Quick link</h2>
        <ul className="flex flex-col gap-y-6">
          {links.map((link) => (
            <li key={link.label}>
              <Link to={link.href} className="hover:text-cyan-500">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* contact */}
      <div>
        <h2 className="font-bold text-lg mb-10">Contact</h2>
        <ul className="flex flex-col items-center lg:items-start gap-y-6">
          <li>
            <Link to="#" className="flex hover:text-cyan-500">
              <FontAwesomeIcon icon={faPhone} className="h-4 w-4 mr-2" />
              <p>(406) 222-****</p>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex hover:text-cyan-500">
              <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 mr-2" />
              <p>Podfi@gmail.com</p>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex hover:text-cyan-500">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="h-4 w-4 mr-2"
              />
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            </Link>
          </li>
        </ul>
      </div>
      {/* sending email */}
      <form action="">
        <label htmlFor="email" className="max-w-44">
          You can contact Us to send email to us
        </label>
        <div className="flex gap-x-4 mt-4">
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Your Email"
            className="p-4 w-auto placeholder-neutral-300 bg-transparent rounded-xl outline-cyan-500"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              className="stroke-white hover:stroke-cyan-500 w-6 h-6"
            >
              <path
                d="M1.04172 15.6988L2.98172 8.98881L1.04172 2.27881C0.80172 1.45881 1.64172 0.728807 2.42172 1.09881L17.5217 8.08881C18.2917 8.44881 18.2917 9.54881 17.5217 9.89881L2.42172 16.8888C1.64172 17.2488 0.80172 16.5288 1.04172 15.6988Z"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.98145 8.98877H7.77145"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
    <hr className="h-px bg-white w-full border-0" />
    <p className="font-futuraBk text-base text-center mt-4">
      © 2024 PodFi| Powered by whyds
    </p>
  </footer>
