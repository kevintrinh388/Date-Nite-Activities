/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Mynavbar } from './components/Mynavbar';


function App() {
  const [activities, setActivities] = useState([]);
  const [mapsLink, setMapsLink] = useState("");
  const userLocation = useRef("Atlanta, GA");
  const searchTerm = useRef("Restaurants");
  const searchRating = useRef(0);
  const searchPrice = useRef("1,2,3,4");

  function searchYelp(){
    fetch('/search_yelp', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        content_type: 'application/json',
      },
      body: JSON.stringify({
        'location':userLocation.current,
        'term' : searchTerm.current,
        'rating' : searchRating.current,
        'price' : searchPrice.current,
      }),
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

     {useEffect(() => {searchButton()},[])}

      <div className='list'>
        <div className='filter'>
          <select name='type' id='type' onChange={(e)=>searchTerm.current = e.target.value}>
            <option value='Restaurant'>Restaurant</option>
            <option value='Activity'>Activity</option>
          </select>

          <select name='rating' id='rating' onChange={(e)=>searchRating.current = e.target.value}>
            <option value= '1'> 1 and up </option>
            <option value= '2'> 2 and up </option>
            <option value= '3'> 3 and up </option>
            <option value= '4'> 4 and up </option>
            <option value= '5'> 5 </option>
          </select>

          <select name='price' id='price' onChange={(e)=>searchPrice.current = e.target.value}>
            <option value= '1,2,3,4'> $-$$$$ </option>
            <option value= '1,2,3'> $-$$$ </option>
            <option value= '1,2'> $-$$ </option>
            <option value= '1'> $ </option>
          </select>

          <button type='button' onClick={()=>searchButton()}>Filter!</button>
        </div>



        {activities.map(activities => 
          <div>
            <h1>{activities.name}</h1>
            <h2>{activities.location.address1},{activities.location.city},
                {activities.location.state},{activities.location.zip_code}
            </h2>
            <h3>
              <button onClick={() => updateMap(activities.name.split(' ')[0] + ' ' + activities.location.address1)}>Click to view on map</button>
            </h3>
            <h3><a href={activities.url}>Click to visit yelp page</a></h3>
            <img src={activities.image_url} alt={activities.name} width="400" height="400"></img>
            <h3> Rating is {activities.rating}</h3>
            {'price' in activities &&
              <h3>Price is {activities.price}</h3>
            }
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
