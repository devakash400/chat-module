import {View, Text, StyleSheet, FlatList, Pressable,Animated,Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Container from '../../Components/Container';
// import Label from '../../Components/Label';
// import FilterComp from '../Home/FilterComp';
import {scale} from 'react-native-size-matters';
import useStyleSheetFlatten from '../../Hooks/useStyleSheetFlatten';
// import {useTheme} from '../../Theme/ThemeProvider';
// import routeConst from '../../Navigation/routeConst';
// import {useGetInboxMutation} from '../../Redux/Services/inboxService';
// import withRedux from '../../Redux/withRedux';
import useInbox from '../../Hooks/useInbox';

import {getChatId} from '../../Utils/common';
import InBoxItem from './InBoxItem';
import ReduxWrapper from '../../redux/ReduxWrapper';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { imagePlaceholder } from '../../Utils/mockData';
import CustomHeader from '../../Components/CustomHeader';
import DiveItem from '../../Components/DiveItem';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import SearchBarComp from '../../Components/SearchComp';
import { readInboxQuery } from '../../firebase/readInboxQuery';

const { height } = Dimensions.get("screen");

const dummyInbox=[
  {
    _id:2,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 2", avatar:"",uid:"Ll6QE70qoWbfjxGcHvHoV4afZUy1",profileImage:imagePlaceholder},
    read:false
  },
  {
    _id:3,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 3", avatar:"",uid:"j1RO8l6LOTWWvhHfIeRTslWICIc2",profileImage:imagePlaceholder},
    
    read:false
  },
  {
    _id:4,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 4", avatar:"",uid:"mi3coMR3W3Um5CKC0v7bY5wAuos2",profileImage:imagePlaceholder},
    
    read:false
  },
  {
    _id:5,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 5", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:6,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 6", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:7,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 7", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:8,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 8", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:9,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 9", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:10,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 10", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:11,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 11", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:12,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 12", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:13,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 13", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:14,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 14", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
  {
    _id:15,
    createdAt:new Date(),
    timeSince:new Date(),
    text:"asdf",
    user: {name:"chat user 15", avatar:"",uid:"Z3gILytAXXRHAJhqsPmS9Izfsnm2",profileImage:imagePlaceholder},
  
    read:false
  },
]


function InBox({markRead$,saveInbox$, navigation, auth: {userData}, chat}) {
  const {colors,} = useTheme();
  const isFocused=useIsFocused()
  const styles = useStyleSheetFlatten([style(colors)]);
  const [isVisible, setIsVisible] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  // const AnimatedInboxItem=Animated.createAnimatedComponent(InBoxItem)
  // const [GetInbox, inbox] = useGetInboxMutation();
  const{inboxIds,inboxById}=chat
  console.log("🚀 ===>", chat)
  useInbox(userData.uid, (info) => {
    //  console.log('================== ',info );
        
       
      readInboxQuery({sender: userData.uid});
    });
  // useEffect(() => {
  //   if (inbox.isSuccess) {
  //     saveInbox$(inbox.data);
  //   }
  // }, [inbox.isSuccess]);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const renderItem = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      (height * 0.1 + 8) * index,
      (height * 0.1 + 8) * (index + 3),
    ];
    const scale = 1;
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const Offset = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 500],
    });
    
    return (
        <InBoxItem
      style={{
        transform: [{ scale: scale }, { translateX: Offset }],
        opacity: opacity,
      }}
        // onRead={(_id)=>{markRead$({target:_id,flag:false} ) }}
        navigation={navigation}
        userData={userData}
        // item={item}
        item={inboxById?.[item]}
        key={`inbox_node_${index}`}
      />
    );
  };

  return (
    <View>
      <CustomHeader showBack={true} onBackPress={()=>navigation.goBack()}  showTitle title={"Inbox"}/>
      <SearchBarComp/>
      <AnimatedFlatList
      // onScroll={Animated.event(
      //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      //   { useNativeDriver: true }
      // )}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        // data={dummyInbox}
        animationType={AnimationType.SlideFromRight}
      animationDuration={1000}
      focused={isFocused}
        data={inboxIds }
        //extraData={inboxIds}
        keyExtractor={(item,index)=> `${item}_${index}`}
      />
      {/* <FilterComp isVisible={isVisible} toggleModal={toggleModal} /> */}
    </View>
  );
}
export default ReduxWrapper(React.memo(InBox));

const style = StyleSheet.create(theme => ({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameMessageCon: {
    flex: 0.78,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: scale(1),
    paddingVertical: scale(20),
    borderBottomColor: theme?.border,
  },
  unreadCount: {
    borderRadius: scale(15),
    height: scale(20),
    width: scale(20),
    backgroundColor: theme?.primary,
    alignContent: 'center',
    alignItems: 'center',
  },
  timeUnreadCon: {
    flex: 0.2,
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  userImage: {
    backgroundColor: 'green',
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
  },
}));
