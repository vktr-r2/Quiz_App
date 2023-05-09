//OBTAIN PRIVATE ID
//Generate random 10 character string to use for private_id
const generateRandomString = () => {
  let randomString = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= 10; i++) {
    let charIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[charIndex];
  }
  return randomString;
};

//Check quizObject submitted from form.  If quizObject.private is truthy then generate random string and add as private_id to existing quiz object
const addPrivateId = (quizObject) => {
  if (quizObject.private) {
    let privateId = generateRandomString();
    quizObject.private_id = privateId
    quizObject.private = true;
  }
  return quizObject;
};

//OBTAIN USER ID
const checkUserId = () => {

};


module.exports = {
  addPrivateId
};
