import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useContext} from "react";
import {WeatherContext} from "@/store/weather-context";
import {SelectedCity} from "@/types/weather.type";

const cities = [
  {
    id: "chernihiv",
    name: "Chernihiv"
  },
  {
    id: "kiev",
    name: "Kiev"
  },
  {
    id: "lviv",
    name: "Lviv"
  },
  {
    id: "kharkiv",
    name: "Kharkiv"
  },
  {
    id: "odesa",
    name: "Odesa"
  }
];

export function SelectCityForm() {
  const {selectedCity, setSelectedCity} = useContext(WeatherContext);

  const handleChange = (event: any) => {
    setSelectedCity(event.target.value as SelectedCity);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="City"
            onChange={handleChange}
        >
          {
            cities.map(city => {
              return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>;
            })
          }
        </Select>
      </FormControl>
  );
}
