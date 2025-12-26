import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, onSnapshot } from "firebase/firestore";

function Card() {
  const [userCount, setUserCount] = useState();
  const [str, setStr] = useState();

  useEffect(() => {
    const usersCollection = collection(db, "Biodata");

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      setUserCount(snapshot.size);
    });


    let data = Number(import.meta.env.VITE_USERS) + userCount;
    let strr = data.toString();
    let strrr = strr.substring(0, 1) + "," + strr.substring(1);

    setStr(strrr);

    return () => unsubscribe();
  }, [userCount]);

  return (
    <>
      <div className="flex">
        <div className="flex justify-evenly mx-auto lg:gap-x-24 gap-x-5 lg:my-20 mb-16">
          <div className="w-full gap-10 items-center leading-10">
            <div className="lg:w-[25vw] flex lg:h-[35vh] w-[100px] h-[125px] shadow-xl rounded-2xl border-t-2 justify-center items-center flex-col">
              <img
                className="lg:h-[80px] lg:w-[80px] h-[35px] w-[35px] lg:mb-3 mt-3"
                src="images/group (1).png"
                alt="members"
              />
              <span className="lg:text-4xl text-xl lg:font-extrabold font-semibold mt-2 lg:my-3">
                {str}
              </span>
              <p className="lg:text-3xl text-[11px] text-gray-600">
                Digital members
              </p>
            </div>
          </div>

          <div className="w-full px-1 gap-10 items-center">
            <div className="lg:w-[25vw] w-[100px] h-[125px] flex lg:h-[35vh] shadow-xl rounded-2xl border-t-2 justify-center items-center flex-col">
              <img
                className="lg:h-[80px] lg:w-[80px] h-[35px] w-[35px] lg:mb-3 mt-3"
                src="images/heart.png"
                alt="stories"
              />
              <span className="lg:text-4xl text-xl lg:font-extrabold font-semibold mt-2 mb-3 lg:my-3">
                35+
              </span>
              <p className="lg:text-3xl text-[11px] mb-3 text-gray-600">
                Digital Matches
              </p>
            </div>
          </div>

          <div className="w-full gap-10 items-center leading-10  ">
            <div className="lg:w-[25vw] w-[100px] h-[125px] flex lg:h-[35vh] shadow-xl rounded-2xl border-t-2 justify-center items-center flex-col">
              <img
                className="lg:h-[80px] lg:w-[80px] h-[35px] w-[35px] lg:mb-3 mt-3"
                src="images/building.png"
                alt="cities"
              />
              <span className="lg:text-4xl text-xl lg:font-extrabold font-semibold mt-2 lg:my-3">
                50+
              </span>
              <p className="lg:text-3xl text-[11px] text-gray-600">
                Partner cities
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
