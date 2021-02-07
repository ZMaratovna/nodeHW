const jwt = require('jsonwebtoken');

module.exports.createToken = (data, privateKey) => {
  return jwt.sign(
    { username: data },
    privateKey
  );
}