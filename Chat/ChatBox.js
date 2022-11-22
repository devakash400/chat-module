import {View, Text, StyleSheet,Image,Pressable} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {scale} from 'react-native-size-matters';
// import {useTheme} from '../../Theme/ThemeProvider';
import useStyleSheetFlatten from '../../Hooks/useStyleSheetFlatten';
// import {IcoMore} from '../../Utils/icons';
// import write from '../../Services/write';
// import {CHAT_COLLECTION, MESSAGES_IMAGES} from '../../Utils/appConts';
// import {useSendMessageMutation} from '../../Redux/Services/chatService';
// import {useGetMessageMutation} from '../../Redux/Services/readChatService';
import {formatOneMessage, randomString} from '../../Utils/common';
import useChat from '../../Hooks/useChat';
// import sendPush from '../../Services/sendPush';
import Actions from './Actions';
import MessageImage from './MessageImage'
// import uploadFile from '../../Utils/uploadFile';
import ReduxWrapper from '../../redux/ReduxWrapper';
import { useTheme } from '@react-navigation/native';
import BackIcon from '../../assets/Icons/SVG/BackIcon'
import { appColors } from '../../Utils/appColors';
import { imagePlaceholder } from '../../Utils/mockData';
import Entypo from 'react-native-vector-icons/Entypo'
import { formatUserForChat } from '../../Utils/helpers';
import { sendMessageQuery } from '../../firebase/sendMessageQuery';
import { readChatBaseQuery } from '../../firebase/readChatQuery';
function ChatBox({
  sendMessageLocal$,
  updateInbox$,
  setChat$,
  markRead$,
  route,
  auth: {userData},
  navigation,
  chat: {chats},
}) {
  
  const {chatId, user} = route.params;
  // const [SendMessage, result] = useSendMessageMutation();
  // const [GetMessage, messages_] = useGetMessageMutation();
  
  const {firstName, lastName,name, dob, uid, position, location, about, fcm} = user;

  const { colors} = useTheme();
  // const styles = useStyleSheetFlatten([style(colors)]);
  const [messages, setMessages] = useState([]);
  useChat(userData.uid, uid, snapshot => {
    readChatBaseQuery({sender: userData.uid, receiver: uid});
  });

  // useEffect(() => {
  //   if (messages_?.data) {
  //     setMessages([...messages_?.data]);
  //     setChat$({userId: uid, chat: messages_?.data});
  //   }
  // }, [messages_.isSuccess]);
 
  const sendMessageWithFcmNLocal = (message, toLocal)=>{ 
    if(!toLocal){
      sendMessageLocal$({target: uid, message});
      // updateInbox$({receiverId:inboxId, message})
    } 
    sendMessageQuery({
      message,
      sender: formatUserForChat(userData),
      receiver: user, 
    });

  } 
  const pushToDb = message => {  
    sendMessageWithFcmNLocal(message,false)
    // if (fcm) {
    //   sendPush(fcm);
    // }
  };
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const onUpload =async img => {  
    // const _msg = {
    //   _id: 1, 
    //   createdAt: new Date(),
    //   image: img.path,
    //   user: {
    //     name: `${firstName} ${lastName}`,
    //     avatar: 'https://placeimg.com/140/140/any',
    //     _id: userData.uid,
    //     ...userData,
    //   },
    // };
    // const filename =randomString(20) 
    // sendMessageLocal$({target: uid, message: _msg}); 
    // const {path } =img
    // const link = await uploadFile(MESSAGES_IMAGES,filename,path)  
    // sendMessageWithFcmNLocal({..._msg,image:link},true)
    
  };
  const renderActions = props => {
    return <Actions {...props} onUpload={onUpload} />;
  };

  const renderMessageImage =(props)=>{
    return <MessageImage  {...props}/>
  }
  
  const ChatHeader = () => {
    return (
      <View style={styles.chatHeader}>
                  <Pressable style={styles.pressedIcon} onPress={()=>navigation.goBack()}>
                  <BackIcon fill={colors.text} height={scale(40)} width={scale(40)} />
                  </Pressable>
                  <Pressable onPress={()=>navigation.navigate("PublicProfile",{username:name})} style={styles.headerTitle}>
                      <Image source={{uri:user?.avatar||imagePlaceholder}} style={styles.headerCon}/>
                      <View style={styles.nameView}>
                        <Text style={{fontWeight:"700",fontSize:15,color:colors.text}}>
                          {name}
                        </Text>
                        <Text style={{color:colors.online,fontWeight:"500"}}>
                          Online
                        </Text>
                      </View>
                  </Pressable>
                 {/* <Pressable style={[styles.pressedIcon,{alignItems:"flex-end",justifyContent:"center"}]}>
               <Entypo name='dots-three-vertical' size={25} color={colors.text}/>
                 </Pressable> */}
      </View>
    );
  };
  return (
    <View style={{flex:1,}}>
      {ChatHeader()}
      <GiftedChat
        // renderActions={renderActions}
        messages={chats && chats?.[uid]}
        // messages={messages}
        onSend={messages => {
          onSend(messages);
          pushToDb(messages[0]);
        }} 
        renderMessageImage={renderMessageImage}
        user={formatUserForChat(userData)}
      />
    </View>
  );
}
export default ReduxWrapper(ChatBox);
const styles = StyleSheet.create({
 
  chatHeader: {
    height: scale(55),
     flexDirection: 'row', 
     alignItems: 'center',
     paddingHorizontal:10,
    // backgroundColor:appColors().colors.primary
  },
  headerCon: {
   
    height: scale(35),
    width: scale(35),
    borderRadius: scale(35/2),
  },
  headerTitle:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    // justifyContent:"center",
    marginLeft:20,
  },
  nameView:{
    marginLeft:10
  },
  pressedIcon:{
    height:40,
    width:40
  }
})
