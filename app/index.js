const axios = require('axios')
const fs = require('fs')
const env = require('./../env.js')
const events = require('./events/index.js')
const path = require('path')

const onlineEnabler = require('./background-tasks/online-enabler/index.js')

axios.defaults.baseURL = 'https://api.vk.com/method/'
axios.defaults.params = {
  access_token: env.ACCESS_TOKEN,
  v: '5.130'
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.response.use(response => {
  const data = response?.data

  if (data) {
    console.log('response:')
    console.log(data)
  }

  // const error = response?.data?.error
  //
  // if(error) {
  //   console.error(error)
  // }

  return response
})

async function main () {
  const usersJsonPath = path.join(__dirname, '/../users.json')

  function readUsersInfo () {
    const fileStr = fs.readFileSync(usersJsonPath)
    return JSON.parse(fileStr)
  }

  const usersInfo = readUsersInfo()

  function initUsersInfoSaver () {
    setInterval(() => {
      fs.writeFileSync(usersJsonPath, JSON.stringify(usersInfo))
    }, 5000)
  }

  initUsersInfoSaver()

  const act = 'a_check'
  const wait = '25'
  let key
  let server
  let ts

  async function initLongPolling () {
    const { data: { response: serverInfo } } = await axios.get('groups.getLongPollServer', {
      params: {
        group_id: env.GROUP_ID
      }
    })

    key = serverInfo.key
    server = serverInfo.server
    ts = serverInfo.ts
  }

  await initLongPolling()

  let tick = null

  function nextTick () {
    tick = setTimeout(onTick, 500)
  }

  async function onTick () {
    try {
      const { data: longPollResp } = await axios.get(server, {
        params: {
          act,
          key,
          wait,
          ts
        }
      })

      if (longPollResp.failed) {
        await initLongPolling()
        nextTick()
        return
      }

      ts = longPollResp.ts

      const updates = longPollResp.updates

      await processUpdates(updates)
    } catch (e) {}

    nextTick()
  }

  nextTick()

  async function processUpdates (updates) {
    if (updates.length) {
      for (const update of updates) {
        await processUpdate(update)
      }
    }
  }

  async function processUpdate (update) {
    const event = events[update.type]

    console.log(update.object)

    if (event) {
      try {
        await event(update, usersInfo)
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log(`Can not handle event ${update.type}`)
    }
  }

  onlineEnabler()
}

main()
