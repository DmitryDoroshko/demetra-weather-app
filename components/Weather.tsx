import {useContext} from "react";
import {WeatherContext} from "@/store/weather-context";
import {CircularProgress} from "@mui/material";

export const Weather = () => {
  const {isWeatherLoading, weather, unitSystem, selectedCity, currentDate} = useContext(WeatherContext);

  const selectedCityCapitalized = selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1, selectedCity.length);

  return (
      <>
        {isWeatherLoading && <CircularProgress/>}

        {weather && (<main style={{fontSize: "3rem"}}>
          <div>Current date: {currentDate?.toISOString()}</div>
          <div>Location: {selectedCityCapitalized}</div>
          <div>Condition: {weather.condition}</div>
          <div>Temperature: {unitSystem === "metric" ? `${weather.temperature.celsius}C` : `${weather.temperature.fahrenheit}F`}</div>
          <div>Humidity: {weather.humidity}</div>
          <div>Wind: {unitSystem === "metric" ? `${weather.wind.kilometers}kph` : `${weather.wind.miles}mph`}</div>
          <div>Precipitation: {unitSystem === "metric" ? `${weather.precipitation.millimeters}mm` : `${weather.precipitation.inches}in`}</div>
        </main>)}
      </>
  );
};
