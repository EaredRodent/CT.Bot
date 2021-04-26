const axios = require('axios')
const env = require('./../../env.js')

module.exports = async function likesGetList (type, item_id, count) {
  const { data: { response } } = await axios.get('likes.getList', {
    params: {
      type,
      owner_id: `${env.GROUP_ID}`,
      item_id,
      count
    }
  })
  return response
}
