import axios from "axios";
import { BASE_URL } from "@env"

let connectAPI = axios.create({
    baseURL: {BASE_URL}.BASE_URL,
    timeout: 10000,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    } 
});

let config = {
    headers: {
      "Access-Control-Allow-Origin": "*", 
      Authorization: "Bearer " + localStorage.getItem("user_token"),
    },
  };

class API {

    getToken(payload) {
      console.log(connectAPI.post("mytoken", payload))
      return connectAPI.post("mytoken", payload)
    }

    getProfile(){
      return connectAPI.get("profile", config)
    }
}







const APIKit = new API();
export default APIKit;