import Axios from "../plugins/axios";

const http = Axios;

export default function useHttp() {
  function setDefaultHeader(key: string, value: string) {
    http.defaults.headers.common[key] = value;
  }

  return {
    http,
    setDefaultHeader,
  };
}
