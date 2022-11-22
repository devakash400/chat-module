import {View, Text, Pressable,StyleSheet, Image,Animated} from 'react-native';
import React from 'react';
import {getChatId,timeSince} from '../../Utils/common';
// import Label from '../../Components/Label';
// import {useTheme} from '../../Theme/ThemeProvider';
import useStyleSheetFlatten from '../../Hooks/useStyleSheetFlatten';
import {scale} from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';
import { imagePlaceholder } from '../../Utils/mockData';
import Label from '../../Components/Label';
import { capitalizeFirstLetter,getFromNow } from '../../Utils/helpers';
// import routeConst from '../../Navigation/routeConst';
// import LoadingImage from '../../Components/LoadingImage'
export default function InBoxItem({ onRead, navigation, item,style, currentUser}) {
  const {
    _id,
    createdAt,
    text,
    user: {name, avatar,uid,profileImage},
    user,
    read
  } = item;
    
  // console.log("🚀   item", item)
  const {colors} = useTheme();
  // const styles = useStyleSheetFlatten([style(colors)]);
  const onPress = () => {
    const chatId = getChatId("0T3yWmc3ZmdkhcyfE0lVJ4jrVdW2", "Ll6QE70qoWbfjxGcHvHoV4afZUy1");
    navigation.navigate("ChatBox", {chatId, user});
  };
return(<Animated.View style={style}>
  <Pressable style={[styles.container,]} onPress={onPress}>
      <Image source={{uri:avatar||imagePlaceholder}} style={styles.avatar}/>
      <View style={styles.nameView}>
        <Label style={styles.name} fontType="demiBold" text={capitalizeFirstLetter(name)}/>
        <Label numberOfLines={1} text={text} style={styles.message}/>
        </View>
        <Text style={styles.time}>
        {timeSince(createdAt)}
        </Text>
</Pressable>
</Animated.View>)
  return (
    <Pressable onPress={() =>{ 
      onRead&&onRead(_id)
      onPress(item.user)
    }} style={styles.itemContainer}>
      <View style={{flex: 0.2}}>
        {/* <View style={styles.userImage} /> */}
        {/* <LoadingImage style={styles.userImage} uri={ profileImage} /> */}
      </View>

      <View style={styles.nameMessageCon}>
        <View style={{flex: 0.8}}>
          <Text>
            {name}
          </Text>
          <Text
            type="h6"
            style={{textAlign: 'left', marginTop: scale(5), maxHeight:scale(20)}}
          >
            {text}
          </Text>
        </View>

        <View style={styles.timeUnreadCon}>
          <Text
            type="h7"
            style={{color: colors?.text}}
          >{"timeSince"}</Text>
          {read&&<View style={styles.unreadCount}>
            <Text style={{color: colors.white}}>
              1
              </Text>
          </View>}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    paddingVertical:scale(12),
    paddingHorizontal:scale(10),
    borderBottomWidth:0.5,
    alignItems:"center",
  },
avatar:{
  height:scale(55),
  width:scale(55),
  borderRadius:scale(30),
  backgroundColor:"red"
},
nameView:{
  // backgroundColor:"blue",
  marginLeft:10,
  flex:1
},
name:{
  fontSize:18,
  // fontWeight:"bold",
  color:"#000"
},
message:{
  fontSize:15
}





  // itemContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // nameMessageCon: {
  //   flex: 0.78,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderBottomWidth: scale(1),
  //   paddingVertical: scale(20),
  //   borderBottomColor: theme?.border,
  // },
  // unreadCount: {
  //   borderRadius: scale(15),
  //   height: scale(20),
  //   width: scale(20),
  //   backgroundColor: theme?.primary,
  //   alignContent: 'center',
  //   alignItems: 'center',
  // },
  // timeUnreadCon: {
  //   flex: 0.2,
  //   alignContent: 'flex-end',
  //   alignItems: 'flex-end',
  // },
  // userImage: {
  //   overflow:'hidden',
  //   backgroundColor:theme?.primary,
  //   height: scale(60),
  //   width: scale(60),
  //   borderRadius: scale(30),
  // },
})
