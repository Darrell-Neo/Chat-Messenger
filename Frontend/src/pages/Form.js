import React, { useContext, useState } from "react";
import ReactContext from "../context/react-context";

const Form = () => {
  const reactCtx = useContext(ReactContext);

  const [uploadImage, setUploadImage] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);

  const submitForm = async (url) => {
    const formdata = new FormData();
    formdata.append("title", reactCtx.titleInput);
    formdata.append("image", uploadImage);

    formdata.append("petName", reactCtx.petNameInput);
    formdata.append("species", reactCtx.speciesInput);
    formdata.append("breed", reactCtx.breedInput);
    formdata.append("sex", reactCtx.sexInput);
    formdata.append("size", reactCtx.sizeInput);
    formdata.append("age", reactCtx.ageInput);
    formdata.append("medical", reactCtx.medicalInput);
    formdata.append("comments", reactCtx.commentsInput);

    formdata.append("ownerContactName", reactCtx.ownerNameInput);
    formdata.append("ownerContactEmail", reactCtx.ownerEmailInput);
    formdata.append("ownerContactPhone", reactCtx.ownerPhoneInput);
    formdata.append("ownerContactAddress", reactCtx.ownerAddressInput);

    const options = {
      method: "PUT",
      headers: {
        // "Content-Type": "multipart/form-data",
        authorization: "Bearer " + reactCtx.access,
      },
      body: formdata,
    };

    try {
      const res = await fetch(url, options);
      console.log(res);
      console.log(options);

      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      window.alert("Listing created!");
      setJustSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(event) {
    event.preventDefault();
    if (event.target.id === "title") reactCtx.setTitleInput(event.target.value);
    if (event.target.id === "petName")
      reactCtx.setPetNameInput(event.target.value);
    if (event.target.id === "breed") reactCtx.setBreedInput(event.target.value);
    if (event.target.id === "species")
      reactCtx.setSpeciesInput(event.target.value);
    if (event.target.id === "sex") reactCtx.setSexInput(event.target.value);
    if (event.target.id === "size") reactCtx.setSizeInput(event.target.value);
    if (event.target.id === "age") reactCtx.setAgeInput(event.target.value);
    if (event.target.id === "medical")
      reactCtx.setMedicalInput(event.target.value);
    if (event.target.id === "comments")
      reactCtx.setCommentsInput(event.target.value);
    if (event.target.id === "ownerName")
      reactCtx.setOwnerNameInput(event.target.value);
    if (event.target.id === "ownerEmail")
      reactCtx.setOwnerEmailInput(event.target.value);
    if (event.target.id === "ownerPhone")
      reactCtx.setOwnerPhoneInput(event.target.value);
    if (event.target.id === "ownerAddress")
      reactCtx.setOwnerAddressInput(event.target.value);
    if (event.target.id === "file") setUploadImage(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitForm("http://localhost:5001/listings/create");
  }

  function clearInputFields(event) {
    event.preventDefault();
    reactCtx.setTitleInput("");
    reactCtx.setPetNameInput("");
    reactCtx.setBreedInput("");
    reactCtx.setSpeciesInput("");
    reactCtx.setSexInput("");
    reactCtx.setSizeInput("");
    reactCtx.setAgeInput("");
    reactCtx.setMedicalInput("");
    reactCtx.setCommentsInput("");
    reactCtx.setOwnerNameInput("");
    reactCtx.setOwnerEmailInput("");
    reactCtx.setOwnerPhoneInput("");
    reactCtx.setOwnerAddressInput("");
    setJustSubmitted(false);
  }

  return (
    <>
      {!reactCtx.loginState ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>Log in to submit an adoption listing!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <h3 className=" text-2xl text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
              Submit An Adoption!
            </h3>
            <h3 className=" text-l text-center mx-auto m-2 w-1/3 block w-50 px-3 italic">
              <strong>We..</strong> thank you, for not abandoning your furchild.
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-2">
            <span className="col-start-1 col-end-4">
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Title of Listing"
                  id="title"
                  value={reactCtx.titleInput}
                  className="mx-auto m-2 w-2/3 block w-100 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Pet Name"
                  id="petName"
                  value={reactCtx.petNameInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>

              <div>
                <select
                  id="species"
                  onChange={handleChange}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
                  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                >
                  <option value="">Species</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Breed"
                  id="breed"
                  value={reactCtx.breedInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Sex"
                  id="sex"
                  value={reactCtx.sexInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Size"
                  id="size"
                  value={reactCtx.sizeInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Age of Pet"
                  id="age"
                  value={reactCtx.ageInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Medical Conditions"
                  id="medical"
                  value={reactCtx.medicalInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Comments"
                  id="comments"
                  value={reactCtx.commentsInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
            </span>
            <span className="col-end-7 col-span-3">
              <h3 className="text-center mx-auto m-2 w-1/3 block w-50 px-3">
                Contact Details:
              </h3>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Owner's Name"
                  id="ownerName"
                  value={reactCtx.ownerNameInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Owner's Email"
                  id="ownerEmail"
                  value={reactCtx.ownerEmailInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Owner's Phone"
                  id="ownerPhone"
                  value={reactCtx.ownerPhoneInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Owner's Address"
                  id="ownerAddress"
                  value={reactCtx.ownerAddressInput}
                  className="mx-auto m-2 w-2/3 block w-50 px-3 py-2 bg-white border-1 border-slate-300 rounded-md text-sm shadow-md placeholder-slate-400 capitalize
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:italic"
                ></input>
              </div>
              <div className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2">
                Cover Picture:
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  name="image"
                  onChange={handleChange}
                  placeholder="image"
                  id="file"
                ></input>
              </div>
            </span>
          </div>

          {
            <div>
              <button
                onClick={handleSubmit}
                className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold button-85"
              >
                Submit Pet!
              </button>
            </div>
          }

          {justSubmitted ? (
            <div>
              <button
                onClick={clearInputFields}
                className="text-center mx-auto m-2 w-1/3 block w-50 px-3 py-2 text-white font-semibold button-85"
              >
                Clear form
              </button>
            </div>
          ) : (
            <></>
          )}
        </form>
      )}
    </>
  );
};

export default Form;
