import Axios from "axios";
import getConfig from "next/config";

const timeout = 60000;

const { publicRuntimeConfig } = getConfig();

const xRequest = Axios.create({
  baseURL:
    publicRuntimeConfig.RESOURCE_BASE_URL,
  timeout,
});

const onRequestInterceptor = async (config) => {
  const headers = {
    "Content-Type": "application/json",
  };
  config.headers = headers;
  return config;
};

const onResponseInterceptor = async (response) => {
  return response;
};

const onErrorInterceptor = async (error) => {
    console.error("axios error", error);
  return error;
};

xRequest.interceptors.request.use(onRequestInterceptor);

xRequest.interceptors.response.use(
  onResponseInterceptor,
  onErrorInterceptor
);

export {
    xRequest
}

