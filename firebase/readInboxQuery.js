
import { CHAT_COLLECTION} from '../Utils/appConts';
import firebase from '@react-native-firebase/database';
import storePre from '../redux/store';
import { saveInbox } from '../redux/chatAction';
const DB = firebase()
export const readInboxQuery = async ({   sender}) => {
    
    const {store,}=storePre
    try {
      
        const result= await (await DB.ref(`${CHAT_COLLECTION}/${sender}`).once("value")).toJSON() 
     const inbox=[]
     console.log({result});
      Object.keys(result).map(sender=>{ 
      inbox.push({...result[sender], sender})
     }) 
    //  saveInbox$(inbox.data);
    
     store.dispatch(saveInbox(inbox))
      return {data: inbox};
    } catch (err) {
      return {
        error: {status: 500, data: null, err},
      };
    }
  };