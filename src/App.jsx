import { useState } from "react";
import Form from "./components/Form";
import filmimg from "./assets/images/movie.svg";
import favourite from "./assets/images/favourites.png";
import tv from "./assets/images/tv.png";
import film from "./assets/images/film.png";
import all from "./assets/images/all.png";
import profileimg from "./assets/images/profile.png";

function App() {
  const [visibleApp, setVisibleApp] = useState(false);

  return (
    <>
      {!visibleApp ? (
        <Form setVisibleApp={setVisibleApp} />
      ) : (
        <div className="flex  p-[30px] w-[100%] h-[100%]">
          <div className="w-[96px] h-[100%] bg-[#161D2F] rounded-2xl flex items-center flex-col p-[32px] gap-[80px] ">
            <img src={filmimg} />

            <div className="flex flex-col gap-[45px] ">
              <img src={all} />
              <img src={film} />
              <img src={tv} />
              <img src={favourite} />
            </div>
            <img src={profileimg} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
