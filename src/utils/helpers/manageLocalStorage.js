export const setData = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};
export const removeData = (name) => {
  localStorage.removeItem(name);
};
export const getData = (name) => {
  const value = localStorage.getItem(name);
  if (!value) return null;
  return JSON.parse(value);
};
