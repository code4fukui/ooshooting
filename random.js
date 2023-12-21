export const randint = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const choice = (array) => {
  return array[randint(0, array.length - 1)];
};
export const uniform = (a, b) => {
  return Math.random() * (b - a) + a;
};
