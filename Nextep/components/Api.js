import axios from "axios";
import { BASE_URL, BSC_API_TOKEN, BSC_URL } from "@env"
import StorageKit from "./Storage";

let connectBscApi = axios.create({
  baseURL: BSC_URL,
  timeout: 2000,
})

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

var configFromData = {}
StorageKit.get("user_token").then((res) => { 
  configFromData = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + res,
    },   
  }; 
});



class API {

    getToken(payload) {
      return connectAPI.post("mytoken", payload)
    }

    getProfile(){
      return connectAPI.get("profile", config)
    }

    updateProfile(payload){
      return connectAPI.post("profile", payload, config)
    }

    updatePhoto(file){
      return connectAPI.post("profile/photo", file, configFromData);
    }
    




    getTokenQuantity(contract_address, wallet_address){
      return connectBscApi.get("api?module=account&action=tokenbalance&contractaddress="+contract_address+"&address="+wallet_address+"&apikey="+BSC_API_TOKEN)
    }

    getContractName(contractaddress){
      return connectBscApi.get("api?module=contract&action=getsourcecode&address="+ contractaddress +"&apikey="+BSC_API_TOKEN)
    }
}



const APIKit = new API();

export default  APIKit;