import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import { useMoralis, useMoralisWeb3Api,account,isAuthenticated,useWeb3ExecuteFunction} from "react-moralis";
import { ConnectButton} from "web3uikit";
import Player from './Player'
import Webcam from'react-webcam'
const Home = () => {
  const Web3Api = useMoralisWeb3Api();
  const contractProcessor = useWeb3ExecuteFunction();
  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };
  const { isAuthenticated, Moralis,account } = useMoralis();

    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address:"0xdF5Ce0Eb85390170C08c277B5c07c7F0ea435898"
      }

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      console.log(mumbaiNFTs.result[0])
      console.log(account)
     
      // setPfps(images);
    }
    async function maticTweet() {

     
      let options = {
        contractAddress: "0xD0d1697ade292F82E992617eFF61944E1F2432B6",
        functionName: "addTweet",
        abi: [{
          "inputs": [
            {
              "internalType": "string",
              "name": "tweetTxt",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tweetImg",
              "type": "string"
            }
          ],
          "name": "addTweet",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        }],
        params: {
          tweetTxt: "1",
          tweetImg: "2",
        },
        msgValue: Moralis.Units.ETH(0.000008),
      }
    
        await contractProcessor.fetch({
          params: options,
          onSuccess: () => {
            console.log("saved on blockchain")
          },
          onError: (error) => {
            console.log(error.data.message)
          }
        });
    
      }
    
  
 const getData= async()=>{
 
    const user = Moralis.Object.extend("_User");
    const query = new Moralis.Query(user);
    const data = await query.first();
    console.log(data.attributes.image)
    await setFileUrl2(data.attributes.image)
   
   
 }

  const [fileUrl2,setFileUrl2]=useState()
  const [file2,setFile2]=useState()
  const [nft,setNFT]=useState()
 
return(
  <>
  
  <div className="container">
    <div class="connectbutton">
  <ConnectButton/>
  </div>
     
     {!isAuthenticated &&  <div class="camera"><Webcam/></div>}
     {isAuthenticated && <Player/>}
     
     <br></br>
     {isAuthenticated &&  <div class="photos">
 

     <button class="button-17" onClick={getData}>Show Photos</button>
     </div>}
    
     <br></br>
     <div >
     {fileUrl2 && isAuthenticated && 
     <div class="gallery">{fileUrl2.map((e)=>{
      return (
        <img class="images" src={e} alt="error loading"></img>
      )
     }
     )}</div>
    }
    </div>
     
    <button onClick={fetchNFTs}>check nft</button>
    <button onClick={maticTweet}>click</button>
 {/* <img src={nft}/> */}
  </div>
  </>
)
}

export default Home;
