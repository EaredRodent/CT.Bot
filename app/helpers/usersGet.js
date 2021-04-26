const axios = require('axios')

module.exports = async function usersGet (ids) {
  const { data: { response: [profile] } } = await axios.get('users.get', {
    params: {
      user_ids: ids
    }
  })
  profile.fullName = `${profile.first_name} ${profile.last_name}`
  return profile
}
