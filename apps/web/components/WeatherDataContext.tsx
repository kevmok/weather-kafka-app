"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useUser } from "@/components/UserContext";

import { WeatherResponse } from "shared-types";
interface mongoStructure {
  id: object;
  weather: WeatherResponse;
}
const WeatherDataContext = createContext<mongoStructure | undefined>(undefined);

export function WeatherDataProvider({ children }) {
  const [weather, setWeather] = useState<mongoStructure>();
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const mongodb = user.mongoClient("mongodb-atlas");
    const collection = mongodb.db("Weather").collection("Austin");

    const watchChanges = async () => {
      for await (const change of collection.watch()) {
        const weather = change["fullDocument"] as mongoStructure;
        console.log("change: ", change);
        console.log("hello", change["fullDocument"]);
        setWeather(weather);
      }
    };
    watchChanges();
  }, [user]);

  return (
    <WeatherDataContext.Provider value={weather}>
      {children}
    </WeatherDataContext.Provider>
  );
}

export const useWeatherData = () => {
  return useContext(WeatherDataContext);
};
