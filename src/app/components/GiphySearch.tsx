/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";

type Gif = {
  id: string;
  url: string;
  title: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 3;
  dotenv.config();

  const GIPHY_API_KEY: string = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
  const GIPHY_API_URL: string = "https://api.giphy.com/v1/gifs/search";

  const searchGifs = async (url: string) => {
    try {
      const response = await axios.get(url, {
        params: {
          api_key: GIPHY_API_KEY,
          q: query,
          offset,
        },
      });
      console.log(response.data);
      const newGifs: Gif[] = response.data.data.map((gif: any) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        title: gif.title,
      }));
      if (offset === 0) {
        setGifs(newGifs);
      } else {
        setGifs((prevGifs) => [...prevGifs, ...newGifs]);
      }
    } catch (error) {
      console.error("Opps, Somthing went wrong!", error);
    }
  };

  useEffect(() => {
    if (query !== "") {
      searchGifs(GIPHY_API_URL);
    }
  }, [query, offset]);

  const handleSearch = () => {
    setOffset(0);
    searchGifs(GIPHY_API_URL);
  };

  const handleNext = () => {
    setOffset(offset + limit);
  };

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };


  return (
    <>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-black "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border-none focus:outline-none rounded-lg bg-gray-200 placeholder:text-black"
            placeholder="Article name or keywords..."
            required
          />
          <button
            onClick={handleSearch}
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-700 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2  "
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2  w-full  gap-3 py-4">
        {gifs.slice(offset, offset + limit).map((gif) => (
          // eslint-disable-next-line react/jsx-key
          <div className=" flex flex-col gap-2 items-start">
            <div className=" w-[100%] h-[350px] overflow-hidden rounded-lg">
              <img
                key={gif?.id}
                src={gif?.url}
                alt={gif?.title}
                className="w-[100%] h-[100%]"
              />
            </div>
            <span>{gif?.title}</span>
          </div>
        ))}
      </div>

      {gifs.length !== 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevious}
            disabled={offset === 0}
            className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={offset + limit >= gifs.length}
            className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
