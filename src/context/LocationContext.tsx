import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  location: string | null;
  setLocation: (l: string | null) => void;
};

const LocationContext = createContext<Ctx | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string | null>(null);
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationFilter = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocationFilter must be used within LocationProvider");
  return ctx;
};
