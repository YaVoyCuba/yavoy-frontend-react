import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

import { NETWORK_LATENCY } from "../utils/constants";
import { getUser } from "./userAPI";

export function signin({ username, password }, apiContext = {}) {
 
 

  return new Promise((resolve, reject) => {
 

    setTimeout(async () => {
      try {

       // Login in "http://yavoy.test/api/v1/user/login",

        const response = await axios.post(
          "http://yavoy.test/api/v1/user/login",
          {
            email: username,
            password: password,
          }
        );
        const { data } = response;
        const { access_token } = data;
        const user = await getUser(username, { access_token });
        return resolve({ access_token, user });
      } catch (e) {
        return reject(e);
      }

      
      
    }, NETWORK_LATENCY);
  });
}

export function signout(apiContext = {}) {
  return new Promise((resolve) => {
    setTimeout(resolve, NETWORK_LATENCY);
  });
}
