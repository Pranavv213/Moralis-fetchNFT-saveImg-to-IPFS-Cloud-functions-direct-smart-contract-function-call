import React,{useState,useEffect,useRef} from 'react';
import { Link } from "react-router-dom";
import "./Player.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import Webcam from 'react-webcam';
import { ConnectButton, Icon } from "web3uikit";
const Player = () => {
  const { isAuthenticated, Moralis } = useMoralis();
 
  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    myDetails.set("qwerty", "IamSuperHero");
    if (file) {
      const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    const arr=myDetails.attributes.image;
    console.log(arr);
  
      
    if(!arr) {
      myDetails.set("image",[`${file}`]);
    }
    else
    {
      myDetails.set("image",[...arr,`${file}`]);
    }
    
    }
    await myDetails.save();
    alert(' Photo saved to Database')
    
  }
  const webref=useRef(null)
  const [image,setImage]=useState()
  const [fileUrl,setFileUrl]=useState()
  const [file,setFile]=useState()

return(
  <>
  <div className="container">
    <div class="camera">
   {file &&  <img src={file} alt="no image"/>}
   {!file &&  <Webcam ref={webref}/>}
   </div>
  
  <br></br>
  <div class="menu">
    <button class="button-17">
  <img class="cameradiv" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEqnqIi9V1vl2kI9salcMEHMx7nx08Ihtmcw&usqp=CAU" onClick={()=>{
    if(!file)
    {
      console.log(webref.current.getScreenshot());
      setImage(webref.current.getScreenshot())
      setFile(webref.current.getScreenshot())
      setFileUrl(webref.current.getScreenshot())
    }
    else
    {
      setFile()
    }
    
  }}></img>
  </button>
   <button class="button-17" onClick={saveEdits}>save</button>
   </div>
     <br></br>
  </div>
  </>
)
}

export default Player;
