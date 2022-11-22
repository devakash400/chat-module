import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {CHAT_COLLECTION} from '../Utils/appConts';
import {getEnv} from '../Utils/common';
import database from '@react-native-firebase/database';
export default function useInbox(userId, callBack) {
  useEffect(() => {
    const unSub =
      database().ref(`${CHAT_COLLECTION}/${userId}`).on("value",snapshot=>{
        callBack(snapshot)
    })
    return () => {
      console.log('unSUb');
      unSub();
    };
  }, []);

  return;
}
