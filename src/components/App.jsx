import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {

  const API_URL = "http://localhost:3001/toys";

  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  
  useEffect(() => {
    getToys();
  }, [])
  
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function getToys() {
    fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch toys");
      return res.json();
    })
    .then((toyData) => {
      setToys(toyData); 
    })
    .catch((err) => console.log("Unable to get plants: " + err.message));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;
