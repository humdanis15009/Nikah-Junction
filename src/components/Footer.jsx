import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-slate-800 text-white lg:py-6 py-3 lg:px-16 px-4 ">
        <div className="flex">
          <div
            className="lg:text-[70px] text-[30px]"
            style={{ fontFamily: "Dancing Script" }}
          >
            Nikah Junction
          </div>
          <img
            className="lg:h-24 lg:w-20 h-9 w-8 mt-1 ml-1"
            src="images/nikah-logo2.png"
          />
        </div>

        <div className="flex justify-between relative">
          <p className="lg:w-[50%] w-[75%] lg:text-[16px] text-[10px] lg:pb-10 pb-3">
            This website is owned and managed by Khidmat-e-Khalq since 1994. We,
            at Nikah Junction, are committed towards helping you find the
            perfect one&nbsp;
            <span className="lg:inline-block hidden md:block">
              {" "}
              for whom you are destined to spend the rest of your lives.
            </span>
          </p>

          {/* <div className="absolute -right-1">
          <img
            className="lg:h-[150px] lg:w-[150px] h-[70px] w-[60px] rounded-2xl border-2 border-white absolute lg:-bottom-6 right-1 bottom-1"
            src="images/Founder.png"
            alt="Founder"
          />
          <p className="text-white md:hidden relative top-[21px] leading-3 text-[10px] ml-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Founder:
            <br /> Haji Abdul Khaliq
          </p>
          <p className="text-white hidden md:block relative lg:top-[50px] top-[25px] lg:font-bold lg:text-[12px] text-[9px] ml-8 lg:right-[4px]">
            Founder: Haji Abdul Khaliq
          </p>
        </div> */}
        </div>

        <div>
          <ul className="flex justify-center text-[11px] gap-3 lg:gap-10 lg:text-xl lg:border-t-4 border-t-2 border-yellow-500 lg:pt-4 pt-3">
            <li>
              <p
                onClick={scrollToTop}
                className="hover:text-pink-700 cursor-pointer"
              >
                Home
              </p>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/AboutUs">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/Contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/Faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/Privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/Tnc">
                T&C
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-700" to="/Services">
                Services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
