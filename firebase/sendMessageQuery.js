import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/database';
import { CHAT_COLLECTION, DEFAULT_IMAGE, MESSAGES_COLLECTION } from '../Utils/appConts';
import { createUpdateInbox, getChatId } from '../Utils/common';
const DB = firebase()
export const sendMessageQuery = async ({ message, sender, receiver }) => {

      const messageId = new Date().valueOf()
      const chatId = getChatId(sender.uid, receiver.uid);

      const chatRef = DB.ref(`${MESSAGES_COLLECTION}/${chatId}`).push()
      try {

        chatRef.set({
          ...message,
          status: 'ACTIVE',
          createdAt: firestore.Timestamp.now(),
        })

        const sender_uid = DB.ref(`${CHAT_COLLECTION}/${sender.uid}/${receiver.uid}`) 
        sender_uid.set({
          ...message,
          createdAt: firestore.Timestamp.now(),
          user: {
            ...receiver
          },
          
          read: false
        })

        const receiver_uid = DB.ref(`${CHAT_COLLECTION}/${receiver.uid}/${sender.uid}`) 
        receiver_uid.set({
          ...message, 
          createdAt: firestore.Timestamp.now(),
          user: {
            ...sender
          },
          read: true
        })
        return { data: {done:true} };
      } catch (err) {
        return {
          error: { status: 500, data: null, err },
        };
      }
    };
