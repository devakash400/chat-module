import auth from '@react-native-firebase/auth';
import { editProfile } from '../redux/authAction';
import storeMake from '../redux/store';
import { AlertHelper } from '../Utils/AlertHelper';

export const emailAuth=({email,password})=>{
   return auth().createUserWithEmailAndPassword(email,password)
  .then((res) => {
    const {store}=storeMake
    const userData= store?.getState().auth.userData
    console.log('User account created & signed in!',res);
    const data = {
      firstName:  userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      email:userData.email,
      phone:userData.phone,
      uid:res?.user?.uid
    }
    
    store.dispatch(editProfile({data,username:userData.username,profile_image:userData?.profile_image,fromFirebase:true}))  
    return true
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      firebaseEmailLogin({email,password})
    }

    if (error.code === 'auth/invalid-email') {
      // AlertHelper.show("error","Error","That email address is invalid!")
      console.log('That email address is invalid!');
    }

    console.log(error);
  });
}
export const firebaseEmailLogin=({email,password})=>{
  console.log("in firebase emial===>>>",email,password);
  return auth().signInWithEmailAndPassword(email,password)
 .then((res) => {
   
  const {store}=storeMake
  const userData= store?.getState().auth.userData
  console.log('User account created & signed in!',res);
  const data = {
    firstName:  userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email:userData.email,
    phone:userData.phone,
    uid:res?.user?.uid
  }
  // editProfile$({data,username,profile_image})
  store.dispatch(editProfile({data,username:userData.username,profile_image:userData?.profile_image,fromFirebase:true}))  

   return true
 })
 .catch(error => {
   if (error.code === 'auth/email-already-in-use') {
     console.log('That email address is already in use!');
   }

   if (error.code === 'auth/invalid-email') {
    //  AlertHelper.show("error","Error","That email address is invalid!")
     console.log('That email address is invalid!');
   }

   console.log(error);
 });
}