import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [plant, setPlants] = useState([]);

const addPlant = async (plantName) => {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  };
  
  try {
    let response = await fetch("/plants", options);
    if (response.ok) {
      let plants = await response.json();
      setPlants(plant);
    } else {
      console.log("server error:", response.status, response.statusText);
    }
  } catch (err) {
    console.log("Network error:", err.message);
  }
} 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
