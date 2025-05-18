import React from "react";
import { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [formConfig, setFormConfig] = useState({
    Profile: [
      {
        label: "Name",
        name: "name",
        value: "",
        type: "text",
        validation: (value) => value !== "",
        errorMessage: "Name should not be empty",
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        value: "",
      },
      {
        label: "Age",
        name: "age",
        type: "number",
        value: "",
        validation: (value) => value > 20,
        errorMessage: "Age should be greater than 20",
      },
    ],
    Interests: [
      {
        label: "Interests",
        name: "interests",
        type: "checkbox",
        options: ["Cycling", "Coding", "Music"],
        value: [],
        validation: (value) => value.length >= 1,
        errorMessage: "Choose atleast one interest",
      },
    ],
    Settings: [
      {
        label: "Theme",
        name: "theme",
        type: "radio",
        options: ["Dark", "Light"],
        value: "",
      },
    ],
  });
  const [currentPage, setCurrentPage] = useState("Profile");

  return (
    <GlobalContext.Provider
      value={{ formConfig, setFormConfig, currentPage, setCurrentPage }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);
  return globalContext;
};
