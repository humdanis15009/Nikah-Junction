import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-800 text-white lg:py-3 py-4 lg:px-20 px-4">
      
      <div className="flex items-center justify-center gap-3 mb-1">
        <h1
          className="lg:text-[70px] text-[35px] font-semibold"
          style={{ fontFamily: "Dancing Script" }}
        >
          Nikah Junction
        </h1>
        <img
          className="lg:h-24 lg:w-20 h-10 w-8 mt-1"
          src="images/nikah-logo2.png"
          alt="Nikah Logo"
        />
      </div>

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

      <div className="max-w-3xl mx-auto text-center">
        <p className="lg:text-[16px] text-[12px] leading-relaxed opacity-90">
          Serving offline now online to serve you better. We, at
          Nikah Junction, are committed to helping you find the perfect one
          <span className="hidden lg:inline">
            {" "}
            for whom you are destined to spend the rest of your life.
          </span>
        </p>
      </div>

      <div className="w-full border-t-2 border-yellow-500 mt-4 mb-3"></div>

     <ul className="flex flex-wrap justify-center gap-3 text-[11px] lg:gap-8 lg:text-lg pb-1">
        <li>
          <p
            onClick={scrollToTop}
            className="hover:text-pink-500 transition cursor-pointer"
          >
            Home
          </p>
        </li>
        <li><Link className="hover:text-pink-500 transition" to="/AboutUs">About</Link></li>
        <li><Link className="hover:text-pink-500 transition" to="/Contact">Contact</Link></li>
        <li><Link className="hover:text-pink-500 transition" to="/Faq">FAQ</Link></li>
        <li><Link className="hover:text-pink-500 transition" to="/Privacy">Privacy Policy</Link></li>
        <li><Link className="hover:text-pink-500 transition" to="/Tnc">T&C</Link></li>
        <li><Link className="hover:text-pink-500 transition" to="/Services">Services</Link></li>
      </ul>

    </footer>
  );
}

export default Footer;
