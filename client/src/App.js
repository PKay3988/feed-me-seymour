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

useEffect(()=> {
  getPlants();
}, []);

  return (
    <div className="bg-dark">

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Watering Reminders
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" href="#">Text Message Alerts</a></li>
            <li><a class="dropdown-item" href="#">Email Alerts</a></li>
            <li><a class="dropdown-item" href="#">Stop Alerts</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div className="title p-3 mb-2 bg-success text-white">
    <h1 className="title"> Feed Me, Seymore </h1>
    </div>

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
       type= "image"
       onChange={e => handleInputChange(e)}
       name="plantimage"
       value={ formData.image }
       placeholder="Username here"
       /> 

      <label className="pictureadd">Username</label>
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
       
        <div className="row row-cols-sm-3">
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
                </div>
                <h4> { plants.plantName }</h4>
                 <div className="header">
                 Last Watered: { plants.lastWatered }
                 <img
                  src={""}
                  class="card-img-top"
                   alt="..."
                    />
                 </div>
                 <div className="card-header shadow-border-0">
                  </div>
              </div>
            </div>  
        ))}

     </div>
     </div>
   
      
    
    
  );
}

export default App;
