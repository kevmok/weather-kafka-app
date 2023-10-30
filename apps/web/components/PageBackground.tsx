import React from "react";
import { useWeatherData } from "@/components/WeatherDataContext";

export function PageBackground({ children }) {
  const weatherData = useWeatherData();
  const temperature = weatherData?.weather?.current?.temp_f;

  let backgroundColor = "white";
  if (temperature < 32) {
    backgroundColor = "blue";
  } else if (temperature < 70) {
    backgroundColor = "green";
  } else {
    backgroundColor = "red";
  }

  return <div style={{ backgroundColor }}>{children}</div>;
}
