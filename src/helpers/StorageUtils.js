export const setUserData = (data) => {
  localStorage.setItem("MessageAppUserData", JSON.stringify(data));
};
export const setUserToken = (token) => {
  localStorage.setItem("UserToken", `${token}`);
};

export const getUserToken = () => {
  return localStorage.getItem("UserToken");
};
export const getUserData = () => {
  return JSON.parse(localStorage.getItem("MessageAppUserData"));
};

export const unsetUserData = () => {
  localStorage.removeItem("MessageAppUserData");
};
export const unsetUserToken = () => {
  localStorage.removeItem("UserToken");
};
