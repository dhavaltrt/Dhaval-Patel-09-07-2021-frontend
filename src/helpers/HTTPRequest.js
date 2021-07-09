import { getUserToken } from "./StorageUtils";

export const get = (url, params, unauthenticated) => {
  return httpRequest("get", url, params, unauthenticated);
};

export const post = (url, params, unauthenticated) => {
  return httpRequest("post", url, params, unauthenticated);
};

export const deleteMethod = (url, params, unauthenticated) => {
  return httpRequest("delete", url, params, unauthenticated);
};

const httpRequest = async (method, url, params, unauthenticated) => {
  let token;
  if (!unauthenticated) {
    token = getUserToken();
  }

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
    method,
    ...(params &&
      method.toLowerCase() !== "get" && { body: JSON.stringify(params) }),
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        return new Promise((resolve) =>
          response.text().then((resText) => {
            resolve({
              status: response.status,
              ok: response.ok,
              json: resText === "" || !response.ok ? {} : JSON.parse(resText),
              message: JSON.parse(resText).message,
            });
          })
        );
      })
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        } else if (response.status === 401) {
          return reject(response);
        } else {
          return reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
