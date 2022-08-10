import React, { useContext, useEffect } from "react";
import ReactContext from "../context/react-context";
import { Link } from "react-router-dom";

const Home = () => {
  const reactCtx = useContext(ReactContext);

  // combined displayAll + search listings
  const fetchListings = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);

      const displayListings = [];
      // archive filter (display isArchive == false)
      for (let i = 0; i < data.length; i++) {
        if (data[i].isArchive === false) {
          displayListings.push(data[i]);
        }
      }

      // SEARCH filter
      function filterByValue(array, string) {
        return array.filter((o) => {
          // .filter will return array of the values that passed .some (boolean) test
          return Object.keys(o).some((k) => {
            if (typeof o[k] === "string")
              return o[k].toLowerCase().includes(string.toLowerCase());
          });
        });
      }

      const filterSearch = filterByValue(
        displayListings,
        reactCtx.searchListingInput
      );
      reactCtx.setListing(filterSearch);
      console.log(reactCtx.listing);
    } catch (error) {
      console.log(error);
    }
  };

  function handleListingSearch(event) {
    event.preventDefault();
    if (event.target.id === "searchInput")
      reactCtx.setSearchListingInput(event.target.value);
  }

  useEffect(() => {
    fetchListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, [reactCtx.searchListingInput, reactCtx.refreshState]);

  function submitListingSearch(event) {
    event.preventDefault();
    fetchListings("http://localhost:5001/listings/displayAll");
  }

  // setInterval(
  //   fetchDisplayListings("http://localhost:5001/listings/displayAll"),
  //   5000
  // );

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Search listings"
          id="searchInput"
          onChange={handleListingSearch}
          className="mx-auto m-2 w-1/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400
            focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
        ></input>
      </form>
      {reactCtx.listing &&
        reactCtx.listing.map((data, index) => {
          // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
          return (
            <div
              key={index}
              className="ml-4 my-2 mx-3 pl-2 w-64 max-h-96 inline-block m-2 p-2 rounded-lg shadow-lg"
            >
              <div>
                <img
                  src={require(`../images/${data.image}`)}
                  alt="img"
                  className="mx-auto max-h-48 w-auto"
                />
                {/* <img src={require(`../images/charmander.png`)} alt="img" /> */}
              </div>
              <div>
                <p className="text-xl">{data.title}</p>
              </div>
              <div>
                <p className="text-m">Pet Name: {data.petName}</p>
              </div>
              <div>
                <p className="text-m">Species: {data.species}</p>
              </div>
              <div>
                <p className="text-m">Breed: {data.breed}</p>
              </div>
              <div>
                <p className="text-m">
                  Favourite Count: {data.favouritesCount}
                </p>
              </div>
              <div>
                <button
                  id={data._id}
                  onClick={reactCtx.addToFavourites}
                  className="text-center mx-auto inline-block w-50 px-3 ml-4 text-white font-semibold button-85"
                >
                  Favourite
                </button>

                {reactCtx.userRole == "admin" ? (
                  <button
                    id={data._id}
                    onClick={reactCtx.addToArchives}
                    className="text-center mx-auto inline-block w-50 px-3 mx-6 text-white font-semibold button-85"
                  >
                    Archive
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Home;
