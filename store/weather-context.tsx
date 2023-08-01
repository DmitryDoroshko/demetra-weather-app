import React, {createContext, useEffect, useState} from "react";
import {SelectedCity, UnitSystem, Weather} from "@/types/weather.type";
import axios from "axios";
import {LOCAL_STORAGE_IDENTIFIER, WEATHER_API_URL} from "@/utils/constants";

type WeatherContext = {
  selectedCity: SelectedCity;
  weather: Weather;
  unitSystem: UnitSystem;
  setSelectedCity: (selectedCity: SelectedCity) => void;
  setUnitSystem: (unitSystem: UnitSystem) => void;
  isWeatherLoading: boolean;
  setIsWeatherLoading: (isLoading: boolean) => void;
};

export const WeatherContext = createContext<WeatherContext>({
  selectedCity: "chernihiv",
  unitSystem: "metric",
  weather: {
    precipitation: {
      inches: null,
      millimeters: null,
    },
    humidity: null,
    wind: {
      miles: null,
      kilometers: null,
    },
    temperature: {
      celsius: null,
      fahrenheit: null,
    },
  },
  setSelectedCity: null,
  setUnitSystem: null,
  isWeatherLoading: false,
  setIsWeatherLoading: null,
});

let isInitialAppLoad = true;

export const WeatherProvider = ({children}: {children: React.ReactNode}) => {
  const [selectedCity, setSelectedCity] = useState<SelectedCity>("chernihiv");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather>(null);

  useEffect(() => {
    if (isInitialAppLoad) {
      isInitialAppLoad = false;
      const dataFromLocalStorageExisting = localStorage.getItem(LOCAL_STORAGE_IDENTIFIER);
      if (!dataFromLocalStorageExisting) {
        return;
      }

      setIsWeatherLoading(true);
      const dataFromLocalStorageAsObject = JSON.parse(dataFromLocalStorageExisting);
      setSelectedCity(dataFromLocalStorageAsObject.selectedCity);
      setUnitSystem(dataFromLocalStorageAsObject.unitSystem);
      setWeather(dataFromLocalStorageAsObject.weather);

      console.log({dataFromLocalStorageAsObject});

      setIsWeatherLoading(false);
      return;
    }

    const fetchWeatherForSelectedCity = async () => {
      setIsWeatherLoading(true);
      const {data} = await axios.get(`${WEATHER_API_URL}&q=${selectedCity}&aqi=no`);
      const weatherObj = {
        temperature: {
          celsius: data.current.temp_c,
          fahrenheit: data.current.temp_f,
        },
        precipitation: {
          inches: data.current.precip_in,
          millimeters: data.current.precip_mm,
        },
        wind: {
          miles: data.current.wind_mph,
          kilometers: data.current.wind_kph,
        },
        humidity: data.current.humidity,
        condition: data.current.condition.text,
      };
      setWeather(weatherObj);
      localStorage.setItem(LOCAL_STORAGE_IDENTIFIER, JSON.stringify({
        selectedCity,
        unitSystem,
        weather: weatherObj,
      }));
      setIsWeatherLoading(false);
    };

    fetchWeatherForSelectedCity();
  }, [selectedCity, unitSystem]);

  return <WeatherContext.Provider value={
    {
      selectedCity,
      unitSystem,
      weather,
      setSelectedCity,
      setUnitSystem,
      isWeatherLoading,
      setIsWeatherLoading,
      setWeather
    }}>
    {children}
  </WeatherContext.Provider>;
};


