const usersGet = require('./../helpers/usersGet.js')
const messages = require('./../messages.js')
const broadcastEvent = require('./common/broadcast-event.js')

module.exports = async function commentAction (update, usersInfo) {
  const groupId = update.group_id
  const eventType = update.type
  const userId = update.object.from_id || update.object.deleter_id
  const targetId = update.object.post_id || update.object.photo_id || update.object.video_id
  const objectId = update.object.id
  const isOnAComment = !!update.object.reply_to_comment

  const profile = await usersGet(userId)
  const sendText = messages.getCommentAction(userId, profile.fullName, eventType, groupId, targetId, objectId, isOnAComment)
  await broadcastEvent(sendText, usersInfo)
}
