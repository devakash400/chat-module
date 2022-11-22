import moment from 'moment';

export const getFromNow = data => {
  return moment(data).fromNow();
};
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export function capitalizeFirstLetter(string) {
  if (string) return string.charAt(0).toUpperCase() + string.slice(1);
  else return ""
}
export function intToString(value = 0) {
  if (!value) return 0
  value = Number(value)
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.floor(("" + value).length / 4);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
  if (shortValue % 1 != 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}

export function storyFormatting(array = []) {
  var output = [];
  array.forEach(function (item) {
    var existing = output.filter(function (v, i) {
      return v.createdBy == item.createdBy;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].story_image = output[existingIndex].story_image.concat(item.story_image);
    } else {
      if (typeof item.story_image == 'string')
        item.story_image = [item.story_image];
      output.push(item);
    }
  });
  return output
}

export function formatUserForChat(user) {

  return {
    name: `${user?.username}`,
    avatar: user?.profile_image,
    uid: user?.uid,
    _id: user?.uid,
    profileImage: user?.profile_image,
  }

}