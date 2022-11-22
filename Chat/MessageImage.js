import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
// import LoadingImage from '../../Components/LoadingImage'
// import Modal from '../../Components/Modal'
// import Label from '../../Components/Label'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '../../Theme/ThemeProvider';
export default function MessageImage(props) {
  // const [isVisible, setIsVisible] = useState(false)
  // const {theme}=useTheme()
  const onToggle = () => {
    // setIsVisible(!isVisible)
  }
  const { currentMessage } = props;
  
  if (!currentMessage) return null;
  const onLongPress = () => {
    console.log("onLongPress");
    // onToggle()
  }

  const _renderDeleteIcon = () => {
    return (<Pressable onPress={onLongPress} style={styles.delIcon}>
      <MaterialIcons size={scale(20)} name="more-vert" color={"#fff"} />
    </Pressable>)
  }
  return (
    <>
      <Pressable onLongPress={onLongPress}>
        {_renderDeleteIcon()}
        {/* <LoadingImage uri={currentMessage.image} style={{ overflow: 'hidden', height: scale(200), width: scale(200), borderTopLeftRadius: scale(8), borderTopRightRadius: scale(8) }} /> */}
      </Pressable>
      {/* <Modal modalProps={{ isVisible }} wraperStyle={{ flex: 0.2 }} toggleModal={onToggle}>
        <Pressable style={styles.delOption}>
          <Text style={{color:theme.colors.primary}} text={""} >
          Delete for me
            </Text>
        </Pressable>

        <Pressable style={styles.delOption}>
          <Text style={{color:theme.colors.primary}} text={""} >
          Delete for all
          </Text>
        </Pressable>

      </Modal> */}
    </>
  );
}


const styles = StyleSheet.create({

  delIcon: {
    zIndex: 10, height: scale(30), width: scale(30),
    //borderRadius:scale(20),
    borderTopRightRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    //backgroundColor: 'red', 
    position: 'absolute',
    right: scale(-0),
    top: scale(7),
    justifyContent: 'center',
    alignItems: 'center'
  },
  delOption: {margin: scale( 5),  alignItems: 'center', padding: scale(5),   }
})