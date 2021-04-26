const sendMessage = require('./../../helpers/sendMessage.js')
const path = require('path')
const fs = require('fs')

module.exports = async function broadcastEvent (sendText, usersInfo, dontParseLinks = true, attachment = null) {
  const adminsJsonPath = path.join(__dirname, '/../../../admins.json')

  const adminsStr = fs.readFileSync(adminsJsonPath)
  const admins = JSON.parse(adminsStr)

  console.log(admins)

  await Promise.allSettled(
    admins.map(userId => sendMessage(userId, sendText, null, dontParseLinks, attachment))
  )
}
