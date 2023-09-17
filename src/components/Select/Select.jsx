import React, { useContext } from "react";
import styles from "./select.module.css";
import { DataContext } from "../../App";

export const Select = () => {
  const data = useContext(DataContext);
  const onChangeSelect = data[3];

  const handleChange = (event) => {
    onChangeSelect(event.target.value);
  };

  return (
    <select className={styles.selector} onChange={handleChange}>
      <option value="popular">Популярные</option>
      <option value="price-high-to-low"> Дороже</option>
      <option value="price-low-to-high">Дешевле </option>
    </select>
  );
};
