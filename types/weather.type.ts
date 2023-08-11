export type SelectedCity = "kiev" | "chernihiv" | "lviv" | "kharkiv" | "odesa";

export type UnitSystem = "imperial" | "metric";

export type Weather = {
  condition: string | null;
  precipitation: {
    millimeters: number | null;
    inches: number | null;
  };
  humidity: number | null;
  wind: {
    miles: number | null;
    kilometers: number | null;
  };
  temperature: {
    celsius: number | null;
    fahrenheit: number | null;
  };
};
