const toThousandSeparator = (value) => {
  if (value == null) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const padLeft = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

const jobFormat = (res) => {
  let data = res.data.result;
  let timestamp = res.data.updateTime;
  let date = new Date(timestamp);
  let time = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${padLeft(date.getHours())}:${padLeft(date.getMinutes())}`;

  // filter duplicate key & replace location string
  const obj = {};
  data.forEach((item) => {
    item.location = item.location.replaceAll('臺', '台')
    obj[`${item.key}`] = item;
  });
  return {result: Object.values(obj), updateTime: time};
}

export { toThousandSeparator, padLeft, jobFormat };
