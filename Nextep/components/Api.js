import axios from "axios";
import { BASE_URL } from "@env"

let connectAPI = axios.create({
    baseURL: {BASE_URL}.BASE_URL,
    timeout: 10000,
    credentials: "same-origin"
});

let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  };

class API {

    getToken(payload) {
        return connectAPI.post("mytoken", payload)
      }
}







const APIKit = new API();
export default APIKit;