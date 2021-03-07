import { useEffect, useState } from "react";

const isFalsy = (val: unknown) => (val === 0 ? true : !val);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (obj: { [key: string]: string }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = obj[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// Custom Hook(必须以use开头)和系统的Hook 不能在普通函数中运行
export const useMount = (callback: () => void) => {
  // eslint-disable-next-line
  useEffect(callback, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 300);

    // 在每次上一次的useEffect处理完之后再运行
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
