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

  function handleAddNewToy(newToy) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add toy");
        return res.json();
      })
      .then((savedToy) => {
        setToys((prevToys) => [...prevToys, savedToy]);
      })
      .catch((err) => setError(err.message));
  }

  function handleDonateToy(toyIdToDelete) {

    const URL_DELETE = API_URL + "/" + toyIdToDelete;
    fetch(URL_DELETE, {
            method: "DELETE"
      })
        .then(r => {
            if (!r.ok) {throw new Error("failed to delete toy") }
            setToys(previousToys => previousToys.filter(toy => toy.id != toyIdToDelete));
          })
        .catch(error => console.log(error.message))
    }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddNewToy={handleAddNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDonateToy={handleDonateToy} />
    </>
  );
}

export default App;