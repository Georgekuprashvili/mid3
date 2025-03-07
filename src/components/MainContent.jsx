import { useState } from "react";
import "../App.css";
import Form from "./Form";
import filmimg from "../assets/images/Movie.svg";
import tv from "../assets/images/tv.svg";
import film from "../assets/images/film.png";
import profileimg from "../assets/images/profile.png";
import search from "../assets/images/search.svg";
import data from "../data.json";
import oval from "../assets/images/Oval Copy.svg";
import start from "../assets/images/start.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import All from "./svg/all";
import Filmsvg from "./svg/Filmsvg";
import TVsvg from "./svg/TVsvg";
import Favouritesecond from "./svg/Facouritesecond";
import Favourite from "./svg/Favourite";

function MainContent() {
  const [visibleApp, setVisibleApp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(data);
  const [play, setPlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeslider, setActiveslider] = useState(true);

  const noneslider = () => {
    setActiveslider(false);
  };

  const Bookmark = (movie) => {
    const updatedMovies = filteredMovies.map((item) =>
      item.title === movie.title
        ? { ...item, isBookmarked: !item.isBookmarked }
        : item
    );
    setFilteredMovies(updatedMovies);
  };

  const filteredCategoryMovies = filteredMovies.filter((movie) => {
    if (selectedCategory === "all") return true;
    return movie.category === selectedCategory;
  });

  const filteredBookmarkedMovies = filteredMovies.filter(
    (movie) => movie.isBookmarked
  );

  const displayMovies =
    selectedCategory === "favorites"
      ? filteredBookmarkedMovies
      : filteredCategoryMovies;
  return (
    <>
      {!visibleApp ? (
        <Form setVisibleApp={setVisibleApp} />
      ) : (
        <div className="flex p-[30px] w-[100%] h-[auto] gap-[50px] max-first:flex-col max-second:p-[0]">
          <div className="w-[96px] h-[100%] bg-[#161D2F] rounded-2xl flex items-center flex-col p-[32px] max-first:w-[100%] max-first:h-[72px] max-first:flex-row justify-between">
            <img src={filmimg} />
            <div className="flex flex-col gap-[45px] h-[200px] mt-[77px] max-first:flex-row max-first:mt-[0px] max-first:w-[179px] max-first:h-[20px] max-second:w-[133px] justify-around max-second:gap-0">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setActiveslider(true);
                }}
              >
                <All />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Movie");
                  noneslider();
                }}
              >
                <Filmsvg />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("TV Series");
                  noneslider();
                }}
              >
                <TVsvg />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("favorites");
                  noneslider();
                }}
              >
                <Favourite />
              </button>
            </div>
            <div className="mt-[450px] max-first:mt-[0px]">
              <img src={profileimg} />
            </div>
          </div>

          <div className="flex flex-col w-[100%] gap-[40px] max-second:p-[10px]">
            <div className="flex gap-[24px]">
              <button>
                <img src={search} />
              </button>
              <input
                className="w-[100%] text-white font-outfit text-[24px] font-normal leading-normal opacity-[0.4979] bg-transparent border-b border-gray-500 focus:outline-none"
                type="text"
                placeholder="Search for movies or TV series"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);

                  if (value.trim() === "") {
                    setFilteredMovies(data);
                  } else {
                    setFilteredMovies(
                      data.filter((movie) =>
                        movie.title.toLowerCase().includes(value.toLowerCase())
                      )
                    );
                  }
                }}
              />
            </div>

            {searchTerm === "" && activeslider && (
              <div className="max-w-[1500px] w-[100%]">
                <h1 className="text-white font-outfit text-[32px] font-normal leading-normal tracking-[-0.5px] max">
                  Trending
                </h1>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.5}
                  loop={true}
                  breakpoints={{
                    800: {
                      slidesPerView: 2.5,
                    },
                  }}
                >
                  {data
                    .filter((movie) => movie.isTrending)
                    .map((movie) => (
                      <SwiperSlide key={movie.id}>
                        <div
                          onMouseEnter={() => {
                            setPlay(movie.id);
                          }}
                          onMouseLeave={() => {
                            setPlay(null);
                          }}
                          className="relative cursor-pointer"
                        >
                          <img
                            className="rounded-[8px]"
                            src={movie.thumbnail.trending.large}
                            alt={movie.title}
                          />
                          <div className="absolute bottom-4 left-4 text-white">
                            <p>
                              {movie.year} • {movie.category} • {movie.rating}
                            </p>
                            <h2 className="text-lg font-bold">{movie.title}</h2>
                          </div>
                          {play === movie.id && (
                            <div className="absolute max-w-[117px] w-[100%] h-[48px] rounded-[28.5px] flex gap-[20px] bg-gray-300 items-center justify-center left-[50%] transform -translate-x-[50%] top-[130px] sm:top-[85px] sm:left-[50%] sm:transform-none  z-10">
                              <img src={start} />
                              <p className="text-[ #FFF] font-outfit text-[18px] font-normal leading-normal">
                                Play
                              </p>
                            </div>
                          )}

                          <button className="absolute top-4 right-4 z-10">
                            <Favouritesecond
                              movie={movie}
                              Bookmark={Bookmark}
                            />
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
              <div className="flex flex-wrap gap-[50px] max-one:justify-center max-one:mt-[50px] max-one:mr-[50px] ">
                {displayMovies.length > 0 ? (
                  displayMovies.map((movie, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="relative">
                        <div className="w-[280px] h-[185px]">
                          <img
                            className="rounded-[8px] w-[100%] h-[100%]"
                            src={movie.thumbnail.regular.small}
                            alt={movie.title}
                          />
                        </div>
                        <button className="absolute top-[11px] right-[17px]">
                          <Favouritesecond movie={movie} Bookmark={Bookmark} />
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
export default MainContent;
