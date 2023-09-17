export const sortTariffs = (list, selectedSelector) => {
  const sortedList = [...list];

  sortedList.sort((a, b) => {
    let valueA, valueB;

    switch (selectedSelector) {
      case "popular":
        break;
      case "price-high-to-low":
        valueA =
          a.configurableTariffSettings?.packages[0]?.subscriptionFee
            ?.numValue || a.subscriptionFee?.numValue;
        valueB =
          b.configurableTariffSettings?.packages[0]?.subscriptionFee
            ?.numValue || b.subscriptionFee?.numValue;
        break;
      case "price-low-to-high":
        valueA =
          a.configurableTariffSettings?.packages[0]?.subscriptionFee
            ?.numValue || a.subscriptionFee?.numValue;
        valueB =
          b.configurableTariffSettings?.packages[0]?.subscriptionFee
            ?.numValue || b.subscriptionFee?.numValue;
        break;
      default:
        valueA = 0;
        valueB = 0;
    }

    if (selectedSelector === "price-low-to-high") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  return sortedList;
};
