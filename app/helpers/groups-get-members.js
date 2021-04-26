const axios = require('axios')
const env = require('./../../env.js')

module.exports = async function groupsGetMembers (count) {
  const { data: { response } } = await axios.get('groups.getMembers', {
    params: {
      group_id: env.GROUP_ID,
      count
    }
  })
  return response
}
