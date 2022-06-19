import axios from "axios";
import { BASE_URL, BSC_API_TOKEN } from "@env"
import StorageKit from "./Storage";

var api = require("bscscan-api").init(BSC_API_TOKEN);

const bscUrl = "https://api.bscscan.com/";

let connectBscApi = axios.create({
  baseURL: bscUrl,
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
      "Content-Type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
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


    updatePhoto(formData){
      console.log( formData)

      return connectAPI.post("profile/photo", {photo: formData}, configFromData)

      /*return axios.post("http://192.168.0.48:8000/api/nxp/profile/photo", formData, {
        headers: {
          Authorization: "Bearer UfsH7oivFo7MgrM35bl6ZTevWaJblI32klOcdtjeIBSQg1imnNcQDAr7rWM4" ,
        },
        onUploadProgress: progressEvent => {
          console.log("Upload Progress: " + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
        }  
      })*/
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