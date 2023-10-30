"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "weather-app-tqkxi" });

const UserContext = createContext<Realm.User | undefined>(undefined);

export function UserProvider({ children }) {
  const [user, setUser] = useState<Realm.User | undefined>();

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
    };
    login();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  return useContext(UserContext);
};
