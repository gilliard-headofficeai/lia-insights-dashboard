import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  isEditMode: boolean;
  setIsEditMode: (v: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  isEditMode: false,
  setIsEditMode: () => {},
});

export const useLayoutMode = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <LayoutContext.Provider value={{ isEditMode, setIsEditMode }}>
      {children}
    </LayoutContext.Provider>
  );
};
