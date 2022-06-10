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
        //ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x56"}]})
        let accounts = ethereum.request({ method: 'eth_getBalance', params: ["0x2B243FFba97437430DCDe478a8f6133F124571fA", "latest"] });
        /*let accounts = ethereum.request({ method: "wallet_watchAsset", params: {
          type: 'ERC20',
            options: {
              address: '0xf10770649b0b8f62bb5e87ad0da7729888a7f5c3',
              symbol: 'Nextep',
              decimals: 18,
              image: 'https://bscscan.com/images/main/empty-token.png',
            },
        }})*/
        return accounts
      }
  }
}



  
const MetamaskKit = new Metamask();
export default MetamaskKit;