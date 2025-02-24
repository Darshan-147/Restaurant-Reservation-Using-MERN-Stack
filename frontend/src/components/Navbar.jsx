import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isSignedIn } = useUser();

  return (
    <>
      <nav>
        <div className="logo">DASHIN-4</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => (
              <Link
                to={element.link}
                spy={true}
                smooth={true}
                duration={500}
                key={element.id}
              >
                {element.title}
              </Link>
            ))}
          </div>
          <button
            className="menuBtn"
            onClick={() =>
              document
                .querySelector(".menu")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            OUR MENU
          </button>
          <div className="userBtn">
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="signInBtn">Sign In</button>
              </SignInButton>
            )}
          </div>
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;