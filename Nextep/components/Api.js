import axios from "axios";
import { env } from "@env"

let connectAPI = axios.create({
    baseURL: {env}.BASE_URL,
    timeout: 10000,
});

class API {

    getToken(payload) {
        console.log(connectAPI.post("token", payload))
        return connectAPI.post("token", payload)
      }
}







const APIKit = new API();
export default APIKit;