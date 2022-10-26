
import MapboxAutocomplete from "react-mapbox-autocomplete";

const mapAccess = {
  // Thanks to SomeSoftwareTeam (https://github.com/SomeSoftwareTeam/some-react-app/blob/acd17860b8b1f51edefa4e18486cc1fb07afff70/src/components/SomeComponent.js)
  mapboxApiAccessToken:
  "pk.eyJ1IjoiY2FybXNieWRkeSIsImEiOiJjbDloY2tkdjQyZ29iM3BxdDg2enlmeTcwIn0.NgmXVYbTuJuWFyyxOxJC7Q"
};

function SearchBar({handleSearchBar, name, placeholder}) {
  //para pasarle la info del hijo-SearchBar 
  // al padre-JourneyForm tenemos que 
  //usar un callback q es handleSearchBar
  //las props name y placeholder se pasan de JourneyForm a SearchBar
  
  function suggestionSelect(text, lat, long) {
    handleSearchBar(lat, long, text, name)
  }
  return (
    <div className="">
        <MapboxAutocomplete
          publicKey={mapAccess.mapboxApiAccessToken}
          inputClass="form-control search"
          onSuggestionSelect={suggestionSelect}
          country="es"
          resetSearch={false}
          placeholder={placeholder}
        />
    </div>
  );
}

export default SearchBar;
