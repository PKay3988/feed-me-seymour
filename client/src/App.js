import React, { useEffect, useState } from 'react';
import './App.css';
import { send } from 'emailjs-com';
import  Modal from'./Component/Modal';
//import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from 'react-router-dom';

function App() {
  let [plants, setPlants] = useState([]);
  const formInitialState = {plantId: "", plantName: "", username: "", wateringFrequency: "", isWatered: "", lastWatered:"" };
  const [formData, setFormData] = useState(formInitialState); 
  // const currentTime = new Date();
  // const timestamp = currentTime.toLocaleString('en-US', { timeZone: 'America/Chicago' });
  const [openCard, setOpenCard] = useState(false);
  const [toSend, setToSend] = useState({
    from_name: '',
    to_name: '',
    message: '',
    reply_to: '',
  }); 
  
    // const currentDate = new Date();
  // const currentDayOfMonth = currentDate.getDate();
  // const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  // const currentYear = currentDate.getFullYear();
  // const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;  
 

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
  };

  function handleSubmit(event) {
    event.preventDefault();
    addPlant(formData.plantName, formData.username);
    // setPlants((state) => [...state]);
    setFormData(formInitialState);
  };

  const addPlant = async (plantName, username) => {
    //console.log(plantName)
    // console.log(plants);
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


  const handleWater = () => {
    let timestamp = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
    addWater(formData.plantName, timestamp);
  };

  const addWater = async (plantName, lastWatered) => {
    //console.log(plantName)
    // console.log(plants);
    let water = { plantName, lastWatered};
    let options = {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(water),
    };

    try {
      await fetch("/plants", options);
      getPlants();
    } catch (err) {
      console.log("Network error:", err);
    }
  };

  // const addTimestamp = async (plantName, lastWatered) => {
  //   //console.log(plantName)
  //   // console.log(plants);
  //   let watered = { plantName, lastWatered };
  //   let options = {
  //     method: "POST",
  //     headers: { 
  //       "Content-Type": "application/json" 
  //     },
  //     body: JSON.stringify(watered),
  //   };

  //   try {
  //     await fetch("/plants", options);
  //     getPlants();
  //   } catch (err) {
  //     console.log("Network error:", err);
  //   }
  // };

  const onSubmit = (e) => {
      e.preventDefault();
      send(
        'service_enfgb9f',
        'template_v2zh8ce',
        toSend,
        'user_riJqcWvN7Sz9EZ1Ap7MgO'
      )
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        })
        .catch((err) => {
          console.log('FAILED...', err);
        });
      };
    

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

    // function Home() {
  //   return <h2/>;
  // }
  
  // function About() {
  //   return <h2>About</h2>;
  // }
  
  // function Users() {
  //   return <h2>Kayla's Plant Hutch</h2>;
  // }

  // function Hutches() {
  //   return <h2>Plant Hutches</h2>;
  // }

  // function handleClick() {
  //   const varCheckBox= document.getElementById("myCheck")
  //   let newdDate = [...] + plants.lastWatered
  // }

 
useEffect(()=> {
  getPlants();
}, []);

  return (
    <div className="parent bg-light">
      {/* <Router>
        <div>
         <nav>
           <ul>
            <li>
              <Link to="/">Home</Link>
           </li>
            <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/hutches">Hutches</Link>
        </li>
      </ul>
    </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        <Route path="/hutches">
        </Route>
          <Hutches />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router> */}

  <div className="title p-3 mb-2 bg-success text-white">
    <h1 className="title"> Feed Me, Seymore </h1>
    </div>
  
    {/* <header className="button-container" > Add Plants Here: </header> */}
      <form className="grid-container" onSubmit={handleSubmit}>
      <fieldset>
        <legend><h3>Add New Plants to your Collection</h3></legend>

       <label className="plantadd">New Plant:</label>
       <input
       type= "text"
       onChange={e => handleInputChange(e)}
       name="plantName"
       value={ formData.plantName }
       placeholder="Your plant here"
       /><br/>
       
       <label className="usernameadd">Username:</label>
       <input
       type= "text"
       onChange={e => handleInputChange(e)}
       name="username"
       value={ formData.username }
       placeholder="Username here"
       /> 

      {/* <label className="url">Plant Photo</label>
       <input
       onChange={e => handleInputChange(e)}
       name="url"
      //  value={ formData.url }
       placeholder="URL here"
       />  */}

        <button className="submit-btn" 
        > Add Plant
        </button>
        </fieldset>
        </form>
        
       
        <div className="row row-cols-sm-1">
          {plants.map((plant) => (
          
          <div key ={plant.plantId} className= "col-sm">
            <div className="col">
          </div>
          <div className="col">
            </div>
          <div className="col">
              </div>
            <div className="card">
              <div className="card-body shadow-border-0">
                </div>
                <h4> { plant.plantName }</h4>
                <h5>  </h5>
                
                <div>
                  {/* <input type="checkbox" id= "myCheck" onChange={handleClick()}/>  */}
                  <button type= "submit" className="watered-button" onClick={handleWater}>Watered</button>
                  </div>
                 <div className="header">
                 Last Watered: { plant.lastWatered }
                
                
                 </div>
                 <div className="card-header shadow-border-0">
                  </div>
              </div>
            </div>  
            
        ))}

     </div>

     <div>
       <button className="openModalBtn"
    onClick={() =>{
      setOpenCard(true);
      }}
      >
        Open
        </button>
    { openCard && <Modal closeCard={setOpenCard} />}


     </div>

    <div className="email-notify">
    <form className="email" onSubmit={onSubmit}>
    {/* <label className="from">From:</label>
    <input
      type='text'
      name='from_name'
      placeholder='from name'
      value={toSend.from_name}
      onChange={handleChange}
    /> */}
      <fieldset>
        <legend><h3>Send an Email Reminder</h3></legend>
     <label className="to2">To Whom:</label>
     <input id= "to"
      className="to-box"
      type='text'
      name='to_name'
      placeholder='Recipient name'
      value={toSend.to_name}
      onChange={handleChange}
    /> <br/>
    
    <label className="email">Your Email:</label>
  
    <input id="email"
      className="email2"
      type='text'
      name='reply_to'
      placeholder='Receiver email'
      value={toSend.reply_to}
      onChange={handleChange}
  />
    
    {/* <label className="message">Your Reminder:</label>
    <input id="message"
      className="message-box"
      type='text'
      name='message'
      placeholder='Your message'
      value={toSend.message}
      onChange={handleChange}
    /> <br/> */}
     
    <button className="submit" type='submit'>Send Reminder</button>
    </fieldset>
  </form>
    </div>
    </div>
  )};

export default App;
