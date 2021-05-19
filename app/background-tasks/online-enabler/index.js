const axios = require('axios')
const env = require('./../../../env.js')

module.exports = function onlineEnabler () {
  async function groupsGetOnlineStatus () {
    return axios.get('groups.getOnlineStatus', {
      params: {
        group_id: `${env.GROUP_ID}`
      }
    })
  }

  async function groupsEnableOnline () {
    return axios.get('groups.enableOnline', {
      params: {
        group_id: `${env.GROUP_ID}`
      }
    })
  }

  async function onlineEnablerTick () {
    const { data: { response: { status } } } = await groupsGetOnlineStatus()

    if (status === 'none') {
      await groupsEnableOnline()
    }

    setTimeout(onlineEnablerTick, 60000)
  }

  onlineEnablerTick()
}
