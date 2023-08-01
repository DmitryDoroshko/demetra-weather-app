export type SelectedCity = "kiev" | "chernihiv" | "lviv" | "kharkiv" | "odesa";

export type UnitSystem = "imperial" | "metric";

export type Weather = {
  condition: string;
  precipitation: {
    millimeters: number;
    inches: number;
  };
  humidity: number;
  wind: {
    miles: number;
    kilometers: number;
  };
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
};
