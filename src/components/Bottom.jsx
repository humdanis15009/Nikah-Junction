import { Link, NavLink } from "react-router-dom";

function Bottom() {
  return (
    <>
    <div className="bg-slate-800 text-white lg:py-4 py-4 lg:px-16">
      <div>
        <ul className="flex justify-center lg:gap-10 gap-3 lg:text-xl text-[11px]">
          <li>
            <Link className="hover:text-pink-600" to="/">
              Home
            </Link>
          </li>
          <li>
            <NavLink
              to="/AboutUs"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Faq"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Privacy"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Tnc"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              T&C
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Services"
              className={({ isActive }) =>
                isActive ? "text-pink-600" : "hover:text-pink-600"
              }
            >
              Services
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
}

export default Bottom;
