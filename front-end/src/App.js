
import './App.css';
import {useState} from "react";
const axios = require('axios').default;


function App() {
  const [source,setSource]=useState("");
  const [destination,setDestination]=useState("");
  const [flightClass,setFlightClass]=useState("economy");
  const [flightDate,setFlightDate]=useState("");
  const [result,setResult]=useState([]);


  return (
    <div className="App">
      <div className="center">
      <form onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <label>
          Pick Source:
          <select value={source} onChange={(e)=>{setSource(e.target.value);
          console.log(e.target.value);}}>
            <option value=""></option>
            <option value="kyoto">kyoto</option>
            <option value="frankfurt">frankfurt</option>
            <option value="new delhi">new delhi</option>
            <option value="hamburg">hamburg</option>
            <option value="berlin">berlin</option>
            <option value="tokyo">tokyo</option>
            <option value="amsterdam">Amsterdam</option>
            <option value="new york">new york</option>
          </select>
        </label>
        <label>
          Pick Destination:
          <select value={destination} onChange={(e)=>{setDestination(e.target.value);}}>
            <option value=""></option>
            <option value="frankfurt">frankfurt</option>
            <option value="new delhi">new delhi</option>
            <option value="hamburg">hamburg</option>
            <option value="berlin">berlin</option>
            <option value="tokyo">tokyo</option>
            <option value="amsterdam">Amsterdam</option>
            <option value="new york">new york</option>
          </select>
        </label>
        <label>
          Pick Flight class:
          <select value={flightClass} onChange={(e)=>{setFlightClass(e.target.value);}}>
            <option value="economy">Economy</option>
            <option value="business class">Business Class</option>
            <option value="first class">First Class</option>
          </select>
        </label>
        <input type="date" onChange={(e)=>{setFlightDate(e.target.value);}}/>
        <input type="submit" value="Search Flights" onClick={(e)=>{
          e.preventDefault();
          if(!(source===destination || flightDate==="" || destination==="" || source==="" || flightDate==="")){

            axios.get(`http://localhost:2020/api/getOne/${source}/${destination}/${flightClass}/${flightDate}`)
              .then(function (response) {
                setResult([]);
                setResult([...(response.data)]);
                let classCost
                if(flightClass==="economy"){
                  classCost=0
                }else if(flightClass==="business class"){
                  classCost=56
                }else if(flightClass==="first class"){
                  classCost=108
                }
                console.log("........................................................");
                (response.data).forEach((el)=>{

                  console.log(`from-${el.source} to-${el.destination} price-${parseInt(el.price)+classCost} `)
                });
                console.log("........................................................");
                
              })
              .catch(function (error) {
                
                console.log(error);
              })
              // .then(function () {
              //   // always executed
              // });

          }else{
            alert(" Source and Destination should not be same and Fill all the fields")
          }
        }}/>
      </form>
      <div>
        {result.forEach((el)=>{
          <div>
            `from-${el.source} to-${el.destination} price-${el.price} `
          </div>
        })}
      </div>

      </div>
    </div>
  );
}

export default App;
