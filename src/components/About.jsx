import Card from "./Card";

function About() {
  return (
    <>
      <div>
        <h1 className="text-center font-semibold lg:text-6xl text-3xl lg:mt-20 my-10 text-pink-700">
          About Us
        </h1>
        <h1 className="text-center text-gray-800 lg:text-5xl text-2xl lg:font-bold font-semibold lg:my-20 my-10">
          Trusted Muslim Matrimony Service
        </h1>
        <p className="text-center text-bold lg:text-4xl text-xl mb-12 text-gray-600">
          &quot;Guided by Allah, United in Love: Your Journey to a Blessed
          Match&quot;
        </p>
      </div>
      <Card />
    </>
  );
}

export default About;
