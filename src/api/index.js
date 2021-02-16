import axios from "axios";

function setToken(config) {
  if (config.url !== "/login") {
    config.headers.Authorization = `Bearer ${global.token}`;
  }
  return config;
}

function init() {
  axios.defaults.baseURL = process.env.SERVER_URL;
  axios.interceptors.request.use(setToken);
}

export function login() {
  init();
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  };
  axios
    .post("/login", body)
    .then(({ data }) => {
      global.token = data.token;
    })
    .catch((err) => console.log("error login: ", err.message));
}

export function getClients() {
  init();
  return axios.get("/clients");
}

export function getPolicies() {
  init();
  return axios.get("/policies");
}
