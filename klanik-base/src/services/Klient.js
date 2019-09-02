import axios from "axios";

export default () => {
  // create a new axios instance
  const instance = axios.create({
    baseURL: "https://klanikiat.ddns.net/api", // "https://localhost:44356/api", //
    json: true,
    headers: {
      "X-Clacks-Overhead": "GNU Pratchett"
    }
  });

  // before a request is made start the nprogress
  instance.interceptors.request.use(config => {
    NProgress.start();
    return config;
  });

  // before a response is returned stop nprogress
  instance.interceptors.response.use(response => {
    NProgress.done();
    return response;
  });
  return instance;
 
};
