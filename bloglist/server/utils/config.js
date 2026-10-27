require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGOURI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGOURI
    : process.env.MONGOURI

module.exports = { PORT, MONGOURI }
