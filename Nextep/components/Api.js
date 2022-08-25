import axios from "axios";
import { BSC_API_TOKEN, BSC_URL } from "@env"
const cheerio = require("cheerio");

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

    async getNextepPrice(contractaddress){
      let site = await axios({
        method: "GET",
        url: "https://coinmarketcap.com/currencies/nextep/"
      })
      let price = 0;

      const $ = cheerio.load(site.data)
      const elemSelector = ".priceValue"
      $(elemSelector).each((parentIdx, parentElem) => {
        $(parentElem).children().each((childIdx, childElem) => {
          price = $(childElem).text()
        })
      })
      

      return price
    }
}



const APIKit = new API();

export default  APIKit;