import axios from "axios";
import { BSC_API_TOKEN, BSC_URL } from "@env"

let connectBscApi = axios.create({
  baseURL: BSC_URL,
  timeout: 2000,
})

class API {

    getTokenQuantity(contract_address, wallet_address){
      return connectBscApi.get("api?module=account&action=tokenbalance&contractaddress="+contract_address+"&address="+wallet_address+"&apikey="+BSC_API_TOKEN)
    }

    getContractName(contractaddress){
      return connectBscApi.get("api?module=contract&action=getsourcecode&address="+ contractaddress +"&apikey="+BSC_API_TOKEN)
    }

    getNextepPrice(){

      /*let ws = new WebSocket("wss://stream.binance.com:9443/ws/nextep@trade")

      ws.onmessage = (event) => {
        console.log(event.data)
      }*/

/*

      var options = {muteHttpExceptions: true};
      resBTCPrice = JSON.parse(fetch('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT',options).getContentText()); 
      return resBTCPrice.price;
*/
      return axios.get('https://api.coinmarketcap.com/v1/ticker/nextep/')
    }
}



const APIKit = new API();

export default  APIKit;