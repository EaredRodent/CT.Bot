const axios = require('axios')
const env = require('./../../../env.js')

module.exports = async function onlineEnabler () {
  /**
   * @returns {void}
   */
  async function groupsEnableOnline () {
    axios.get('groups.enableOnline', {
      params: {
        group_id: `${env.GROUP_ID}`
      }
    })
  }

  const SEC = 1000
  const MIN = SEC * 60
  const HOUR = MIN * 60

  groupsEnableOnline()
  setInterval(groupsEnableOnline, HOUR * 4)
}
