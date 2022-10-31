// const CURRENT_USER = Symbol('CURRENT_USER');

import axios from "axios";

export function getCurrentUser(apiContext = {}) {
  const username = (apiContext.access_token || "").split(":")[0];

  return getUser(username, apiContext);
}

export function getUser(username, apiContext = {}) {
  const { access_token } = apiContext;

  //Get user un  "http://yavoy.test/api/v1/user/me",

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (access_token) {
        console.log(access_token);

       return axios.get("http://yavoy.test/api/v1/user/me", {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            const { data } = response;
            const { user } = data;
            return resolve(user);
          })
          .catch((error) => {
            return reject(error);
          });

        
      }

      return reject(
        new Error("Unauthorized User API call: missing auth access_token.")
      );
    }, 0);
  });
}
