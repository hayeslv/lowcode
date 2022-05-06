
interface Defer {
  (): {
    resolve: () => void;
    reject: () => void;
    promise: Promise<void>;
  };

  <T>(): {
    resolve: (val: T) => void;
    reject: () => void;
    promise: Promise<T>;
  };
}

export const defer: Defer = () => {
  //* 生成一个对象，这个对象有三个属性函数（resolve、reject、promise） */
  const dfd = {} as any;
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve as any;
    dfd.reject = reject;
  });
  return dfd;
};
