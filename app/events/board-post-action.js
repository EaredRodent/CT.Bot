const usersGet = require('./../helpers/usersGet.js')
const messages = require('./../messages.js')
const broadcastEvent = require('./common/broadcast-event.js')

module.exports = async function boardPostAction (update, usersInfo) {
  const eventType = update.type
  const groupId = update.group_id
  const topicId = update.object.topic_id
  const commentId = update.object.id

  let userId
  let shortText
  let initiatorName

  if (eventType !== 'board_post_delete') {
    userId = update.object.from_id ?? 0
    shortText = update.object.text ?? ''
    shortText = shortText.length < 80 ? shortText : shortText.slice(0, 80) + '...'
    const profile = await usersGet(userId)
    initiatorName = `@id${userId}(${profile.fullName})`
  }

  const sendText = messages.getBoardPostAction(eventType, groupId, topicId, commentId, initiatorName, shortText)
  await broadcastEvent(sendText, usersInfo)
}
