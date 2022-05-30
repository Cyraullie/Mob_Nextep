/*import Web3 from "web3"

const web3 = new Web3(window.ethereum)*/



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
        let accounts = ethereum.request({ method: 'eth_requestAccounts' });
        return accounts
      }
  }
}



  
const MetamaskKit = new Metamask();
export default MetamaskKit;