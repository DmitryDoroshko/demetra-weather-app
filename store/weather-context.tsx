import React, {createContext, useEffect, useState} from "react";
import {SelectedCity, UnitSystem, Weather} from "@/types/weather.type";
import axios from "axios";
import {LOCAL_STORAGE_IDENTIFIER, WEATHER_API_URL} from "@/utils/constants";

type WeatherContext = {
  currentDate: Date | null;
  selectedCity: SelectedCity;
  weather: Weather | null;
  unitSystem: UnitSystem;
  setSelectedCity: (selectedCity: SelectedCity) => void;
  setUnitSystem: (unitSystem: UnitSystem) => void;
  isWeatherLoading: boolean;
  setIsWeatherLoading: (isLoading: boolean) => void;
  setWeather: (weather: Weather) => void;
};

export const WeatherContext = createContext<WeatherContext>({
  currentDate: null,
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
    condition: ""
  },
  setSelectedCity: () => {
  },
  setUnitSystem: () => {
  },
  isWeatherLoading: false,
  setIsWeatherLoading: () => {
  },
  setWeather: () => {
  },
});

let isInitialAppLoad = true;

export const WeatherProvider = ({children}: { children: React.ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<SelectedCity>("chernihiv");
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (isInitialAppLoad) {
      isInitialAppLoad = false;
      const dataFromLocalStorageExisting = localStorage.getItem(LOCAL_STORAGE_IDENTIFIER);
      if (!dataFromLocalStorageExisting) {
        return;
      }

      setIsWeatherLoading(true);
      const dataFromLocalStorageAsObject = JSON.parse(dataFromLocalStorageExisting);
      const currentDateFromLocalStorageAsDate = new Date(dataFromLocalStorageAsObject.currentDate);

      if (currentDate instanceof Date && !(currentDate.getDay() === currentDateFromLocalStorageAsDate.getDay() ||
          currentDate.getMonth() === currentDateFromLocalStorageAsDate.getMonth() ||
          currentDate.getFullYear() === currentDateFromLocalStorageAsDate.getFullYear()
      )) {
        return;
      }

      setSelectedCity(dataFromLocalStorageAsObject.selectedCity);
      setUnitSystem(dataFromLocalStorageAsObject.unitSystem);
      setWeather(dataFromLocalStorageAsObject.weather);
      setCurrentDate(currentDateFromLocalStorageAsDate);
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
        currentDate: new Date(),
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
      setWeather,
      currentDate
    }}>
    {children}
  </WeatherContext.Provider>;
};


