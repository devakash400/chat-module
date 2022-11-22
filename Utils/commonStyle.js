import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom:scale(50),
    // backgroundColor:"red"
  },
  logo: {
    height: 98,
    width: 160,
    alignSelf: 'center',
    marginTop: 10,
  },
  fd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(10),
  },
  smallProfilePic: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
  },
  shadow: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 80,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 10,
  },
});

export default Styles;
