import { response } from 'express';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [plants, setPlants] = useState([]);
  const formInitialState = {plantName: "", username: ""};
  let [formData, setFormData] = useState([formInitialState]);

  const getPlants = () => {
    fetch('/:plants')
      .then((res) => res.json())
      .then((plants) => {
         setPlants(plants);
      })
      .catch((error) => {
        console.log(error);
      });
  };

useEffect(()=> {
  getPlants();
}, []);

  const handleInputChange = (event) => {
    // let newId = plants.length;
    //newPlant.id = newId;
    let { name, value /*,username, value2*/ } = event.target;
    setFormData({...formData, [name]: value, /*[username]: value2*/});
  }
    // add newPlant to State
    // setPlants((state) => [...state, newPlant]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    addPlant(formData.plant/*, formData.username*/);
    setPlants(formInitialState);
  };

//   const addPlant = async (name/*, username*/) => {
//     let plant = { name/*, username*/ };
//     let options = {
//       method: "POST",
//       headers: {"Content-Type": "application/json" },
//       body: JSON.stringify(plant),
//     };

//     try {
//       let response = await fetch("/plants", options);
//       if (response.ok) {
//         let plants = await response.json();
//         setPlants(plants);
//       }
//     } catch (err) {
//       console.log("Network error:", err);
//     }
// };

//   const addPlant = async (name) => {
//     let plant = { name/*, username*/ };
//     let options = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(plant),
//     };

//     try {
//       await fetch("/students", options);
//       getPlants();
//     } catch (err) {
//       console.log("Network error:", err);
//     }
// } ;

  return (
    <div className="App">
    <h3> Build Your Garden </h3><header className="button-container"> 
      <form>
       <label className="plantadd">New Plant</label>
       <input
       type= "text"
       onChange={(e) => handleInputChange(e)}
       name="plantadder"
       value={ formData.plant }
       placeholder="Your plant here"
       />

        <button
        className="button" 
        > Add Plant
        </button>
        </form>
        
        
    </header>  
    
    </div>
  );
}

export default App;
