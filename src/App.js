import { useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);

  const { lat, lng } = location;

  const getLocation = () => {
    setCountClicks(countClicks + 1);

    if (!navigator.geolocation)
      return <p>Your browser is does not support geolocation</p>;

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        console.log(pos);
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="App">
      <button onClick={getLocation} disabled={isLoading}>
        Get Current Location
      </button>
      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      <p>You requested position {countClicks} times</p>
    </div>
  );
}

export default App;
