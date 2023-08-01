import {useContext} from "react";
import {WeatherContext} from "@/store/weather-context";
import {FormControlLabel, FormGroup, Switch} from "@mui/material";

export const SwitchUnitSystem = () => {
  const {unitSystem, setUnitSystem} = useContext(WeatherContext);

  const handleChange = ({target: {checked}}) => {
    if (checked) {
      setUnitSystem("metric");
    } else {
      setUnitSystem("imperial");
    }
  };

  return (
      <FormGroup>
        <FormControlLabel
            control={<Switch
                checked={unitSystem === "metric"}
                onChange={handleChange}
                defaultChecked/>}
            label={unitSystem}/>
      </FormGroup>
  );
};
