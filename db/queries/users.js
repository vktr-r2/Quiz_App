const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users')
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { getUsers };
