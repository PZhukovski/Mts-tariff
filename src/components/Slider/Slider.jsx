import React, { useState } from "react";
import Slider from "react-slider";
import styles from "./slider.module.css";

export const SliderOption = ({ props, step }) => {
  const [currentStep, setCurrentStep] = step;
  const { regulators } = props || [];
  const { options } = regulators[0];
  const stepLabels = options.map((option) => option.label);
  const numSteps = stepLabels.length;

  const handleChange = (newStep) => {
    setCurrentStep(newStep);
  };

  return (
    <div className={styles.container}>
      <div className={styles.value}>{stepLabels[currentStep]}</div>
      <Slider
        value={currentStep}
        trackClassName={styles.slider}
        thumbClassName={styles.thumb}
        onAfterChange={handleChange}
        min={0}
        max={numSteps - 1}
        step={1}
      />
    </div>
  );
};
