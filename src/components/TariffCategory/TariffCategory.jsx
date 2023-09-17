import React, { useContext } from "react";
import { DataContext } from "../../App";
import parse from "html-react-parser";
import styles from "./tariffcategory.module.css";

export const TariffCategory = () => {
  const data = useContext(DataContext);
  const onChangeCategory = data[2];
  const category = data[1].category;

  return (
    <div className={styles.cards_container}>
      {data[0].catalogMenuItems.map((catalog) => {
        return (
          <div
            key={catalog.id}
            className={`${styles.card} ${
              category === catalog.id ? styles.card_active : ""
            }`}
            onClick={onChangeCategory(catalog.id)}>
            <div className={styles.img_block}>
              <img src={catalog.imageUrl} className={styles.img} />
            </div>
            <div>{parse(catalog.title)}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};
