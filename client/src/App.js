import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [plants, setPlants] = useState([]);
  const formInitialState = {plantId: "", plantName: "", username: "", wateringFrequency: "", isWatered: "", lastWatered:"" };
  const [formData, setFormData] = useState(formInitialState);

  const getPlants = () => {
    fetch('/plants')
      .then((response) => response.json())
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

  function handleInputChange(event) {
    let { name, value } = event.target;
    setFormData({...formData, [name]: value});
  }

  function handleSubmit(event, newPlant) {
    event.preventDefault();
    addPlant(formData.plantName, formData.username);
    setPlants((state) => [...state, newPlant]);
    setPlants(formInitialState);
  };

  const addPlant = async (plantName, username) => {
    //console.log(plantName)
    console.log(plants);
    let plant = { plantName, username };
    let options = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(plant),
    };

    try {
      await fetch("/plants", options);
      getPlants();
    } catch (err) {
      console.log("Network error:", err);
    }
};


  return (
    <div className="title p-3 mb-2 bg-success text-white">

    <h1 className="title"> Feed Me, Seymore </h1>

    {/* <header className="button-container" > Add Plants Here: </header> */}
      <form className="grid-container" onSubmit={handleSubmit}>
       <label className="plantadd">New Plant</label>
       <input
       type= "text"
       onChange={e => handleInputChange(e)}
       name="plantName"
       value={ formData.plantName }
       placeholder="Your plant here"
       />
       
       <label className="usernameadd">Username</label>
       <input
       type= "text"
       onChange={e => handleInputChange(e)}
       name="username"
       value={ formData.username }
       placeholder="Username here"
       />

        <button className="submit" 
        > Add Plant
        </button>
        </form>
       
          <h3>{plants.plantName}</h3>       
        <div className="row row-cols-sm-3 row-cols-md-3">
        {plants.map((plants) => (
          <div className= "col-sm">
            <div className="col">
          </div>
          <div class="col">
            </div>
          <div class="col">
              </div>
            <div className="card">
              <div className="card-body shadow-border-0">
                <h4> {plants.plantName}</h4>
                 <div className="header">
                 Last Watered: {plants.lastWatered}
                 <div className="card-header shadow-border-0">
                </div>
                </div>
                </div>
                </div>
                </div>
              
                
                
       
        ))}

        



        
     </div>
     </div>
   
      
    
    
  );
}

export default App;
