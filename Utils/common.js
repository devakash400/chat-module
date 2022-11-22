import moment from 'moment';
export function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export const formatDob= (dob)=>{
  if(dob?.toDate ){
    return dob?.toDate()?.toDateString()
  }
  if(dob?.dateString){
   return dob?.dateString
  }
  if(dob?.toDateString){
    return dob?.toDateString()
  }
  
}
export function getChatId(uid1, uid2) {
  if (uid1 > uid2) {
    return `${uid1}_${uid2}`;
  }
  return `${uid2}_${uid1}`;
}
export function createUpdateInbox(message, sender, receiver) {
  /* const _message = {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  }; */
  return {
    _sender: {
      message: {...message, user: {...message.user, _id: receiver}},
    },
    _receiver: {
      message: {...message, user: {...message.user, _id: sender}},
    },
  };
}

export function formatOneMessage(message) {
  const formatedDate = moment(new Date(), 'MM-DD-YYYY HH:mm:ss');

  return {
    ...message,
    createdAt: formatedDate,
  };
}

export function getEnv() {
  if (__DEV__) return 'Dev';
  return 'Prod';
}

export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'y';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'min';
  }
  return 'Now';
  //return Math.floor(seconds) + " sec";
}

 

/**
 *
 * @param posts
 * @returns {postById,wallPostIds}
 * @description this function is normialise the data for wall post works on O(1)
 */
export const normalizeWallPost = (posts) => {
  let postIds = [];
  let postById = {};
  posts?.map(post => {
    const {_id} = post;
    postIds.push(_id);
    //postById.push({ [id]: post })
    postById[_id] = post;
  });

  return {
     byId: postById,
     ids: postIds,
  };
};
export function randomString(len) {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(len)].reduce(a=>a+p[~~(Math.random()*p.length)],'');
}

/**
 * 
 * @param {*} imgPath 
 * @description checkss weather image is local or http address
 * @returns {Boolean}
 */
export function isLocalImage(imgPath) { 
 return imgPath.includes("http")
}