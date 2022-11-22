import React,{useEffect} from 'react'
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { getChatId, getEnv } from '../Utils/common';
import { MESSAGES_COLLECTION } from '../Utils/appConts';
 
export default function useChat(sender,receiver, callBack) {
   const chatId = getChatId(sender,receiver)
   useEffect(() => {
    // const unSub = firestore().collection(getEnv()).doc(MESSAGES_COLLECTION).collection(chatId).orderBy("createdAt","desc").limit(1).onSnapshot(callBack)
    
    database().ref(`${MESSAGES_COLLECTION}/${chatId}`).on("value",snapshot=>{
        callBack(snapshot)
    })
    return ()=>{
        console.log("unSUb");
        unSub()
    }  
   }, [ ])
   
   
}