export const BASE_URL =
  window.location.href.indexOf("127.0.0.1") > -1
    ? "http://127.0.0.1:8000"
    : " https://admin.yavoycuba.com";

export const API_URL = "/api/v1/shops/front/";

export const creceShop_URL = `${BASE_URL}${API_URL}`;

export const shop_Slug = "creceplus-1";

//Include de refer origin in headers
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const headersToken = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "",
};

export const apiCall = async (endpoint, token, data, method) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;
  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      method: method,
      body: data ? JSON.stringify(data) : null,
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};

export const post = async (endpoint, token, data) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;
  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : null,
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};

 

export const postFormData = async (endpoint, token, data) => {
  console.log(token);
  console.log(data.products);
  let headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json",
  };

  let formdata = new FormData();
  formdata.append("type_delivery", data.type_delivery);
  //formdata.append("municipality_id", 59);
  formdata.append("shop_id", data.shop_id);
  formdata.append("user_address_id", data.user_address_id);
  formdata.append("idDiscount", data.idDiscount);
  formdata.append("via", 'creceplus');
  formdata.append("delivery_price", data.delivery_price);

 //data.products containd objetct... Iterate this and send array into products variable in de formData
  data.products.forEach((product) => {
    formdata.append("products[]", JSON.stringify(product));
  });
 
  formdata.append("method_payment", "manual");
  formdata.append("currency_code", "CUP");
  formdata.append("payment_image", data.payment_image);

  let requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
    headers: headers,
  };

  const url = `${BASE_URL}/api/v1/${endpoint}`;

  try {
    const request = await fetch(url, requestOptions);
    if (request) {
      return await request.json();
    }
  }
  catch (error) {
    console.log(error);
  }
};

export const get = async (endpoint, token, data) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;

  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      body: data ? JSON.stringify(data) : null,
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};

export const del = async (endpoint, token, data) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;
  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      method: "DELETE",
      body: data ? JSON.stringify(data) : null,
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};

export const put = async (endpoint, token, data) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;
  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};

export const patch = async (endpoint, token, data) => {
  const url = `${BASE_URL}/api/v1/${endpoint}`;
  if (token) {
    headersToken.Authorization = `Bearer ${token}`;
  }
  try {
    const request = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: token ? headersToken : headers,
    });
    if (request) {
      return await request.json();
    }
  } catch (error) {}
};
