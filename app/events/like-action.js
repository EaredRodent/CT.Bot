const usersGet = require('./../helpers/usersGet.js')
const likesGetList = require('./../helpers/likesGetList.js')
const messages = require('./../messages.js')
const broadcastEvent = require('./common/broadcast-event.js')

module.exports = async function likeAction (update, usersInfo) {
  const eventType = update.type

  const groupId = update.group_id
  const objectType = update.object.object_type
  const userId = update.object.liker_id
  const postId = update.object.post_id
  const objectId = update.object.object_id

  const canProcessTypes = ['post', 'photo', 'comment', 'topic_comment']

  if (!canProcessTypes.includes(objectType)) {
    return
  }
  console.log(update.object)

  const profile = await usersGet(userId)
  const sendText = messages.getLikeAction(userId, profile.fullName, eventType, objectType, groupId, postId, objectId)
  await broadcastEvent(sendText, usersInfo)
}
