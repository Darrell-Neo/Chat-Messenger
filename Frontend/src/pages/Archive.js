import React, { useContext, useState, useEffect } from "react";
import ReactContext from "../context/react-context";

const Archive = () => {
  const reactCtx = useContext(ReactContext);
  const [listingArchives, setListingArchives] = useState([]);

  useEffect(() => {
    displayListingsArchives("http://localhost:5001/listings/displayAll");
  }, [reactCtx.refreshState]);

  const displayListingsArchives = async (url) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer" + reactCtx.access,
      },
    };

    try {
      const res = await fetch(url, options);

      if (res.status !== 200) {
        throw new Error("Could not fetch listings archive");
      }

      const data = await res.json();
      console.log(data);

      const archives = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].isArchive === true) {
          archives.push(data[i]);
        }
      }

      console.log(archives);
      setListingArchives(archives);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {listingArchives &&
        listingArchives.map((item, index) => {
          return (
            <div
              key={index}
              className="ml-4 my-2 mx-3 pl-2 w-64 h-96 inline-block m-2 p-2 rounded-lg shadow-lg"
            >
              <div>
                <img
                  src={require(`../images/${item.image}`)}
                  alt="img"
                  className="mx-auto max-h-48 w-auto"
                />
                {/* <img src={require(`../images/charmander.png`)} alt="img" /> */}{" "}
              </div>
              <div>
                <p className="text-xl">{item.title}</p>
              </div>
              <div>
                <p className="text-m">Pet Name: {item.petName}</p>
              </div>
              <div>
                <p className="text-m">Species: {item.species}</p>
              </div>
              <div>
                <p className="text-m">Breed: {item.breed}</p>
              </div>
              <div>
                <p className="text-m">
                  Favourite Count: {item.favouritesCount}
                </p>
              </div>
              <div>
                <button
                  id={item._id}
                  onClick={reactCtx.removeFromArchive}
                  className="text-center mx-auto inline-block w-50 px-3 mx-6 text-white font-semibold button-85"
                >
                  Un-archive
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Archive;
