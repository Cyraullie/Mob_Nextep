





class Metamask {

    browserDetection(){
      if (window.ethereum) {
        console.log('MetaMask is installed!');
      }else{
        console.log('MetaMask isn\'t installed!');
      }    
      return "true"
    }
  }



  
const MetamaskKit = new Metamask();
export default MetamaskKit;