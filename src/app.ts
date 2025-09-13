import axios from "axios";
import keys from "../keys";
import '../app.css';

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

if (!document.getElementById('google-maps-script')) {
  const script = document.createElement('script');
  script.id = 'google-maps-script';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${keys.GOOGLE_MAPS_API_KEY}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${keys.GOOGLE_MAPS_API_KEY}`
    )
    .then(response => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: coordinates,
        zoom: 16
      });

      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
