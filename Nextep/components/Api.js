import axios from "axios";
import { BASE_URL, BSC_API_TOKEN } from "@env"

import StorageKit from "./Storage";
var api = require("bscscan-api").init(BSC_API_TOKEN);

let connectAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    } 
});
var config = {}
StorageKit.get("user_token").then((res) => { 
  config = {
    headers: {
      "Access-Control-Allow-Origin": "*", 
      Authorization: "Bearer " + res,
    },   
  }; 
});



class API {

    getToken(payload) {
      return connectAPI.post("mytoken", payload)
    }

    getProfile(){
      console.log(api.account.balance("0x2B243FFba97437430DCDe478a8f6133F124571fA"))
      return connectAPI.get("profile", config)
    }

    updateProfile(payload){
      return connectAPI.post("profile", payload, config)
    }

}



const APIKit = new API();

export default  APIKit;