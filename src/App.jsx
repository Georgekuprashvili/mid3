import { useState, React } from "react";
import Form from "./components/Form";
import filmimg from "./assets/images/Movie.svg";
import favourite from "./assets/images/favourites.png";
import tv from "./assets/images/tv.svg";
import film from "./assets/images/film.png";
import profileimg from "./assets/images/profile.png";
import search from "./assets/images/search.svg";
import data from "./data.json";
import oval from "./assets/images/Oval Copy.svg";
import start from "./assets/images/start.png";
import { Swiper, SwiperSlide } from "swiper/react";
import save from "./assets/images/save.svg";
import "swiper/css";
import All from "./components/svg/all";
import Filmsvg from "./components/svg/Filmsvg";
import TVsvg from "./components/svg/TVsvg";
import Favourite from "./components/svg/Favourite";
import Favouritesecond from "./components/svg/Facouritesecond";

function App() {
  const [visibleApp, setVisibleApp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(data);
  const [play, setPlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeslider, setActiveslider] = useState(true);
  const noneslider = () => {
    setActiveslider(false);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredMovies(data);
    } else {
      setFilteredMovies(
        data.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  const filteredCategoryMovies = filteredMovies.filter((movie) => {
    if (selectedCategory === "all") return true;
    return movie.category === selectedCategory;
  });

  return (
    <>
      {!visibleApp ? (
        <Form setVisibleApp={setVisibleApp} />
      ) : (
        <div className="flex p-[30px] w-[100%] h-[auto] gap-[36px]">
          <div className="w-[96px] h-[100%] bg-[#161D2F] rounded-2xl flex items-center flex-col p-[32px]">
            <img src={filmimg} />
            <div className="flex flex-col gap-[45px] h-[200px] mt-[77px]">
              <button onClick={() => setSelectedCategory("all")}>
                <All
                  onClick={() => {
                    setActiveslider(true);
                  }}
                />
              </button>
              <button onClick={() => setSelectedCategory("Movie")}>
                <Filmsvg
                  onClick={() => {
                    setActiveslider(false);
                  }}
                />
              </button>
              <button onClick={() => setSelectedCategory("TV Series")}>
                <TVsvg
                  onClick={() => {
                    setActiveslider(false);
                  }}
                />
              </button>
              <button>
                <Favourite
                  onClick={() => {
                    setActiveslider(false);
                  }}
                />
              </button>
            </div>
            <div className="mt-[450px]">
              <img src={profileimg} />
            </div>
          </div>

          <div className="flex flex-col w-[100%] gap-[40px]">
            <div className="flex gap-[24px]">
              <button onClick={handleSearch}>
                <img src={search} />
              </button>
              <input
                className="w-[100%] text-white font-outfit text-[24px] font-normal leading-normal opacity-[0.4979] bg-transparent border-b border-gray-500 focus:outline-none"
                type="text"
                placeholder="Search for movies or TV series"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm === "" && activeslider && (
              <div className="max-w-[1500px] w-[100%]">
                <h1 className="text-white font-outfit text-[32px] font-normal leading-normal tracking-[-0.5px]">
                  Trending
                </h1>
                <Swiper spaceBetween={10} slidesPerView={3} loop={true}>
                  {data
                    .filter((movie) => movie.isTrending)
                    .map((movie, index) => (
                      <SwiperSlide key={index}>
                        <div
                          onClick={() => {
                            setPlay(!play);
                          }}
                          className="relative cursor-pointer"
                        >
                          <img
                            onClick={() => {
                              setPlay(true);
                            }}
                            className="rounded-[8px] max-w-[470px] w-[100%] "
                            src={movie.thumbnail.trending.large}
                            alt={movie.title}
                          />
                          <div className="absolute bottom-4 left-4 text-white">
                            <p>
                              {movie.year} • {movie.category} • {movie.rating}
                            </p>
                            <h2 className="text-lg font-bold">{movie.title}</h2>
                          </div>
                          {play && (
                            <div className="absolute max-w-[117px] w-[100%] h-[48px] rounded-[28.5px] flex gap-[20px] bg-gray-300 items-center justify-center left-[155px] top-[94px]">
                              <img src={start} />
                              <p className="text-[ #FFF] font-outfit text-[18px] font-normal leading-normal">
                                Play
                              </p>
                            </div>
                          )}
                          <button className=" absolute top-[11px] right-[40px]">
                            <Favouritesecond />
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            )}

            <div className="h-[100%]">
              <h1 className="text-white font-outfit text-[32px] font-normal leading-normal tracking-[-0.5px]">
                {selectedCategory === "all"
                  ? "Recommended for you"
                  : selectedCategory}
              </h1>
              <div className="flex flex-wrap gap-[50px]">
                {filteredCategoryMovies.length > 0 ? (
                  filteredCategoryMovies.map((movie, index) => (
                    <div
                      key={index}
                      className="flex flex-col  w-[330px] h-[255px]"
                    >
                      <div className=" relative">
                        <img
                          className="rounded-[8px]"
                          src={movie.thumbnail.regular.small}
                          alt={movie.title}
                        />
                        <button className=" absolute top-[11px] right-[17px]">
                          <Favouritesecond />
                        </button>
                      </div>
                      <div className="flex w-[156px] justify-between items-center mt-[10px]">
                        <p className="text-white">{movie.year} </p>
                        <img src={oval} />
                        <img
                          className="w-[12px] h-[12px]"
                          src={movie.category === "Movie" ? film : tv}
                        />
                        <p className="text-white">{movie.category} </p>
                        <img src={oval} />
                        <p className="text-white">{movie.rating} </p>
                      </div>
                      <h1 className="text-white">{movie.title}</h1>
                    </div>
                  ))
                ) : (
                  <p className="text-white text-xl mt-5">No movies found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
