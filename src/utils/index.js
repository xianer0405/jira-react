const isFalsy = (val) => (val === 0 ? true : !val);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = obj[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
