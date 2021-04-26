const usersGet = require('./../helpers/usersGet.js')
const messages = require('./../messages.js')
const broadcastEvent = require('./common/broadcast-event.js')
const axios = require('axios')

module.exports = async function photoNew (update, usersInfo) {
  const groupId = update.group_id
  const userId = update.object.user_id
  const photoId = update.object.id
  const text = update.object.text
  const albumId = update.object.album_id

  const profile = await usersGet(userId)
  const initiatorName = userId === 100 ? 'Community' : `@id${userId}(${profile.fullName})`
  const sendText = messages.getPhotoNew(initiatorName, groupId, photoId, text)
  await broadcastEvent(sendText, usersInfo, false, `photo-${groupId}_${photoId}`)
}
