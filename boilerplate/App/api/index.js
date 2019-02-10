export const request = ({ url, options, body, token }, ...rest) => {
  return new Promise((resolve, reject) => {
    if (!options) options = {};
    if (!options.headers) options.headers = defaultHeaders;
    if (body) options.body = JSON.stringify(body);
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: "Bearer " + token
      };
    }

    fetch(url, options)
      .then(response => {
        try {
          return response.json().then(json => {
            return response.ok ? resolve(json, rest) : reject(json, rest);
          });
        } catch (e) {
          resolve({ error: "Server error" });
        }
      })
      .catch(reject);
  });
};

export const post = ({ url, body, token }) =>
  request({
    url: `${process.env.REACT_APP_API_URL}${url}`,
    options: { method: "POST" },
    token,
    body
  });

export const uploadFiles = ({ url, body, token }) =>
  new Promise((resolve, reject) =>
    fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body
    })
      .then(response => {
        try {
          return response.json().then(json => {
            return response.ok ? resolve(json) : reject(json);
          });
        } catch (e) {
          resolve({ error: "Server error" });
        }
      })
      .catch(reject)
  );

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export default request;
