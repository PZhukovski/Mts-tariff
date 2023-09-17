import "./App.css";
import React, { useState, createContext } from "react";
import dataJson from "../data.json";
import { TariffList } from "./components/TariffList/TariffList";
import { TariffCategory } from "./components/TariffCategory/TariffCategory";

export const DataContext = createContext();

function App() {
  const [data, setData] = useState(dataJson);
  const [category, setCategory] = useState({
    category: 5194439,
  });

  const callBackendAPI = async () => {
    const response = await fetch("/api/data");
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
  return (
    <>
      <div>
        <DataContext.Provider value={[data, category, onChangeCategory]}>
          <h2>Выбери себе подходящий тариф!</h2>
          <TariffCategory />
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
