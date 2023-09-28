import "./App.css";
import React, { useState, createContext } from "react";
import dataJson from "../data.json";
import { TariffList } from "./components/TariffList/TariffList";
import { TariffCategory } from "./components/TariffCategory/TariffCategory";
import { Select } from "./components/Select/Select";
export const DataContext = createContext();

function App() {
  const [data, setData] = useState(dataJson);
  const [category, setCategory] = useState({
    category: 5194439,
  });
  const [selectedSelector, setSelectedSelector] = useState("popular");
//http://localhost:3001/Mts-tariff/api
//https://pzhukovski.github.io/Mts-tariff/api
  const callBackendAPI = async () => {
    const response = await fetch("/Mts-tariff/api");
    setData(dataJson);
    if (response.status !== 200) {
      throw Error(response.message);
    }
  };
  const onChangeCategory = (id) => () => {
    setCategory({
      category: id,
    });
  };
  const onChangeSelector = (value) => {
    setSelectedSelector(value);
  };

  return (
    <>
      <div>
        <DataContext.Provider
          value={[
            data,
            category,
            onChangeCategory,
            onChangeSelector,
            selectedSelector,
          ]}>
          <h1>Выбери себе подходящий тариф!</h1>
          <TariffCategory />
          <Select />
          <TariffList />
        </DataContext.Provider>
        <button className="button" onClick={callBackendAPI}>
          Обновить
        </button>
      </div>
    </>
  );
}

export default App;
