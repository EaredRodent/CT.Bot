const usersGet = require('./../helpers/usersGet.js')
const groupsGetMembers = require('./../helpers/groups-get-members.js')
const messages = require('./../messages.js')
const broadcastEvent = require('./common/broadcast-event.js')

module.exports = async function groupJoin (update, usersInfo) {
  const userId = update.object.user_id
  const profile = await usersGet(userId)
  const groupInfo = await groupsGetMembers(0)
  const sendText = messages.getGroupJoin(userId, profile.fullName, groupInfo.count)
  await broadcastEvent(sendText, usersInfo)
}
