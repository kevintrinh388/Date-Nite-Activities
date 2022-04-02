/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mynavbar } from './components/Mynavbar';


function App() {
  const [activities, setActivities] = useState([]);
  const [mapsLink, setMapsLink] = useState("");
  const userLocation = useRef("Atlanta, GA")

  function searchYelp(){
    fetch('/search_yelp', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        content_type: 'application/json',
      },
      body: JSON.stringify(userLocation.current),
    }).then((response) => response.json()).then((data) => {
      setActivities(data)
    });
  }

  function searchMaps(){
    fetch('/search_maps', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        content_type: 'application/json',
      },
      body: JSON.stringify(userLocation.current),
    }).then((response) => response.json()).then((data) => {
      setMapsLink(data)
    });
  }

  function updateMap(newLocation){
    userLocation.current = newLocation
    searchMaps()
  }

  function searchButton(){
    console.log(userLocation)
    searchYelp()
    searchMaps()
  }

  useEffect(() => {searchButton()},[])

  return (
    <div className="App">

    <Mynavbar searchButton={searchButton} userLocation={userLocation}/>

      <label for="location_search">Explore new places</label>
      <input id="location_search" type="text" name="location" defaultValue="Atlanta, GA" onChange={(e) => userLocation.current = e.target.value}/>      
      <button type="button" onClick={() => searchButton()}>Search!</button>

      <div className='list'>
        {activities.map(activities => 
          <div>
            <h1>{activities.name}</h1>
            <h2>{activities.location.address1},{activities.location.city},
                {activities.location.state},{activities.location.zip_code}
            </h2>
            <h3>
              <button onClick={() => updateMap(activities.name + activities.location.address1)}>Click to view on map</button>
            </h3>
            <h3><a href={activities.url}>Click to visit yelp page</a></h3>
            <img src={activities.image_url} alt={activities.name} width="400" height="400"></img>
            <h3> Rating is {activities.rating}</h3>
          </div>
        )}
      </div>
      
      <div className='map'>
        <iframe 
        title='google-map'
        className='map'
        src={mapsLink}>
        </iframe>
      </div>
          
    </div>
  );
}

export default App;
