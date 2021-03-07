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

// 添加泛型， 让调用方识别返回值的类型
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

export const useArray = <T>(initArr: T[]) => {
  const [value, setValue] = useState(initArr);

  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    if (index >= 0) {
      value.splice(index, 1);
      setValue([...value]);
    }
  };

  const add = (item: T) => {
    // value.push(item);
    // setValue(value);
    // NOTE setValue必须返回一个新的对象， 否则页面不会重新渲染
    // NOTE 因为react是使用===来比对prev和next的值的
    setValue([...value, item]);
  };

  return {
    value,
    add,
    removeIndex,
    clear,
  };
};
