import Web3 from "web3"

const web3 = new Web3(window.ethereum)



class Metamask {

    browserDetection(){
      if (window.ethereum) {
        console.log('MetaMask is installed!');
        return true
      }else{
        console.log('MetaMask isn\'t installed!');
        return false
      }    
    }

    getAccounts(){
        if(this.browserDetection()){
        var accounts = web3.eth.getAccounts();
        console.log(accounts)
        let account = ethereum.selectedAddress
       // console.log(account)
        return ethereum.request({ method: "eth_getBalance", params: [ account, "latest" ]})
        }
    }
  }



  
const MetamaskKit = new Metamask();
export default MetamaskKit;