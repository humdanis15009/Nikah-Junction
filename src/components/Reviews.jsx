import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          arrows: true,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          arrows: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h1 className="lg:text-5xl text-xl font-semibold text-pink-700 mt-8 text-center">
        JOYFUL JOURNEYS
      </h1>
      <h2 className="lg:text-4xl text-lg text-center text-gray-600 my-4">
        &ldquo;See What Our Delighted Clients Have to Say&ldquo;
      </h2>
      <div className="lg:mt-[60px] lg:mb-16 mb-10 lg:mr-16 lg:ml-20 overflow-hidden lg:h-[560px]">
        <Slider {...settings} className="relative ">
          <div className="flex items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="object-fill rounded-2xl w-[225px] lg:h-[250px] lg:w-[310px] h-[180px]"
                src="images/photoo.jpg"
                alt="wedding-photo"
              />
              <p className="text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★★
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                -ZOHA & FAYYAZ
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;"Dil se shukriya Nikah Junction ko, jisne hamari story ko
                sach kiya! Pehli mulaqat se lekar hamare khoobsurat shadi ke din
                tak, aapki service ek blessing thi. Aapka safar aise hi aur bhi
                khushiyan laata rahe!"&ldquo;
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="object-fill rounded-2xl w-[225px] lg:h-[250px] lg:w-[310px] h-[180px]"
                src="images/photoo3.jpg"
                alt="wedding-photo"
              />
              <p className="text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★★
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                -SABA & NADEEM
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;Nikah Junction ka shukriya, aap ne humein milaya! Aap ki
                khidmat humare liye barakat thi, jis ne humein khushi aur saath
                rehne ka moka diya. Hum shukar guzaar hain!&ldquo;
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="rounded-2xl w-[225px] lg:h-[250px] lg:w-[310px] h-[180px] object-fill"
                src="images/photoo7.jpeg"
                alt="wedding-photo"
              />
              <p className="text-center mt-text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★★
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                -SABIYA & ZEESHAN
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;Nikah Junction made the search for my life partner so
                easy and comfortable. Their team was very supportive. I could
                focus on finding the right match without any worries, thanks to
                their organized and professional approach!&ldquo;
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="rounded-2xl w-[225px] lg:h-[250px] lg:w-[310px] h-[180px] object-fill"
                src="images/photoo4.png"
                alt="wedding-photo"
              />
              <p className="text-center mt-text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★☆
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                - SHEZI & AKRAM
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;Nikah Junction gave us a reliable and safe platform to
                find our perfect match. The process was simple, and the team was
                very cooperative. We found our ideal partner here and couldn’t
                be happier!&ldquo;
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="rounded-2xl object-fill w-[225px] lg:h-[250px] lg:w-[310px] h-[180px]"
                src="images/photoo2.jpg"
                alt="wedding-photo"
              />
              <p className="text-center mt-text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★★
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                -FATIMA & AYAAN
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;Nikah Junction ka platform aur inki service dono hi
                behatreen hain. Unki team humein har kadam pe guide karti rahi
                jis wajah se humein apna ideal match mila. Bahut hi badiya
                experience!&ldquo;
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="lg:h-[500px] h-[370px] w-[250px] mx-auto lg:w-[350px] shadow-2xl rounded-2xl border-2 border-pink-700 lg:p-4 p-2 flex flex-col items-center">
              <img
                className="rounded-2xl w-[225px] lg:h-[250px] lg:w-[310px] h-[180px] object-fill"
                src="images/photoo5.jpg"
                alt="wedding-photo"
              />
              <p className="text-center mt-text-center lg:text-[12px] text-[10px] mt-3">
                ★★★★☆
              </p>
              <p className="lg:text-sm text-[11px] text-pink-700 font-bold my-3 text-center">
                -RUKHSAR & AMIR
              </p>
              <p className="text-center lg:text-sm text-[11px] text-gray-700">
                &ldquo;Myself Amir Sheikh and I am overjoyed to share our
                fantastic experience with Nikah Junction. The personalized
                support and genuine connections made all the difference. For
                anyone on a quest for meaningful rishta, this is a top
                choice!&ldquo;
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default Reviews;
