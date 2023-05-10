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

//OBTAIN USER ID (using cookies-parser)
const addUserId = (req) => {
// Check if 'user_id' cookie is set
if (req.cookies && req.cookies.user_id) {
  // If 'user_id' cookie is set, add user_id to quizObject
  req.body.user_id = req.cookies.user_id
} else {
  // If 'user_id' cookie is not set, set quizObject user_id to 1 (guest user id)
  req.body.user_id = 1
}
  return req.body;
};


module.exports = {
  addPrivateId,
  addUserId
};
