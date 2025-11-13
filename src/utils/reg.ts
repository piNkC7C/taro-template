// 只有字母与数字
export const isLetterAndNumber = (value: string) => {
  const reg = /^[a-zA-Z0-9]+$/;
  return reg.test(value);
};
