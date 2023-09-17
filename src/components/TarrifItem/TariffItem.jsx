import React, { useState, useEffect } from "react";
import { SliderOption } from "../Slider/Slider";
import styles from "./tariffitem.module.css";
import parse from "html-react-parser";

export const TariffItem = ({ catalog }) => {
  const initialValue = 0;
  const [currentStep, setCurrentStep] = useState(initialValue);
  const [costId, setCostId] = useState("");
  const [currentOption, setCurrentOption] = useState(
    catalog?.configurableTariffSettings?.regulators[0]?.options[0]
  );

  useEffect(() => {
    setCurrentOption(
      catalog?.configurableTariffSettings?.regulators[0]?.options[currentStep]
    );
  }, [currentStep]);

  useEffect(() => {
    setCostId(() => {
      const currentOptionId = currentOption?.optionId;
      if (!currentOptionId) {
        return "";
      }
      const filteredCosts =
        catalog?.configurableTariffSettings?.packages.filter((cost) => {
          return cost.regulatorsOptionsIds[0] === currentOptionId;
        });
      return filteredCosts;
    });
  }, [currentOption]);

  return (
    <div className={styles.card}>
      <div className={styles.title}>{parse(catalog.title)}</div>
      <div className={styles.description}>
        {parse(catalog.description || "")}
      </div>
      {catalog.productCharacteristics.map((item, index) => {
        return (
          <div key={index} className={styles.productCharacteristic}>
            {item.value}
          </div>
        );
      })}
      {catalog.configurableTariffSettings && (
        <SliderOption
          props={catalog.configurableTariffSettings}
          step={[currentStep, setCurrentStep]}
        />
      )}
      <div className={styles.benefitsDescription}>
        {parse(catalog.benefitsDescription?.description || "")}
      </div>
      {catalog.subscriptionFee && (
        <div className={styles.subscriptionFee}>
          {parse(
            `${catalog.subscriptionFee?.numValue} ${catalog.subscriptionFee?.displayUnit}` ||
              ""
          )}
        </div>
      )}
      {catalog.configurableTariffSettings && (
        <div className={styles.subscriptionFee}>
          {`${costId[0]?.subscriptionFee?.numValue} ${costId[0]?.subscriptionFee?.displayUnit}`}
        </div>
      )}
    </div>
  );
};
