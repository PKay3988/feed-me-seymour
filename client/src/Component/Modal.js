import React from 'react'
import { useState, useContext } from 'react';
import "./Modal.css";

const Notification = (props) =>  {
    const dates = [
        {
          id: 0,
          date: "10/25/21",
          day: "Monday",
          time: "5:00 PM"
        }
    ]};
    

    
  

function Modal({closeCard}) {
    return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">
            <h1>Jade</h1>
            </div>
            <div className="body">
                <h3> Last Watered:</h3>
                <p> Monday</p>
                <p> 10/11/21 10:00am</p>
            </div>
            <div className="footer">
                <button onClick={()=>closeCard(false)}>Close</button>
                
            </div>
            </div>
            <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">
            <h1>Philodendron</h1>
            </div>
            <div className="body">
                <h3> Last Watered:</h3>
                <p> Friday </p>
                <p> 10/8/21 2:00pm</p>
            </div>
            <div className="footer">
                <button onClick={()=>closeCard(false)}>Close</button>
                
            </div>
            
            
            </div>

            <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">
            <h1>Oxalis</h1>
            </div>
            <div className="body">
                <h3> Last Watered:</h3>
                <p> Saturday </p>
                <p> 10/9/21 1:00pm</p>
            </div>
            <div className="footer">
                <button onClick={()=>closeCard(false)}>Close</button>
                
            </div>
            </div>
            </div>
            </div>
            </div>
            

            
    )
}


export default Modal
