const axios = require('axios')
const usersGet = require('./../../app/helpers/usersGet.js')
const env = require('./../../env.js')
const fs = require('fs')
const path = require('path')

axios.defaults.baseURL = 'https://api.vk.com/method/'
axios.defaults.params = {
  access_token: env.UTILS_ACCESS_TOKEN,
  v: env.VERSION
}

async function groupsRemoveUser (userId) {
  return await axios.get('groups.removeUser', {
    params: {
      group_id: env.UTILS_GROUP_ID,
      user_id: userId
    }
  })
}

(async function init () {
  const text = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  const draftUsers = text.split(/\r\n|\n/)
    .map(user => user.replace('https://vk.com/', ''))
    .filter(user => user)

  function nextUser (sleep = 0) {
    setTimeout(async () => {
      const timeStart = Date.now()
      let requests = 0

      let userId = draftUsers.shift()
      const userIdCopy = userId

      if (!userId) {
        console.log('End of user list.')
        return
      }

      if (userId.startsWith('id')) {
        userId = userId.replace('id', '')
      } else {
        try {
          const profile = await usersGet(userId)
          requests++
          userId = profile.id
        } catch (e) {
          console.log('Not Found')
          nextUser()
          return
        }
      }

      const kickResult = await groupsRemoveUser(userId)
      requests++

      console.log(userIdCopy + ' ' + (kickResult.data?.response === 1 ? 'kicked' : 'kick error'))

      const timeDiff = Date.now() - timeStart
      const timeNeedForThisRequests = 201 * requests
      let nextTimeDelay = timeNeedForThisRequests - timeDiff
      if (nextTimeDelay < 0) {
        nextTimeDelay = 0
      }
      console.log(`${requests} requests for ${timeDiff}, next sleep ${nextTimeDelay}`)

      nextUser(nextTimeDelay)
    }, sleep)
  }

  nextUser()
})()
