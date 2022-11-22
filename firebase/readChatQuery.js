
import { getChatId } from '../Utils/common';
import { MESSAGES_COLLECTION, LIMIT, STATE_ACTIVE, PAGE_SIZE } from '../Utils/appConts';
import firebase from '@react-native-firebase/database';
import storePre from '../redux/store';
import { setChat } from '../redux/chatAction';
const DB = firebase()
export const readChatBaseQuery = async ({ sender, receiver }) => {
    console.log({sender,receiver});
      const chatId = getChatId(sender, receiver);
      console.log({chatId});
      const {store,}=storePre
      const THREAD_PREFIX = `${MESSAGES_COLLECTION}/${chatId}`
      try {
        const chatRef = await DB.ref(`${MESSAGES_COLLECTION}/${chatId}`)./* orderByChild("createdAt"). */orderByChild("status").equalTo(STATE_ACTIVE) .limitToLast(PAGE_SIZE).once('value')
        const messages = [] 
        chatRef.forEach(_item => {
          const message = _item.val()
          console.log({message});
          const _message = { ...message, createdAt: new Date(message.createdAt._seconds * 1000), threadId: `${THREAD_PREFIX}/${_item.key}` }
          messages.push(_message)
        })
        store.dispatch(setChat({userId: receiver, chat: {messages:messages.reverse()}}))
        return {
          data: {
            messages
          }
        };
      } catch (err) {
        console.log(err);
        return {
          error: { status: 500, data: null, err },
        };
      }
    };