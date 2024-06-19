import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from '@tanstack/react-router'
import {
  faXmark,
  faBars,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { auth } from "@/lib/auth";
import { DarkModeToggle } from "./dark-mode-toggle";
import { ConnectButton } from "@/components/connect-button";

const links = [
  { href: "/podcasts", label: "Podcasts" },
  { href: "/#features", label: "Features" },
];

export const Navbar = () => {
  const { user, status } = auth.hooks.useAuth()
  const [show, setShow] = useState(false);

  return (
    <nav className="font-futuraMd navbar text-black px-10 xl:px-20 py-6 absolute top-0 left-0 z-10 h-36 dark:text-white">
      <Link
        to="/"
        className="mr-8 h-fit rounded-lg p-2 dark:border-2 dark:border-cyan-500"
      >
        <img src="/images/podfi.png" width={100} />
      </Link>
      <div className="flex justify-end gap-x-4 xl:justify-between w-full">
        {/* pages */}
        <ul className="gap-x-8 px-1 text-xl hidden xl:flex">
          {links.map((link, index, array) => {
            if (index === array.length - 1) {
              return (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-cyan-500">
                    {link.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="hover:text-cyan-500"
                  activeProps={{
                    className: "text-sky-900 bg-cyan-100 px-1 pb-0.5 rounded"
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* search bar */}
        <form
          className="ms-auto me-auto hidden md:flex relative text-sky-900 dark:text-blue-300"
          action=""
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-4 h-4 absolute top-4 left-3"
          />
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            className="input w-24 md:w-auto pl-9 placeholder-current border-current border-2 rounded-xl bg-transparent focus:border-cyan-500 focus:outline-cyan-500"
          />
        </form>
        {/* signup/in btns / wallet/ theme */}
        <div className="hidden xs:flex items-center gap-x-2">
          {status === 'signed-in'
            ? (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center gap-x-1 mr-12 text-xl hover:text-cyan-500"
              >
                <div className="rounded-full w-12 h-12 border-2 border-sky-900 overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="user's profile picture"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                </div>
                <span
                  className={
                    location.pathname === "/" ||
                      location.pathname === "/ads-marketplace"
                      ? "text-white"
                      : "text-sky-900 dark:text-white"
                  }
                >
                  {user.username}
                </span>
              </Link>
            )
            : (
              <ConnectButton />
            )}
          <Link
            to="/earning"
            className={
              status === 'signed-in'
                ? "bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
                : "bg-cyan-800 hover:bg-cyan-900 p-3 rounded-xl"
            }
          >
            <img src="/images/wallet.svg" width={18} height={18} />
          </Link>
          <DarkModeToggle />
        </div>
        <div
          className={
            location.pathname === "/" ||
              location.pathname === "/ads-marketplace"
              ? "inline xl:hidden text-white"
              : "inline xl:hidden text-sky-900 dark:text-white"
          }
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="w-8 h-8 nav-icon-toggler"
                aria-expanded={show}
              />
            ) : (
              <FontAwesomeIcon
                icon={faBars}
                className="w-8 h-8 nav-icon-toggler"
                aria-expanded={show}
              />
            )}
          </div>
        </div>
      </div>
      {/* dropdown */}
      <ul
        tabIndex={0}
        className={
          show
            ? "flex flex-col items-center gap-y-4 the-content py-8 text-center text-black bg-white dark:bg-neutral-800 dark:text-white  w-screen absolute left-0 top-36 h-fit xl:hidden"
            : "flex flex-col items-center gap-y-4 the-content py-0 text-center text-black bg-white dark:bg-neutral-800 dark:text-white w-screen absolute left-0 top-36 h-0 collapse rounded-none"
        }
      >
        {/* search bar */}
        <div className="flex md:hidden relative text-sky-900 dark:text-blue-300">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="w-4 h-4 absolute top-4 left-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="input w-auto pl-9 placeholder-current border-current border-2 rounded-xl bg-transparent focus:border-cyan-500 focus:outline-cyan-500"
          />
        </div>
        {/* signup/in btns and wallet */}
        <div className="flex xs:hidden items-center gap-x-4">
          {status === 'signed-in'
            ? (
              <Link
                to={`/profile/${user.username}`}
                className="flex items-center gap-x-1 mr-12 hover:text-cyan-500"
              >
                <div className="rounded-full w-12 h-12 border-2 border-sky-900 overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="user's profile picture"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="w-full h-full object-cover  object-center"
                    />
                  )}
                </div>
                <span className="text-xl">{user.username}</span>
              </Link>
            )
            : (
              <ConnectButton />
            )}
          <Link
            to="/earnings"
            className={
              status === 'signed-in'
                ? "bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl"
                : "bg-cyan-800 hover:bg-cyan-900 p-3 rounded-xl"
            }
          >
            <img src="/images/wallet.svg" width={18} height={18} />
          </Link>
        </div>
        {links.map((link, index, array) => {
          if (index === array.length - 1) {
            return (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-cyan-500">
                  {link.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={link.href}>
              <Link
                to={link.href}
                className="hover:text-cyan-500"
                activeProps={{
                  className: "text-sky-900 bg-cyan-100 px-1 pb-0.5 rounded"
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <div className="block xl:hidden">
          <DarkModeToggle />
        </div>
      </ul>
    </nav>
  );
};
