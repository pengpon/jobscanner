const toThousandSeparator = (value) => {
  if (value == null) return '0'
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export {
  toThousandSeparator
}
