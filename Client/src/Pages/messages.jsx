import React from 'react'
import { PrettyChatWindow } from "react-chat-engine-pretty";
import MenuAppBar from '../Components/Header';

const ChatsPage = (props) => {
  return (
    <div >
      <MenuAppBar/>
    <div className="background" style={{marginTop:'100px'}}>
   
      <style>
  {`
    body {
        margin:40px;
      background-color: #fff;
    }`}
    </style>
    <PrettyChatWindow
      projectId={'a4e0eaf6-7540-4bfb-958a-da86fa8b1cb8'}
      publicKey={'a4e0eaf6-7540-4bfb-958a-da86fa8b1cb8'}
      secret='Salma'
      username='Salma'
    />
    <div style={{height:'100px',marginBottom:'200px'}}>
  </div>
  </div>
  
    </div>
  )
}

export default ChatsPage