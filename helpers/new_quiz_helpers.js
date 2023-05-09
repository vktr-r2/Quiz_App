const generateRandomString = () => {
  let randomString = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i <= 10; i++) {
    let charIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[charIndex];
  }
  return randomString;
};


const addPrivateId = (quizObject) => {
  if (quizObject.private) {
    let privateId = generateRandomString();
    quizObject.private_id = privateId
    quizObject.private = true;
  }
  return quizObject;
};



module.exports = {
  addPrivateId
};
