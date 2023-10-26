const toThousandSeparator = (value) => {
  if (value == null) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const padLeft = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export { toThousandSeparator, padLeft };
