import axios from "axios";

//runeo.paleo.ch/api/me/token?username=runeo.admin@paleo.ch&password=secret

let connectAPI = axios.create({
    baseURL: "http://runeo.paleo.ch/api/me/",
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