import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../App";
import { TariffItem } from "../TarrifItem/TariffItem";
import styles from "./tarifflist.module.css";

export const TariffList = () => {
  const data = useContext(DataContext);
  const category = data[1].category;
  const [tariffView, setTariffView] = useState([]);
  const [count, setCount] = useState(4);

  useEffect(() => {
    const list = data[0].actualTariffs.filter(
      (item) => item.categoriesIds[0] === category
    );
    setTariffView(list.slice(0, count));
  }, [category, count]);

  const onChangeCount = () => {
    setCount((prevState) => prevState + 4);
  };
  const isButtonHidden =
    tariffView.length >=
    data[0].actualTariffs.filter((item) => item.categoriesIds[0] === category)
      .length;

  return (
    <>
      <div className={styles.cards_container}>
        {tariffView.map((catalog) => {
          return <TariffItem key={catalog.id} catalog={catalog} />;
        })}
      </div>
      {!isButtonHidden && (
        <button className={styles.button} onClick={onChangeCount}>
          Загрузить еще
        </button>
      )}
    </>
  );
};
