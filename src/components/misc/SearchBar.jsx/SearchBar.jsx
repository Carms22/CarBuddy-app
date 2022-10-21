
import MapboxAutocomplete from "react-mapbox-autocomplete";

const mapAccess = {
  // Thanks to SomeSoftwareTeam (https://github.com/SomeSoftwareTeam/some-react-app/blob/acd17860b8b1f51edefa4e18486cc1fb07afff70/src/components/SomeComponent.js)
  mapboxApiAccessToken:
  "pk.eyJ1IjoiY2FybXNieWRkeSIsImEiOiJjbDloY2tkdjQyZ29iM3BxdDg2enlmeTcwIn0.NgmXVYbTuJuWFyyxOxJC7Q"
};

function SearchBar(origin, destination) {
  
  function _suggestionSelect(result, lat, long, text) {
    origin.location =[lat, long]
    destination.location=[lat,long]
    console.log(result, lat, long, text);
  }
  return (
    <div className="">
      <h1>Mapbox location autocomplete</h1>

        <MapboxAutocomplete
          publicKey={mapAccess.mapboxApiAccessToken}
          inputClass="form-control search"
          onSuggestionSelect={_suggestionSelect}
          country="es"
          resetSearch={false}
          placeholder="Search Address..."
        />
  
    </div>
  );
}

export default SearchBar;






// import React, {useState}from "react"

// function SearchBar() {
//   const [value, setValue] = useState('');

//   return (
//   <form>
    
//   </form>
//   );
//   }

// export default SearchBar;