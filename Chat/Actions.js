import {View, Text} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GiftedChat,
  Actions as GActions,
  ActionsProps,
} from 'react-native-gifted-chat';

import {scale} from 'react-native-size-matters';
// import mediaPicker from '../../Hooks/mediaPicker';
export default function Actions(props) {
  const handlePickImage = () => {
    // console.log('props==>', props);
    // mediaPicker('camera', image => {
    //   const {onUpload} = props;
    //   onUpload(image);
    // });
  };
  return (
    <GActions
      {...props}
      options={{
        'Send Image': handlePickImage,
        /* onSend:args => console.log(args),
        Cancel: () => {
            console.log('Cancel');
          }, */
      }}
      icon={() => <MaterialIcons name={'attachment'} size={scale(28)} />}
    />
  );
}
